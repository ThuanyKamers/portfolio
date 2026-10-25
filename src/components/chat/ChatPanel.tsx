import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTimes, FaUser } from 'react-icons/fa';
import { countries } from 'country-flag-icons';
import * as Flags from 'country-flag-icons/react/1x1';
import { supabase, type ChatMessage } from '../../lib/supabase';

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

const ChatPanel: React.FC<{ onClose: () => void; style?: React.CSSProperties }> = ({ onClose, style }) => {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<Profile | null>(() => load<Profile | null>(PROFILE_KEY, null));
  const [editing, setEditing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [mine, setMine] = useState<number[]>(() => load<number[]>(MINE_KEY, []));
  const lastSent = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

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

  // Rola para a última mensagem
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, profile, editing]);

  const timeFormat = useMemo(
    () => new Intl.DateTimeFormat(i18n.language.toLowerCase(), { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
    [i18n.language],
  );

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!supabase || !profile || !content || sending) return;
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setError(t('chat.wait'));
      return;
    }
    setSending(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('messages')
      .insert({ name: profile.name, country: profile.country, content: content.slice(0, MAX_LENGTH) })
      .select()
      .single();
    setSending(false);
    if (err || !data) {
      setError(t('chat.sendError'));
      return;
    }
    lastSent.current = Date.now();
    setText('');
    const msg = data as ChatMessage;
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    setMine((prev) => {
      const next = [...prev, msg.id].slice(-200);
      save(MINE_KEY, next);
      return next;
    });
  };

  const showForm = !profile || editing;

  return (
    <motion.div
      className="chat-panel"
      role="dialog"
      aria-label={t('chat.title')}
      style={style}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.18 }}
    >
      <div className="chat-panel__header">
        <div>
          <strong>{t('chat.title')}</strong>
          <span>{t('chat.subtitle')}</span>
        </div>
        <button type="button" className="chat-icon-btn" aria-label={t('chat.close')} onClick={onClose}>
          <FaTimes size={14} />
        </button>
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
          <div className="chat-messages" ref={listRef}>
            {loading && <p className="chat-empty">{t('chat.loading')}</p>}
            {!loading && messages.length === 0 && <p className="chat-empty">{t('chat.empty')}</p>}
            {messages.map((m) => {
              const own = mine.includes(m.id);
              return (
                <div key={m.id} className={`chat-msg${own ? ' is-own' : ''}`}>
                  <Avatar country={m.country} />
                  <div className="chat-msg__body">
                    <div className="chat-msg__meta">
                      <span className="chat-msg__name">{m.name ?? t('chat.anonName')}</span>
                      <time dateTime={m.created_at}>{timeFormat.format(new Date(m.created_at))}</time>
                    </div>
                    <p className="chat-msg__text">{m.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="chat-compose" onSubmit={send}>
            <button
              type="button"
              className="chat-me"
              onClick={() => setEditing(true)}
              aria-label={t('chat.editProfile')}
              title={t('chat.editProfile')}
            >
              <Avatar country={profile.country} size={30} />
            </button>
            <input
              className="chat-input"
              value={text}
              maxLength={MAX_LENGTH}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('chat.placeholder')}
              aria-label={t('chat.placeholder')}
            />
            <button type="submit" className="chat-send" aria-label={t('chat.send')} disabled={!text.trim() || sending}>
              <FaPaperPlane size={14} />
            </button>
          </form>
          {error && <p className="chat-error" role="alert">{error}</p>}
        </>
      )}
    </motion.div>
  );
};

export default ChatPanel;
