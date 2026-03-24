CREATE POLICY "Service role can delete clients"
  ON public.clients FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete quiz_configs"
  ON public.quiz_configs FOR DELETE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete leads"
  ON public.leads FOR DELETE
  TO service_role
  USING (true);