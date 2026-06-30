alter table contacts
  add column if not exists summary text,
  add column if not exists category text,
  add column if not exists sentiment text,
  add column if not exists lead_quality text,
  add column if not exists lead_score integer,
  add column if not exists ai_analyzed_at timestamptz;
