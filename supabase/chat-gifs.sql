-- GIFs no chat: rode este arquivo uma vez no SQL Editor do Supabase (depois do chat.sql)

-- Só aceita GIFs vindos do GIPHY
alter table public.messages add column if not exists gif_url text
  check (gif_url is null or gif_url ~ '^https://media[0-9]?\.giphy\.com/');

-- Mensagem pode ser só um GIF, sem texto
alter table public.messages drop constraint if exists messages_content_check;
alter table public.messages add constraint messages_content_check
  check (char_length(content) <= 500 and (char_length(btrim(content)) >= 1 or gif_url is not null));
