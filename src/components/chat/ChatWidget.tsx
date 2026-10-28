import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { FaCommentDots, FaTimes } from 'react-icons/fa';

// O painel (com o cliente do Supabase e as bandeiras) só é baixado no primeiro clique
const ChatPanel = lazy(() => import('./ChatPanel'));

const enabled = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

const POSITION_KEY = 'chat-position';
const GAP = 12;
const PANEL_WIDTH = 340;
const PANEL_MAX_HEIGHT = 660;

// Posiciona o painel junto do balão, abrindo para o lado e para a direção com mais espaço
const panelStyle = (rect: DOMRect): React.CSSProperties => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const above = rect.top + rect.height / 2 > vh / 2;
  const space = above ? rect.top - GAP * 2 : vh - rect.bottom - GAP * 2;
  const style: React.CSSProperties = {
    height: Math.min(PANEL_MAX_HEIGHT, Math.max(space, 260)),
    ...(above ? { bottom: Math.max(vh - rect.top + GAP, GAP) } : { top: Math.min(rect.bottom + GAP, vh - 260 - GAP) }),
  };
  if (vw > 480) {
    const preferred = rect.left + rect.width / 2 > vw / 2 ? rect.right - PANEL_WIDTH : rect.left;
    style.left = Math.min(Math.max(preferred, GAP), vw - PANEL_WIDTH - GAP);
  }
  return style;
};

const ChatWidget: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);
  const constraints = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const dragged = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const measure = useCallback(() => {
    if (button.current) setAnchor(button.current.getBoundingClientRect());
  }, []);

  // Mantém o balão dentro da tela (ao carregar a posição salva e ao redimensionar a janela)
  const clamp = useCallback(() => {
    const el = button.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth) x.set(x.get() - (r.right - window.innerWidth) - GAP);
    if (r.left < 0) x.set(x.get() - r.left + GAP);
    if (r.bottom > window.innerHeight) y.set(y.get() - (r.bottom - window.innerHeight) - GAP);
    if (r.top < 0) y.set(y.get() - r.top + GAP);
    measure();
  }, [x, y, measure]);

  useEffect(() => {
    if (!enabled) return;
    try {
      const saved = JSON.parse(localStorage.getItem(POSITION_KEY) ?? 'null');
      if (saved) {
        x.set(saved.x);
        y.set(saved.y);
      }
    } catch {
      /* sem posição salva */
    }
    clamp();
    window.addEventListener('resize', clamp);
    return () => window.removeEventListener('resize', clamp);
  }, [x, y, clamp]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!enabled) return null;

  return (
    <>
      <div ref={constraints} className="chat-bounds" aria-hidden="true" />
      <AnimatePresence>
        {open && anchor && (
          <Suspense fallback={null}>
            <ChatPanel style={panelStyle(anchor)} />
          </Suspense>
        )}
      </AnimatePresence>
      <motion.button
        ref={button}
        type="button"
        className="chat-fab"
        aria-label={open ? t('chat.close') : t('chat.open')}
        aria-expanded={open}
        title={t('chat.open')}
        drag
        dragConstraints={constraints}
        dragMomentum={false}
        dragElastic={0}
        style={{ x, y }}
        whileHover={{ scale: 1.08 }}
        whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
        onDragStart={() => {
          dragged.current = true;
        }}
        onDrag={measure}
        onDragEnd={() => {
          try {
            localStorage.setItem(POSITION_KEY, JSON.stringify({ x: x.get(), y: y.get() }));
          } catch {
            /* sem persistência */
          }
          measure();
        }}
        onClick={() => {
          // Soltar depois de arrastar não abre o chat
          if (dragged.current) {
            dragged.current = false;
            return;
          }
          measure();
          setOpen((o) => !o);
        }}
      >
        {open ? <FaTimes size={26} /> : <FaCommentDots size={38} />}
      </motion.button>
    </>
  );
};

export default ChatWidget;
