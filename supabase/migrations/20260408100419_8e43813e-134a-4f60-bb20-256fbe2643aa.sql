CREATE POLICY "Clients can delete own leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (client_id = auth.uid());