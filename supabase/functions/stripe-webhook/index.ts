import Stripe from "npm:stripe@17";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response(JSON.stringify({ error: "Missing stripe-signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-12-18.acacia",
    });
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Signature verification failed:", err);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (event.type !== "checkout.session.completed") {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name ?? "";
    const templateType = (session.metadata?.template_type as string) || 'business-breakthrough';

    if (!email) {
      console.error("No email in checkout session");
      return new Response(JSON.stringify({ error: "No email found" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if user already exists — direct lookup instead of listing all users
    let existingUser = null;
    const { data: userList } = await supabaseAdmin.auth.admin.listUsers({
      filter: email.toLowerCase(),
      perPage: 1,
    });
    if (userList?.users?.length) {
      existingUser = userList.users[0];
    }

    if (existingUser) {
      // Update subscription status to active if they already exist
      await supabaseAdmin
        .from("clients")
        .update({ subscription_status: "active" })
        .eq("id", existingUser.id);

      console.log(`User ${email} already exists, updated to active`);
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Invite new user via magic link
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: { full_name: name },
      });

    if (inviteError) {
      console.error("Failed to invite user:", inviteError);
      return new Response(JSON.stringify({ error: "Failed to create user" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = inviteData.user.id;

    // Insert client row
    const { error: insertError } = await supabaseAdmin.from("clients").insert({
      id: userId,
      email,
      business_name: "",
      subscription_status: "active",
    });

    if (insertError) {
      console.error("Failed to insert client:", insertError);
    }

    // Generate slug from email
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase() + "-" + randomSuffix;

    // Insert quiz_configs row
    const { error: quizError } = await supabaseAdmin.from("quiz_configs").insert({
      client_id: userId,
      slug,
      quiz_name: "My Quiz",
      template_type: templateType,
      brand_colour: "#D946EF",
      business_name: "",
      questions: [],
      result_texts: {},
      cta_text: "Book Your Free Discovery Call",
      cta_url: "",
      cta_tagline: "",
      font_family: "Plus Jakarta Sans",
      full_name: name,
      email,
    });

    if (quizError) {
      console.error("Failed to insert quiz_configs:", quizError);
    }

    console.log(`Created user ${email} with id ${userId}`);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
