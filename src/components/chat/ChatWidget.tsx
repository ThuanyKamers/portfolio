import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

// O painel (com o cliente do Supabase e as bandeiras) só é baixado no primeiro clique
const ChatPanel = lazy(() => import('./ChatPanel'));

const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const ChatWidget: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!enabled) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <ChatPanel onClose={() => setOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
      <button
        type="button"
        className="dock__icon chat-fab"
        aria-label={open ? t('chat.close') : t('chat.open')}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dock__glyph">{open ? <FaTimes size={20} /> : <FaCommentDots size={22} />}</span>
      </button>
    </>
  );
};

export default ChatWidget;
