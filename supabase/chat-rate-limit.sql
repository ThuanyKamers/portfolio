-- Limite por visitante: rode este arquivo uma vez no SQL Editor do Supabase (depois do chat.sql)
--
-- Cada visitante (identificado pelo IP da requisição) pode mandar no máximo 5 mensagens por minuto.
-- O chat inteiro aceita no máximo 30 por minuto, como freio extra contra quem troca de IP.
-- O IP nunca é salvo: guardamos só um hash dele numa tabela privada, apagado depois de 1 minuto.

create table if not exists public.message_rate (
  ip_hash    text not null,
  created_at timestamptz not null default now()
);
create index if not exists message_rate_ip_hash_created_at on public.message_rate (ip_hash, created_at);

-- Tabela privada: sem policies, ninguém lê nem escreve nela pelo site
alter table public.message_rate enable row level security;
revoke all on public.message_rate from anon, authenticated;

create or replace function public.messages_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  ip text;
  h  text;
begin
  if (select count(*) from public.messages where created_at > now() - interval '1 minute') >= 30 then
    raise exception 'rate limit';
  end if;

  ip := btrim(split_part(coalesce(current_setting('request.headers', true)::json ->> 'x-forwarded-for', ''), ',', 1));
  if ip <> '' then
    h := md5(ip);
    delete from public.message_rate where created_at < now() - interval '1 minute';
    if (select count(*) from public.message_rate where ip_hash = h) >= 5 then
      raise exception 'rate limit';
    end if;
    insert into public.message_rate (ip_hash) values (h);
  end if;

  new.created_at := now();
  return new;
end;
$$;

drop trigger if exists messages_rate_limit on public.messages;
create trigger messages_rate_limit before insert on public.messages
  for each row execute function public.messages_rate_limit();
