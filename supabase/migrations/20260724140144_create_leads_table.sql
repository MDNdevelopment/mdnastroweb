create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  empresa text not null,
  telefono text not null,
  email text not null,
  servicios text[] not null default '{}',
  objetivo text,
  mensaje text not null,
  source text not null default 'web-onboarding'
);

alter table public.leads enable row level security;
-- No public policies: only the service-role key (used server-side by the
-- onboarding Action) can read/write this table; it bypasses RLS.

create index leads_created_at_idx on public.leads (created_at desc);
