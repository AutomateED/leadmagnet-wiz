ALTER TABLE public.clients ADD COLUMN notes text DEFAULT '' NOT NULL;
ALTER TABLE public.clients ADD COLUMN last_login timestamptz;