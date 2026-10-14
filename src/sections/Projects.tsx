import React, { useEffect, useRef, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { asset } from '../utils/asset';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false, lastX: 0, lastT: 0, vel: 0 });
  const raf = useRef(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const stopMotion = () => cancelAnimationFrame(raf.current);
  useEffect(() => stopMotion, []);

  // Deslocamento elástico quando o arraste passa do início/fim do carrossel
  const setOver = (px: number, animate: boolean) => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = animate ? 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
    el.style.transform = px ? `translateX(${px}px)` : '';
  };

  const projects = t('projects.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tech: string[];
    link: string;
    image?: string;
    cover?: string;
  }>;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return;
    stopMotion();
    setOver(0, false);
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false, lastX: e.clientX, lastT: performance.now(), vel: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    const track = trackRef.current;
    const max = track.scrollWidth - track.clientWidth;
    const pos = d.startScroll - dx;
    track.scrollLeft = Math.min(Math.max(pos, 0), max);
    // Passou da ponta: o conteúdo acompanha com resistência
    const over = pos < 0 ? pos : pos > max ? pos - max : 0;
    setOver(-over * 0.35, false);
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.vel = 0.8 * d.vel + 0.2 * ((d.lastX - e.clientX) / dt);
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endDrag = () => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track) return;
    d.active = false;
    const max = track.scrollWidth - track.clientWidth;
    // Soltou fora dos limites: volta com efeito elástico
    if (innerRef.current?.style.transform) {
      setOver(0, true);
      return;
    }
    // Inércia: continua rolando e vai desacelerando
    if (performance.now() - d.lastT > 80) return;
    let v = d.vel;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + v * dt, 0), max);
      v *= Math.pow(0.95, dt / 16);
      const atEdge = track.scrollLeft <= 0 || track.scrollLeft >= max;
      if (Math.abs(v) > 0.03 && !atEdge) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  // Evita que o fim de um arraste dispare cliques nos botões do card
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full" style={{ paddingLeft: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))', paddingRight: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))' }}>
        <div className="flex items-center justify-between gap-4" data-reveal>
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {t('projects.title')} <span className="text-blue-400 italic">{t('projects.subtitle')}</span>
          </h2>
          <span
            className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-widest text-white/50 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px' }}
          >
            {t('projects.drag')} →
          </span>
        </div>
      </div>

      {Array.isArray(projects) && (
        <div
          ref={trackRef}
          data-reveal
          className="w-full flex gap-6 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ marginTop: '16px', paddingTop: '24px', paddingBottom: '24px', userSelect: 'none', maxWidth: '100vw', paddingLeft: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))', paddingRight: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
        >
          <div ref={innerRef} className="flex gap-6 shrink-0">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              title={p.title}
              description={p.description}
              tech={p.tech}
              link={p.link}
              image={p.image ? asset(p.image) : undefined}
              cover={p.cover ? asset(p.cover) : undefined}
            />
          ))}
          <div
            className="group shrink-0 w-72 sm:w-80 h-105 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-[0_0_16px_rgba(129,140,248,0.4)] border-white/15 hover:border-indigo-400/60"
            style={{ borderWidth: '1px', borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px' }}
          >
            <FaCode size={72} className="transition-transform duration-300 group-hover:scale-110" style={{ color: 'rgba(129,140,248,0.55)' }} />
            <p className="text-white/70 font-bold text-xl" style={{ marginTop: '16px' }}>{t('projects.soon')}</p>
            <p className="text-white/40 text-sm">{t('projects.soonSub')}</p>
          </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
