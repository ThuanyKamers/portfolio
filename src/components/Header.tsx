import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const NAV_IDS = ['experience', 'international', 'tech-stack', 'projects', 'achievements', 'contact'] as const;
const NAV_KEYS: Record<typeof NAV_IDS[number], string> = {
  'experience': 'nav.experience',
  'international': 'nav.international',
  'tech-stack': 'nav.techStack',
  'projects': 'nav.projects',
  'achievements': 'nav.achievements',
  'contact': 'nav.contact',
};

// Efeito Dock do macOS: o item sob o mouse cresce, os vizinhos crescem menos
const DOCK_MAX_SCALE = 1.55;
const DOCK_RADIUS = 200;
const DOCK_DROP = 16;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dockRaf = useRef(0);

  const layoutDock = useCallback((mouseX: number | null) => {
    const items = itemRefs.current.filter((el): el is HTMLButtonElement => !!el);
    if (!items.length) return;
    if (mouseX === null) {
      items.forEach((el) => {
        el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s';
        el.style.transform = '';
        el.style.color = 'var(--text-muted)';
      });
      return;
    }
    // Posições originais (offsetLeft ignora transforms)
    const rects = items.map((el) => ({ left: el.offsetLeft, width: el.offsetWidth }));
    const navLeft = (items[0].offsetParent as HTMLElement).getBoundingClientRect().left;
    const x = mouseX - navLeft;
    const scales = rects.map((r) => {
      const d = Math.abs(x - (r.left + r.width / 2));
      const t = Math.max(0, 1 - d / DOCK_RADIUS);
      return 1 + (DOCK_MAX_SCALE - 1) * (0.5 - 0.5 * Math.cos(Math.PI * t));
    });
    // Nova linha com larguras ampliadas, mantendo os espaços originais
    const newLeft: number[] = [];
    let cursor = rects[0].left;
    rects.forEach((r, i) => {
      if (i > 0) cursor += r.left - (rects[i - 1].left + rects[i - 1].width);
      newLeft.push(cursor);
      cursor += r.width * scales[i];
    });
    // Mantém fixo o ponto sob o mouse, para os vizinhos se afastarem para os dois lados
    let mapped = x;
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (x < r.left) { mapped = newLeft[i] - (r.left - x); break; }
      if (x <= r.left + r.width) { mapped = newLeft[i] + (x - r.left) * scales[i]; break; }
      mapped = newLeft[i] + r.width * scales[i] + (x - r.left - r.width);
    }
    const offset = x - mapped;
    items.forEach((el, i) => {
      const r = rects[i];
      const s = scales[i];
      const dx = newLeft[i] + (r.width * s) / 2 + offset - (r.left + r.width / 2);
      const dy = (s - 1) / (DOCK_MAX_SCALE - 1) * DOCK_DROP;
      el.style.transition = 'transform 0.12s ease-out, color 0.3s';
      el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${s.toFixed(3)})`;
      el.style.color = s > 1.3 ? 'var(--foreground)' : 'var(--text-muted)';
    });
  }, []);

  const onDockMove = useCallback((e: React.PointerEvent) => {
    const x = e.clientX;
    cancelAnimationFrame(dockRaf.current);
    dockRaf.current = requestAnimationFrame(() => layoutDock(x));
  }, [layoutDock]);

  const onDockLeave = useCallback(() => {
    cancelAnimationFrame(dockRaf.current);
    layoutDock(null);
  }, [layoutDock]);

  useEffect(() => () => cancelAnimationFrame(dockRaf.current), []);

  const navItems = useMemo(
    () => NAV_IDS.map((id) => ({ id, label: t(NAV_KEYS[id]) })),
    [t]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: 'var(--background)',
        opacity: 0.98,
      }}
    >
      <div className="w-full px-6 md:px-12">

        {/* Desktop layout (original grid) */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '80px',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '60px' }}>
            <div
              className="font-bold text-2xl tracking-tighter"
              style={{ color: 'var(--foreground)' }}
            >
              TPK<span className="text-blue-600">.</span>
            </div>
          </div>

          <nav
            className="flex items-center self-stretch"
            style={{ gap: '2.5rem' }}
            onPointerMove={onDockMove}
            onPointerLeave={onDockLeave}
          >
            {navItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-extrabold uppercase tracking-widest whitespace-nowrap"
                style={{ color: 'var(--text-muted)', transformOrigin: '50% 50%', willChange: 'transform' }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '60px' }}>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between h-16">
          <div
            className="font-bold text-2xl tracking-tighter"
            style={{ color: 'var(--foreground)' }}
          >
            TPK<span className="text-blue-600">.</span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--foreground)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-all duration-300 origin-center"
                style={{
                  backgroundColor: 'var(--foreground)',
                  transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          backgroundColor: 'var(--background)',
        }}
      >
        <nav className="flex flex-col px-8 pb-4 gap-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-sm font-bold uppercase tracking-widest py-2 transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
