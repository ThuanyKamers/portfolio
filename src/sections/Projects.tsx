import React, { useEffect, useRef, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { asset } from '../utils/asset';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  const drag = useRef({ active: false, startX: 0, startPos: 0, moved: false, lastX: 0, lastT: 0, vel: 0 });
  const raf = useRef(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = t('projects.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tech: string[];
    link: string;
    image?: string;
    cover?: string;
  }>;

  // Limite à esquerda (valor negativo); 0 é o início da trilha
  const minPos = () => {
    const c = containerRef.current;
    const tr = trackRef.current;
    if (!c || !tr) return 0;
    return Math.min(0, c.clientWidth - tr.scrollWidth);
  };

  const apply = (x: number, transition = 'none') => {
    const tr = trackRef.current;
    if (!tr) return;
    pos.current = x;
    tr.style.transition = transition;
    tr.style.transform = `translate3d(${x}px, 0px, 0px)`;
  };

  // Volta para dentro dos limites com efeito elástico
  const settle = () => {
    const x = Math.min(0, Math.max(minPos(), pos.current));
    if (x !== pos.current) apply(x, 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)');
  };

  useEffect(() => {
    window.addEventListener('resize', settle);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', settle);
    };
  }, []);

  // Card aberto/fechado muda a largura da trilha: reencaixa depois da transição
  useEffect(() => {
    const id = setTimeout(settle, 460);
    return () => clearTimeout(id);
  }, [openIndex]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(raf.current);
    apply(pos.current);
    drag.current = { active: true, startX: e.clientX, startPos: pos.current, moved: false, lastX: e.clientX, lastT: performance.now(), vel: 0 };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    let x = d.startPos + dx;
    const min = minPos();
    // Passou da ponta: acompanha com resistência
    if (x > 0) x *= 0.35;
    else if (x < min) x = min + (x - min) * 0.35;
    apply(x);
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.vel = 0.8 * d.vel + 0.2 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endDrag = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const min = minPos();
    if (pos.current > 0 || pos.current < min || performance.now() - d.lastT > 80) {
      settle();
      return;
    }
    // Inércia com fricção: continua deslizando e desacelera
    let v = d.vel;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      let x = pos.current + v * dt;
      v *= Math.pow(0.95, dt / 16);
      if (x > 0 || x < min) {
        x = Math.min(0, Math.max(min, x));
        v = 0;
      }
      apply(x);
      if (Math.abs(v) > 0.02) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  // Evita que o fim de um arraste dispare cliques nos cards
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

        </div>
      </div>

      {Array.isArray(projects) && (
        <div
          ref={containerRef}
          data-reveal
          className="proj-slider-container"
          style={{ marginTop: '16px', paddingTop: '24px', paddingBottom: '80px', marginBottom: '-56px' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
        >
          <div ref={trackRef} className="proj-track" style={{ paddingLeft: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))', paddingRight: 'max(2rem, calc((100vw - 72rem) / 2 + 3rem))' }}>
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
              className="group shrink-0 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-[0_0_16px_rgba(129,140,248,0.4)] border-white/15 hover:border-indigo-400/60"
              style={{ width: 'min(300px, 80vw)', height: '420px', borderRadius: '18px', borderWidth: '1px', borderStyle: 'dashed', backgroundColor: 'rgba(255,255,255,0.03)', padding: '20px' }}
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
