import Stripe from "npm:stripe@17";
import { z } from "npm:zod@3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const VALID_TEMPLATES = [
  "business-breakthrough",
  "mindset-mastery",
  "leadership-style",
  "wealth-readiness",
];

const BodySchema = z.object({
  template_type: z.enum(VALID_TEMPLATES as [string, ...string[]]),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not set");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Invalid template_type", details: parsed.error.flatten().fieldErrors }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const { template_type } = parsed.data;

  const TEMPLATE_NAMES: Record<string, string> = {
    "business-breakthrough": "Business Breakthrough Quiz",
    "mindset-mastery": "Mindset Mastery Quiz",
    "leadership-style": "Leadership Style Quiz",
    "wealth-readiness": "Wealth Readiness Quiz",
  };

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" });

    const origin = req.headers.get("origin") || "https://pretaquiz.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 9700,
            product_data: {
              name: TEMPLATE_NAMES[template_type] || "Quiz Template",
              description: "One-time purchase — no recurring fees",
            },
          },
          quantity: 1,
        },
      ],
      metadata: { template_type },
      success_url: `${origin}/welcome?template=${template_type}`,
      cancel_url: `${origin}/templates/${template_type}`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe error:", err);
    return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
