alter table contacts
  add column if not exists generated_reply text,
  add column if not exists edited_reply text,
  add column if not exists approval_token uuid not null default gen_random_uuid(),
  add column if not exists approved_at timestamptz,
  add column if not exists sent_at timestamptz;

create unique index if not exists contacts_approval_token_idx on contacts (approval_token);
