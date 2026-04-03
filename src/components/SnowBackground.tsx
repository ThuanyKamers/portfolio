import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';

const SnowBackground: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const snowflakes = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 0.2 + 0.1,
      leftIni: (Math.random() - 0.5) * 20,
      leftEnd: (Math.random() - 0.5) * 20,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: -Math.random() * 10,
      blur: i % 6 === 5,
    })), []
  );

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <StyledSnowBackground className="snow-bg" $isDark={isDark}>
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
    </StyledSnowBackground>
  );
};

const StyledSnowBackground = styled.div<{ $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.$isDark
    ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1e 100%)'
    : 'linear-gradient(135deg, #FFF3FF 0%, #EFE3EF 25%, #DFD3DF 50%, #CEC3CE 75%, #BEB3BE 100%)'
  };
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  transition: background 0.5s ease;

  .snowflake {
    width: var(--size);
    height: var(--size);
    background: ${(props) => props.$isDark ? 'white' : '#1a1a1a'};
    border-radius: 50%;
    position: absolute;
    top: -5vh;
    animation: snowfall linear infinite;
    will-change: transform;
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
