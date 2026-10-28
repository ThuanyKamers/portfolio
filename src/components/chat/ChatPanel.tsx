import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaArrowUp, FaChevronLeft, FaChevronRight, FaPlus, FaUser, FaUserPlus } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import { countries } from 'country-flag-icons';
import * as Flags from 'country-flag-icons/react/1x1';
import { supabase, type ChatMessage } from '../../lib/supabase';
import GifPicker, { GIPHY_KEY } from './GifPicker';

interface Profile {
  name: string | null;
  country: string | null;
}

const PROFILE_KEY = 'chat-profile';
const MINE_KEY = 'chat-mine';
const COOLDOWN_MS = 5000;
const MAX_LENGTH = 500;

// localStorage pode falhar (aba anônima, cookies bloqueados): o chat funciona mesmo assim
const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};
const save = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sem persistência */
  }
};

const Avatar: React.FC<{ country: string | null; size?: number }> = ({ country, size = 32 }) => {
  const Flag = country ? (Flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[country] : null;
  return (
    <span className="chat-avatar" style={{ width: size, height: size }}>
      {Flag ? <Flag width={size} height={size} /> : <FaUser size={size * 0.42} />}
    </span>
  );
};

const ProfileForm: React.FC<{ initial: Profile | null; onDone: (p: Profile) => void }> = ({ initial, onDone }) => {
  const { t, i18n } = useTranslation();
  const [anonymous, setAnonymous] = useState(initial ? !initial.name : false);
  const [name, setName] = useState(initial?.name ?? '');
  const [country, setCountry] = useState<string | null>(initial?.country ?? null);
  const [query, setQuery] = useState('');

  // Nomes dos países no idioma atual do site, em ordem alfabética
  const list = useMemo(() => {
    const names = new Intl.DisplayNames([i18n.language.toLowerCase()], { type: 'region', fallback: 'none' });
    // Só códigos de país de duas letras (a lista também traz regiões como GB-SCT)
    return countries
      .filter((code) => /^[A-Z]{2}$/.test(code))
      .map((code) => ({ code, label: names.of(code) }))
      .filter((c): c is { code: string; label: string } => Boolean(c.label) && c.code in Flags)
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [i18n.language]);

  const q = query.trim().toLowerCase();
  const filtered = q ? list.filter((c) => c.label.toLowerCase().includes(q)) : list;
  const trimmed = name.trim();
  const canSubmit = anonymous || trimmed.length > 0;

  return (
    <form
      className="chat-profile"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onDone({ name: anonymous ? null : trimmed.slice(0, 30), country });
      }}
    >
      <div className="chat-profile__top">
        <span />
        <strong>{t('chat.profileTitle')}</strong>
        <span />
      </div>
      <div className="chat-profile__preview">
        <Avatar country={country} size={56} />
        <span>{anonymous || !trimmed ? t('chat.anonName') : trimmed}</span>
      </div>

      <label className="chat-label">
        {t('chat.name')}
        <input
          className="chat-input"
          value={name}
          maxLength={30}
          disabled={anonymous}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('chat.namePlaceholder')}
        />
      </label>
      <label className="chat-check">
        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
        {t('chat.anon')}
      </label>

      <span className="chat-label">{t('chat.flag')}</span>
      <input
        className="chat-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('chat.search')}
        aria-label={t('chat.search')}
      />
      <div className="chat-flags" role="listbox" aria-label={t('chat.flag')}>
        <button
          type="button"
          role="option"
          aria-selected={country === null}
          className={`chat-flag${country === null ? ' is-active' : ''}`}
          onClick={() => setCountry(null)}
        >
          <Avatar country={null} size={22} /> {t('chat.noFlag')}
        </button>
        {filtered.map((c) => (
          <button
            type="button"
            role="option"
            key={c.code}
            aria-selected={country === c.code}
            className={`chat-flag${country === c.code ? ' is-active' : ''}`}
            onClick={() => setCountry(c.code)}
          >
            <Avatar country={c.code} size={22} /> {c.label}
          </button>
        ))}
      </div>

      <button type="submit" className="chat-primary" disabled={!canSubmit}>
        {t('chat.start')}
      </button>
    </form>
  );
};

// Mensagens seguidas da mesma pessoa em poucos minutos viram um grupo, como no iMessage
const GROUP_GAP_MS = 5 * 60 * 1000;
const TIMESTAMP_GAP_MS = 60 * 60 * 1000;
const senderKey = (m: ChatMessage, own: boolean) => (own ? 'me' : `${m.name ?? ''}|${m.country ?? ''}`);

