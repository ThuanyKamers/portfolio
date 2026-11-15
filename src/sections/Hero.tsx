import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { asset } from '../utils/asset';

const canAnimate = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Escreve e apaga cada cargo, um depois do outro, como alguém digitando
const TypedRoles: React.FC<{ roles: string[] }> = ({ roles }) => {
  const [animate] = useState(canAnimate);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);
  const role = roles[index % roles.length] ?? '';

  useEffect(() => {
    if (!animate || roles.length < 2) return;
    const full = count === role.length;
    // Pausa com o cargo inteiro na tela, depois apaga mais rápido do que escreveu
    const delay = !erasing && full ? 1800 : erasing ? 35 : 75;
    const id = setTimeout(() => {
      if (!erasing && full) setErasing(true);
      else if (erasing && count === 0) {
        setErasing(false);
        setIndex((i) => (i + 1) % roles.length);
      } else setCount((c) => c + (erasing ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [animate, roles.length, role, count, erasing]);

  if (!animate || roles.length < 2) return <>{roles.join(' & ')}</>;
  return (
    <>
      {/* Leitores de tela recebem os cargos de uma vez, sem o efeito */}
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">
        {role.slice(0, Math.min(count, role.length))}
        <span className="hero-caret" />
      </span>
    </>
  );
};

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation(); // Isso "ativa" as traduções neste componente
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const tilt = useRef<HTMLDivElement>(null);

  // O avatar inclina de leve na direção do mouse (só em telas com mouse)
  useEffect(() => {
    const el = tilt.current;
    if (!el || !canAnimate() || !window.matchMedia('(hover: hover)').matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.setProperty('--ry', `${Math.max(-1, Math.min(1, dx * 2)) * 18}deg`);
        el.style.setProperty('--rx', `${Math.max(-1, Math.min(1, dy * 2)) * -18}deg`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col justify-center items-center px-4 pt-16 bg-transparent"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl w-full text-center">
        
        {/* Avatar em pixel art */}
        <div className="flex justify-center" style={{ paddingBottom: '28px' }}>
          <div ref={tilt} className="hero-avatar-tilt">
            <img
              src={asset('images/avatar/thuany-pixel.webp')}
              alt="Thuany Kamers"
              width={176}
              height={176}
              className="hero-avatar"
            />
          </div>
        </div>

        {/* Disponibilidade: a primeira coisa que um recrutador procura */}
        <div className="flex justify-center" style={{ paddingBottom: '22px' }}>
          <span className="hero-status">
            <span className="hero-status__dot" aria-hidden />
            {t('hero.status')}
          </span>
        </div>

        {/* Bloco 1: Saudação */}
        <div style={{ paddingBottom: '20px' }}>
          <p className="font-mono text-sm tracking-widest uppercase text-blue-400">
            {t('hero.greeting')} {/* "Hi, my name is" */}
          </p>
        </div>

        {/* Bloco 2: Nome - Geralmente nome não se traduz */}
        <div style={{ paddingBottom: '20px' }}>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight wrap-break-word"
            style={{ color: 'var(--foreground)' }}
          >
            Thuany Paula Kamers
          </h1>
        </div>

        {/* Bloco 3: Cargo */}
        <div style={{ paddingBottom: '30px' }}>
          <h2
            className="hero-role text-3xl md:text-5xl font-bold"
            style={{ color: 'var(--text-muted)' }}
          >
            {/* A chave reinicia a digitação quando o idioma muda */}
            <TypedRoles key={i18n.language} roles={Array.isArray(roles) ? roles : [t('hero.role')]} />
          </h2>
        </div>

        {/* Bloco 4: Descrição */}
        <div>
          <p 
            className="max-w-5xl mx-auto text-lg md:text-xl leading-relaxed text-center"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('hero.description')} {/* "I am a information systems student..." */}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;