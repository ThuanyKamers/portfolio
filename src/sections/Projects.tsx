import React, { useRef } from 'react';
import { FaCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { asset } from '../utils/asset';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

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
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.active = false;
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
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              index={i}
              title={p.title}
              description={p.description}
              tech={p.tech}
              link={p.link}
              image={p.image ? asset(p.image) : undefined}
              cover={p.cover ? asset(p.cover) : undefined}
            />
          ))}
          <div
            className="group shrink-0 w-72 sm:w-80 h-105 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-[0_0_32px_rgba(129,140,248,0.45)] border-white/15 hover:border-indigo-400/60"
            style={{ borderWidth: '1px', borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px' }}
          >
            <FaCode size={72} className="transition-transform duration-300 group-hover:scale-110" style={{ color: 'rgba(129,140,248,0.55)' }} />
            <p className="text-white/70 font-bold text-xl" style={{ marginTop: '16px' }}>{t('projects.soon')}</p>
            <p className="text-white/40 text-sm">{t('projects.soonSub')}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
