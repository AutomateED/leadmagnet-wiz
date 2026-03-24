CREATE POLICY "Service role can delete archived_clients"
  ON public.archived_clients FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert archived_clients"
  ON public.archived_clients FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select archived_clients"
  ON public.archived_clients FOR SELECT
  TO service_role
  USING (true);