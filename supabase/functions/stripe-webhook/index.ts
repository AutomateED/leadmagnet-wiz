import * as Sentry from "npm:@sentry/deno";

Sentry.init({
  dsn: Deno.env.get("SENTRY_DSN"),
  environment: "production",
  tracesSampleRate: 0.1,
});

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
    Sentry.captureException(err);
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

    const normalizedEmail = email.toLowerCase();

    // Check if client row already exists
    const { data: existingClient } = await supabaseAdmin
      .from("clients")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existingClient) {
      // Existing user — update status to active
      await supabaseAdmin
        .from("clients")
        .update({ subscription_status: "active" })
        .eq("id", existingClient.id);

      // Ensure they have a quiz_configs row (in case it was missing)
      const { data: existingQuiz } = await supabaseAdmin
        .from("quiz_configs")
        .select("id")
        .eq("client_id", existingClient.id)
        .maybeSingle();

      if (!existingQuiz) {
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        const slug =
          normalizedEmail.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase() +
          "-" +
          randomSuffix;
        await supabaseAdmin.from("quiz_configs").insert({
          client_id: existingClient.id,
          slug,
          quiz_name: "My Quiz",
          template_type: "custom",
          brand_colour: "#D946EF",
          business_name: "",
          questions: [],
          result_texts: {},
          cta_text: "Book Your Free Discovery Call",
          cta_url: "",
          cta_tagline: "",
          font_family: "Plus Jakarta Sans",
          full_name: name,
          email: normalizedEmail,
        });
        console.log(`Created missing quiz_configs for existing user ${normalizedEmail}`);
      }

      // Send password reset so they can log back in
      const { error: resetError } = await supabaseAdmin.auth.resetPasswordForEmail(
        normalizedEmail,
        { redirectTo: `${Deno.env.get("SITE_URL") ?? "https://pretaquiz.com"}/reset-password` }
      );
      if (resetError) {
        console.error("Failed to send reset email to existing user:", resetError);
      } else {
        console.log(`Sent password reset to existing user ${normalizedEmail}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // New user — invite via magic link (creates auth user + sends email)
    const { data: inviteData, error: inviteError } =
      await supabaseAdmin.auth.admin.inviteUserByEmail(normalizedEmail, {
        data: { full_name: name },
        options: {
          redirectTo: `${Deno.env.get("SITE_URL") ?? "https://pretaquiz.com"}/reset-password`,
        },
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
      email: normalizedEmail,
      business_name: "",
      subscription_status: "active",
    });
    if (insertError) {
      console.error("Failed to insert client:", insertError);
    }

    // Generate slug and insert quiz_configs row
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug =
      normalizedEmail.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase() +
      "-" +
      randomSuffix;

    const { error: quizError } = await supabaseAdmin.from("quiz_configs").insert({
      client_id: userId,
      slug,
      quiz_name: "My Quiz",
      template_type: "custom",
      brand_colour: "#D946EF",
      business_name: "",
      questions: [],
      result_texts: {},
      cta_text: "Book Your Free Discovery Call",
      cta_url: "",
      cta_tagline: "",
      font_family: "Plus Jakarta Sans",
      full_name: name,
      email: normalizedEmail,
    });
    if (quizError) {
      console.error("Failed to insert quiz_configs:", quizError);
    }

    console.log(`Created new user ${normalizedEmail} with id ${userId}`);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    Sentry.captureException(err);
    console.error("Error processing webhook:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
