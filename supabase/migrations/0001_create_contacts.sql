create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  subject text not null,
  project_type text,
  budget text,
  timeline text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on contacts (created_at desc);