// Rabinho da bolha (lado direito; espelhado com CSS para as mensagens recebidas)
const Tail: React.FC = () => (
  <svg className="imsg-tail" viewBox="0 0 10 16" aria-hidden="true">
    <path d="M0 0H3V8C3 12 5.5 14.8 10 16C6 16.6 2.4 16 0 14.6Z" />
  </svg>
);

// Barra de status do iPhone: hora atual, sinal, Wi-Fi e bateria
const StatusBar: React.FC = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="iphone-status" aria-hidden="true">
      <span className="iphone-status__time">
        {now.getHours()}:{String(now.getMinutes()).padStart(2, '0')}
      </span>
      <span className="iphone-island" />
      <span className="iphone-status__icons">
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path d="M7.5 2.2c2.1 0 4 .8 5.4 2.1l1.1-1.1A9.2 9.2 0 0 0 7.5.6 9.2 9.2 0 0 0 1 3.2l1.1 1.1a7.6 7.6 0 0 1 5.4-2.1Z" />
          <path d="M7.5 5.3c1.3 0 2.4.5 3.3 1.3l1.1-1.1a6.2 6.2 0 0 0-8.8 0l1.1 1.1c.9-.8 2-1.3 3.3-1.3Z" />
          <path d="M7.5 8.3c.5 0 .9.2 1.2.5L7.5 10 6.3 8.8c.3-.3.7-.5 1.2-.5Z" />
        </svg>
        <span className="iphone-battery">
          <span />
        </span>
      </span>
    </div>
  );
};

