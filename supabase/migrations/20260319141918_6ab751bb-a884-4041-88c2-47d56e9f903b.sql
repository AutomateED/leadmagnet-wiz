
-- Allow authenticated users to insert their own client row (id must match auth.uid())
CREATE POLICY "Users can insert own client row"
  ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Allow authenticated users to update their own client row
CREATE POLICY "Users can update own client row"
  ON public.clients
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());
