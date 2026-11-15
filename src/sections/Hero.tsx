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
    <section id="hero" className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          {/* Disponibilidade: a primeira coisa que um recrutador procura */}
          <p className="hero__status">
            <span className="hero-status__dot" aria-hidden />
            {t('hero.status')}
          </p>

          <h1 className="hero__name">Thuany Paula Kamers</h1>

          {/* Cargo digitando, como num terminal. A chave reinicia a digitação quando o idioma muda */}
          <h2 className="hero__role">
            <span className="hero__prompt" aria-hidden>&gt;</span>
            <TypedRoles key={i18n.language} roles={Array.isArray(roles) ? roles : [t('hero.role')]} />
          </h2>

          <p className="hero__desc">{t('hero.description')}</p>
        </div>

        {/* Avatar em pixel art dentro de uma mira, inclinando com o mouse */}
        <div ref={tilt} className="hero-avatar-tilt hero__avatar">
          <img
            src={asset('images/avatar/thuany-pixel.webp')}
            alt="Thuany Kamers"
            width={240}
            height={240}
            className="hero-avatar"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;