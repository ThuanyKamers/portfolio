import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowUp, FiCornerDownLeft, FiExternalLink, FiGlobe, FiHash, FiMessageCircle, FiSearch, FiVolume2 } from 'react-icons/fi';
import { LINKS } from './SocialLinks';
import { isMuted, play, setMuted } from '../utils/sound';
import { scrollToSection } from '../utils/scrollToSection';

interface Command {
  id: string;
  group: string;
  label: string;
  icon: React.ReactNode;
  run: () => void;
}

const SECTIONS = [
  ['experience', 'nav.experience'],
  ['international', 'nav.international'],
  ['tech-stack', 'nav.techStack'],
  ['projects', 'nav.projects'],
  ['writeups', 'nav.writeups'],
  ['achievements', 'nav.achievements'],
  ['contact', 'nav.contact'],
] as const;

const LANGUAGES = { EN: 'English', PT: 'Português', ES: 'Español', DE: 'Deutsch', FR: 'Français' };

// Ignora acentos e maiúsculas na busca ("seguranca" encontra "Segurança")
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Menu de comandos: Ctrl+K (ou ⌘K) abre, setas escolhem, Enter executa
const CommandPalette: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setQuery('');
    setActive(0);
    setOpen(true);
    play('tap');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen);
    };
  }, [open, close, show]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const commands = useMemo<Command[]>(() => [
    { id: 'top', group: t('palette.go'), label: t('palette.top'), icon: <FiArrowUp />, run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    ...SECTIONS.map(([id, key]) => ({ id, group: t('palette.go'), label: t(key), icon: <FiHash />, run: () => scrollToSection(id) })),
    { id: 'chat', group: t('palette.actions'), label: t('chat.open'), icon: <FiMessageCircle />, run: () => window.dispatchEvent(new Event('chat:open')) },
    {
      id: 'sound', group: t('palette.actions'), label: t('palette.sound'), icon: <FiVolume2 />,
      run: () => {
        setMuted(!isMuted());
        play('tap');
      },
    },
    ...Object.entries(LANGUAGES).map(([code, name]) => ({
      id: `lang-${code}`, group: t('palette.language'), label: name, icon: <FiGlobe />, run: () => void i18n.changeLanguage(code),
    })),
    ...LINKS.map(({ label, href }) => ({
      id: `link-${label}`, group: t('palette.links'), label, icon: <FiExternalLink />,
      run: () => void window.open(href, '_blank', 'noopener,noreferrer'),
    })),
  ], [t, i18n]);

  const results = useMemo(() => {
    const q = fold(query.trim());
    return q ? commands.filter((c) => fold(`${c.label} ${c.group}`).includes(q)) : commands;
  }, [commands, query]);

  const current = Math.min(active, Math.max(results.length - 1, 0));

  // Mantém o item escolhido visível ao andar com as setas
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [current, open]);

  if (!open) return null;

  const execute = (c: Command) => {
    close();
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((current + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((current - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results[current]) {
      e.preventDefault();
      execute(results[current]);
    }
  };

  return createPortal(
    <div className="palette" onPointerDown={close}>
      <div
        className="palette__box"
        role="dialog"
        aria-modal="true"
        aria-label={t('palette.title')}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="palette__search">
          <FiSearch aria-hidden />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={t('palette.placeholder')}
            aria-label={t('palette.placeholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[current] ? `palette-${results[current].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <ul ref={list} id="palette-list" className="palette__list no-scrollbar" role="listbox">
          {results.length === 0 && <li className="palette__empty">{t('palette.empty')}</li>}
          {results.map((c, i) => (
            <React.Fragment key={c.id}>
              {(i === 0 || results[i - 1].group !== c.group) && (
                <li className="palette__group" role="presentation">{c.group}</li>
              )}
              <li
                id={`palette-${c.id}`}
                role="option"
                aria-selected={i === current}
                className="palette__item"
                onMouseMove={() => setActive(i)}
                onClick={() => execute(c)}
              >
                <span className="palette__icon">{c.icon}</span>
                <span className="palette__label">{c.label}</span>
                {i === current && <FiCornerDownLeft className="palette__enter" aria-hidden />}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;