const ChatPanel: React.FC<{ style?: React.CSSProperties; origin?: { x: number; y: number } }> = ({ style, origin }) => {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(() => load<Profile | null>(PROFILE_KEY, null));
  // Toda vez que o chat abre, começa escolhendo nome e bandeira
  const [editing, setEditing] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [gifOpen, setGifOpen] = useState(false);
  const [mine, setMine] = useState<number[]>(() => load<number[]>(MINE_KEY, []));
  const lastSent = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // O celular cresce a partir do balão, como uma janela abrindo no macOS
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (el && origin) el.style.transformOrigin = `${origin.x - el.offsetLeft}px ${origin.y - el.offsetTop}px`;
  }, [origin]);

  // Histórico + mensagens novas ao vivo
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;

    client
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data, error: err }) => {
        if (!active) return;
        if (err) setError(t('chat.loadError'));
        else setMessages((data ?? []).reverse());
        setLoading(false);
      });

    const channel = client
      .channel('portfolio-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const msg = payload.new as ChatMessage;
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) => {
        const id = (payload.old as Partial<ChatMessage>).id;
        setMessages((prev) => prev.filter((m) => m.id !== id));
      })
      .subscribe();

    return () => {
      active = false;
      client.removeChannel(channel);
    };
  }, [t]);

  // Rola para a última mensagem (também quando um GIF termina de carregar e muda a altura)
  const scrollToEnd = () => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  useEffect(scrollToEnd, [messages, profile, editing, gifOpen]);

  const lang = i18n.language.toLowerCase();
  const formatStamp = useMemo(() => {
    const recent = new Intl.DateTimeFormat(lang, { weekday: 'short', hour: '2-digit', minute: '2-digit' });
    const older = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    return (d: Date) => (Date.now() - d.getTime() < 6 * 24 * 3600 * 1000 ? recent : older).format(d);
  }, [lang]);

  const post = async (content: string, gifUrl: string | null) => {
    if (!supabase || !profile || sending) return false;
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setError(t('chat.wait'));
      return false;
    }
    setSending(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('messages')
      .insert({ name: profile.name, country: profile.country, content: content.slice(0, MAX_LENGTH), gif_url: gifUrl })
      .select()
      .single();
    setSending(false);
    if (err || !data) {
      setError(t('chat.sendError'));
      return false;
    }
    lastSent.current = Date.now();
    const msg = data as ChatMessage;
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    setMine((prev) => {
      const next = [...prev, msg.id].slice(-200);
      save(MINE_KEY, next);
      return next;
    });
    return true;
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (content && (await post(content, null))) setText('');
  };

  const sendGif = async (url: string) => {
    if (await post('', url)) setGifOpen(false);
  };

  const showForm = editing;
  const lastOwnId = [...messages].reverse().find((m) => mine.includes(m.id))?.id;

  return (
    <motion.div
      className="chat-panel"
      role="dialog"
      aria-label={t('chat.title')}
      style={style}
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.06 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] } }}
      exit={{ opacity: 0, scale: 0.06, transition: { duration: 0.28, ease: [0.4, 0, 0.7, 0.2] } }}
    >
      <StatusBar />
      <div className="imsg-header">
        {/* A seta volta para a escolha de nome e bandeira; quem fecha o chat é o X do botão flutuante */}
        {showForm ? (
          <span className="imsg-header__spacer" />
        ) : (
          <button type="button" className="imsg-back" aria-label={t('chat.editProfile')} onClick={() => setEditing(true)}>
            <FaChevronLeft size={20} />
          </button>
        )}
        <div className="imsg-contact">
          <span className="imsg-contact__avatar" aria-hidden>
            <FaEarthAmericas size={30} />
          </span>
          <strong className="imsg-contact__name">
            {t('chat.world')} <FaChevronRight size={9} aria-hidden />
          </strong>
        </div>
        <span className="imsg-header__spacer" />
      </div>

      {showForm ? (
        <ProfileForm
          initial={profile}
          onDone={(p) => {
            save(PROFILE_KEY, p);
            setProfile(p);
            setEditing(false);
          }}
        />
      ) : (
        <>
          <div className="imsg-list" ref={listRef}>
            <p className="imsg-note">{t('chat.subtitle')}</p>
            {loading && <p className="chat-empty">{t('chat.loading')}</p>}
            {!loading && messages.length === 0 && <p className="chat-empty">{t('chat.empty')}</p>}
            {messages.map((m, i) => {
              const own = mine.includes(m.id);
              const prev = messages[i - 1];
              const next = messages[i + 1];
              const time = new Date(m.created_at).getTime();
              const showStamp = !prev || time - new Date(prev.created_at).getTime() > TIMESTAMP_GAP_MS;
              const key = senderKey(m, own);
              const first =
                showStamp ||
                !prev ||
                senderKey(prev, mine.includes(prev.id)) !== key ||
                time - new Date(prev.created_at).getTime() > GROUP_GAP_MS;
              const nextStamp = next && new Date(next.created_at).getTime() - time > TIMESTAMP_GAP_MS;
              const last =
                !next ||
                nextStamp ||
                senderKey(next, mine.includes(next.id)) !== key ||
                new Date(next.created_at).getTime() - time > GROUP_GAP_MS;

              return (
                <React.Fragment key={m.id}>
                  {showStamp && <p className="imsg-stamp">{formatStamp(new Date(m.created_at))}</p>}
                  {!own && first && <p className="imsg-name">{m.name ?? t('chat.anonName')}</p>}
                  <div className={`imsg-row${own ? ' is-own' : ''}${last ? ' is-last' : ''}`}>
                    {!own && (last ? <Avatar country={m.country} size={28} /> : <span className="imsg-spacer" />)}
                    {m.gif_url ? (
                      <img className="imsg-gif" src={m.gif_url} alt="GIF" onLoad={scrollToEnd} />
                    ) : (
                      <p className="imsg-bubble">
                        {m.content}
                        {last && <Tail />}
                      </p>
                    )}
                  </div>
                  {m.gif_url && m.content.trim() && (
                    <div className={`imsg-row${own ? ' is-own' : ''}`}>
                      {!own && <span className="imsg-spacer" />}
                      <p className="imsg-bubble">{m.content}</p>
                    </div>
                  )}
                  {m.id === lastOwnId && i === messages.length - 1 && <p className="imsg-delivered">{t('chat.delivered')}</p>}
                </React.Fragment>
              );
            })}
          </div>

          {!profile ? (
            <div className="imsg-compose">
              <button type="button" className="imsg-join" onClick={() => setEditing(true)}>
                <FaUserPlus size={15} /> {t('chat.joinCta')}
              </button>
            </div>
          ) : (
            <>
            {gifOpen && GIPHY_KEY && <GifPicker onPick={sendGif} />}

            <form className="imsg-compose" onSubmit={send}>
              {GIPHY_KEY && (
                <button
                  type="button"
                  className={`imsg-gif-btn${gifOpen ? ' is-active' : ''}`}
                  onClick={() => setGifOpen((o) => !o)}
                  aria-label={t('chat.gif')}
                  aria-pressed={gifOpen}
                >
                  <FaPlus size={14} />
                </button>
              )}
              <div className="imsg-field">
                <input
                  value={text}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setGifOpen(false)}
                  placeholder={t('chat.placeholder')}
                  aria-label={t('chat.placeholder')}
                />
                {text.trim() && (
                  <button type="submit" className="imsg-send" aria-label={t('chat.send')} disabled={sending}>
                    <FaArrowUp size={13} />
                  </button>
                )}
              </div>
            </form>
            </>
          )}
          {error && <p className="chat-error" role="alert">{error}</p>}
        </>
      )}
    </motion.div>
  );
};

export default ChatPanel;
