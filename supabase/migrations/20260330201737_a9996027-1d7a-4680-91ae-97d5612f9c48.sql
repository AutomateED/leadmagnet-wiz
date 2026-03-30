CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert waitlist signups"
  ON public.waitlist_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Service role can read waitlist signups"
  ON public.waitlist_signups
  FOR SELECT
  TO service_role
  USING (true);