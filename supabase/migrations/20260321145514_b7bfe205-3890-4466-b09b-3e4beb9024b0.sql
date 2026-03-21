DROP VIEW IF EXISTS public.public_quiz_configs;
CREATE VIEW public.public_quiz_configs WITH (security_invoker=on) AS
SELECT
  slug, brand_colour, business_name, full_name, email,
  logo_url, font_family, questions, result_texts,
  cta_text, cta_url, cta_tagline
FROM quiz_configs;