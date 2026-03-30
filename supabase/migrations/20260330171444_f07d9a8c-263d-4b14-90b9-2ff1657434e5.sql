
-- 1. Fix contact_submissions: remove overly permissive authenticated SELECT, add service_role only
DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON public.contact_submissions;

CREATE POLICY "Service role can read contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- 2. Fix public_quiz_configs view: remove email & full_name, change to SECURITY INVOKER
DROP VIEW IF EXISTS public.public_quiz_configs;

CREATE VIEW public.public_quiz_configs
  WITH (security_invoker = true)
AS
SELECT
  client_id,
  slug,
  quiz_name,
  template_type,
  business_name,
  logo_url,
  brand_colour,
  font_family,
  questions,
  result_texts,
  cta_text,
  cta_url,
  cta_tagline
FROM public.quiz_configs;

-- Grant anon and authenticated read access to the view
GRANT SELECT ON public.public_quiz_configs TO anon, authenticated;

-- 3. Fix leads INSERT: merge two overlapping policies into one with slug validation
DROP POLICY IF EXISTS "Allow anonymous lead inserts" ON public.leads;
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;

CREATE POLICY "Validated lead inserts"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quiz_configs qc
      WHERE qc.slug = quiz_slug
        AND qc.client_id = leads.client_id
    )
  );

-- 4. Fix function search_path
ALTER FUNCTION public.update_updated_at() SET search_path = public;
