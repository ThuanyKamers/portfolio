import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Gerados uma vez ao carregar o módulo: a renderização continua pura
const SNOWFLAKES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 0.2 + 0.1,
  leftIni: (Math.random() - 0.5) * 20,
  leftEnd: (Math.random() - 0.5) * 20,
  left: Math.random() * 100,
  duration: 5 + Math.random() * 10,
  delay: -Math.random() * 10,
  blur: i % 6 === 5,
}));

const SnowBackground: React.FC = () => {
  const snowflakes = SNOWFLAKES;
  const layer = useRef<HTMLDivElement>(null);

  // Parallax: a neve desliza de leve no sentido contrário ao do mouse (só em telas com mouse)
  useEffect(() => {
    const el = layer.current;
    const mq = (q: string) => window.matchMedia(q).matches;
    if (!el || !mq('(hover: hover)') || mq('(prefers-reduced-motion: reduce)')) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${(0.5 - e.clientX / window.innerWidth) * 28}px`);
        el.style.setProperty('--py', `${(0.5 - e.clientY / window.innerHeight) * 28}px`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <StyledSnowBackground className="snow-bg">
      <div ref={layer} className="snow-layer">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              '--size': `${flake.size}vw`,
              '--left-ini': `${flake.leftIni}vw`,
              '--left-end': `${flake.leftEnd}vw`,
              left: `${flake.left}vw`,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              filter: flake.blur ? 'blur(1px)' : 'none',
            } as React.CSSProperties}
          />
        ))}
      </div>
    </StyledSnowBackground>
  );
};

const StyledSnowBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1e 100%);
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  .snow-layer {
    position: absolute;
    inset: 0;
    transform: translate3d(var(--px, 0px), var(--py, 0px), 0);
    transition: transform 0.6s ease-out;
  }

  .snowflake {
    width: var(--size);
    height: var(--size);
    background: white;
    border-radius: 50%;
    position: absolute;
    top: -5vh;
    animation: snowfall linear infinite;
    will-change: transform;
  }

  /* Quem pede menos movimento no sistema não vê a neve caindo */
  @media (prefers-reduced-motion: reduce) {
    .snowflake { display: none; }
  }

  @keyframes snowfall {
    0% {
      transform: translate3d(var(--left-ini), 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(var(--left-end), 110vh, 0);
      opacity: 0.4;
    }
  }
`;

export default SnowBackground;
