-- Chat do portfolio: rode este arquivo uma vez no SQL Editor do Supabase

create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name       text check (name is null or char_length(name) between 1 and 30),
  country    text check (country is null or country ~ '^[A-Z]{2}$'),
  content    text not null check (char_length(btrim(content)) between 1 and 500)
);

-- Qualquer visitante pode ler e enviar; ninguém edita nem apaga pelo site
-- (para apagar uma mensagem, use o Table Editor do Supabase)
alter table public.messages enable row level security;

drop policy if exists "messages_read" on public.messages;
create policy "messages_read" on public.messages
  for select to anon using (true);

drop policy if exists "messages_insert" on public.messages;
create policy "messages_insert" on public.messages
  for insert to anon with check (true);

-- Freio contra spam: no máximo 15 mensagens por minuto no chat inteiro
create or replace function public.messages_rate_limit()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.messages where created_at > now() - interval '1 minute') >= 15 then
    raise exception 'rate limit';
  end if;
  new.created_at := now();
  return new;
end;
$$;

drop trigger if exists messages_rate_limit on public.messages;
create trigger messages_rate_limit before insert on public.messages
  for each row execute function public.messages_rate_limit();

-- Mensagens novas (e apagadas) chegam ao vivo para quem está com o chat aberto
alter publication supabase_realtime add table public.messages;
