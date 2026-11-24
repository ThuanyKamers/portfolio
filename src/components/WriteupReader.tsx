import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import { WRITEUPS, WRITEUPS_REPO, slugOf } from '../data/writeups';
import { play } from '../utils/sound';

// Página de leitura de um writeup, aberta por cima do site pelo endereço #writeup/<slug>.
// O conteúdo vem de public/writeups/<slug>.json, gerado na build por scripts/fetch-writeups.mjs,
// e só é baixado quando alguém abre o writeup.

interface Page {
  slug: string;
  title: string;
  minutes: number;
  toc: { id: string; label: string }[];
  html: string;
}

const PREFIX = '#writeup/';
const slugFromHash = () => (location.hash.startsWith(PREFIX) ? decodeURIComponent(location.hash.slice(PREFIX.length)) : null);
const BASE = `${import.meta.env.BASE_URL}writeups/`;

const WriteupReader: React.FC = () => {
  const { t } = useTranslation();
  const [slug, setSlug] = useState<string | null>(slugFromHash);
  // Guarda o resultado junto com o slug, para um writeup antigo nunca aparecer no lugar do novo
  const [loaded, setLoaded] = useState<{ slug: string; page: Page | null } | null>(null);
  const page = loaded && loaded.slug === slug ? loaded.page : null;
  const failed = !!loaded && loaded.slug === slug && !loaded.page;
  const [activeId, setActiveId] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHash = () => setSlug(slugFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const meta = slug ? WRITEUPS.find((w) => slugOf(w.file) === slug) : undefined;

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetch(`${BASE}${encodeURIComponent(slug)}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((p: Page) => {
        if (!alive) return;
        // As imagens ficam em writeups/img/, ao lado dos arquivos .json
        setLoaded({ slug, page: { ...p, html: p.html.replace(/src="img\//g, `src="${BASE}img/`) } });
      })
      .catch(() => alive && setLoaded({ slug, page: null }));
    return () => { alive = false; };
  }, [slug]);

  // Trava a página do fundo e volta ao topo do writeup ao abrir
  useEffect(() => {
    if (!slug) return;
    document.documentElement.style.overflow = 'hidden';
    scroller.current?.scrollTo(0, 0);
    return () => { document.documentElement.style.overflow = ''; };
  }, [slug]);

  const close = useCallback(() => {
    play('close');
    // Tira o #writeup/... do endereço sem pular a página
    history.pushState(null, '', location.pathname + location.search);
    setSlug(null);
    document.getElementById('writeups')?.scrollIntoView({ block: 'start' });
  }, []);

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slug, close]);

  // Marca no índice a parte que está sendo lida
  useEffect(() => {
    const root = scroller.current;
    if (!page || !root) return;
    const heads = page.toc.map((h) => root.querySelector<HTMLElement>(`#${CSS.escape(h.id)}`)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      let current: string | null = null;
      for (const h of heads) if (h.getBoundingClientRect().top < 140) current = h.id;
      setActiveId(current);
    };
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [page]);

  const jump = (id: string) => {
    const root = scroller.current;
    const el = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (root && el) root.scrollTo({ top: root.scrollTop + el.getBoundingClientRect().top - 90, behavior: 'smooth' });
  };

  if (!slug) return null;
  const github = meta ? `${WRITEUPS_REPO}/blob/main/${meta.file}` : WRITEUPS_REPO;

  return createPortal(
    <div ref={scroller} className="reader" role="dialog" aria-modal="true" aria-label={page?.title ?? meta?.room ?? 'Writeup'}>
      <div className="reader__bar">
        <button type="button" className="reader__back" onClick={close}>
          <FiArrowLeft aria-hidden /> {t('writeups.read.back')}
        </button>
        <span className="reader__file">~/writeups/{slug}.md</span>
      </div>

      <div className="reader__layout">
        {page && page.toc.length > 1 && (
          <nav className="reader__toc" aria-label={t('writeups.read.toc')}>
            <p className="reader__toc-title">// {t('writeups.read.toc')}</p>
            {page.toc.map((h) => (
              <button key={h.id} type="button" className={`reader__toc-item${activeId === h.id ? ' is-on' : ''}`} onClick={() => jump(h.id)}>
                {h.label}
              </button>
            ))}
          </nav>
        )}

        <article className="reader__main">
          <h1 className="reader__title">{page?.title ?? meta?.room}</h1>
          <div className="reader__meta">
            {meta?.topics.map((topic) => <span key={topic} className="reader__chip">{topic}</span>)}
            {page && <span className="reader__chip reader__chip--muted">{t('writeups.read.minutes', { n: page.minutes })}</span>}
            <a className="reader__chip reader__chip--muted" href={github} target="_blank" rel="noopener noreferrer">
              {t('writeups.read.github')} <FiArrowUpRight aria-hidden />
            </a>
          </div>

          {!page && !failed && <p className="reader__status">{t('writeups.read.loading')}</p>}
          {failed && (
            <p className="reader__status">
              {t('writeups.read.error')}{' '}
              <a href={github} target="_blank" rel="noopener noreferrer">{t('writeups.read.github')}</a>
            </p>
          )}
          {/* HTML gerado na build a partir dos writeups do próprio repositório; HTML solto no markdown vira texto */}
          {page && <div className="reader__content" dangerouslySetInnerHTML={{ __html: page.html }} />}

          <button type="button" className="reader__back reader__back--end" onClick={close}>
            <FiArrowLeft aria-hidden /> {t('writeups.read.back')}
          </button>
        </article>
      </div>
    </div>,
    document.body
  );
};

export default WriteupReader;
