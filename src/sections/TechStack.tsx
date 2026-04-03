import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Componente Interno para a Pilha Animada
const SkillStack = ({ name, color, index, iconUrl }: { name: string; color: string; index: number; iconUrl: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-40 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0 
      }}
    >
      <div className={`relative w-15 h-15 transition-all duration-500 ${isHovered ? 'rotate-[-35deg] skew-y-20 -translate-y-4' : ''}`}>
        {/* Camadas da Pilha */}
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-lg border transition-all duration-500"
            style={{
              borderColor: color,
              opacity: isHovered ? (i + 1) * 0.2 : i === 0 ? 1 : 0,
              transform: isHovered ? `translate(${i * 5}px, -${i * 5}px)` : 'none',
              boxShadow: isHovered ? `0 0 15px ${color}44` : 'none'
            }}
          />
        ))}

        {/* Camada Superior */}
        <span 
          className={`absolute inset-0 rounded-lg bg-black/40 backdrop-blur-sm border flex items-center justify-center transition-all duration-500 ${isHovered ? 'translate-x-5 -translate-y-5' : ''}`}
          style={{ borderColor: color }}
        >
          <img 
            src={iconUrl} 
            alt={name} 
            className="w-8 h-8 object-contain" 
            style={{ 
              filter: isHovered ? `drop-shadow(0 0 5px ${color})` : 'none' 
            }}
          />
        </span>
      </div>

      {/* Nome da Tecnologia */}
      <div 
        className={`mt-4 font-mono text-sm transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-2' : 'opacity-60'}`}
        style={{ color: isHovered ? color : 'var(--foreground)' }}
      >
        {name}
      </div>
    </div>
  );
};

const TechStack: React.FC = () => {
  const { t } = useTranslation(); // Ativando a tradução

  const techs = [
    { name: "HTML", color: "#A855F7", iconUrl: "images/html.png" },
    { name: "CSS", color: "#A855F7", iconUrl: "images/css.png" },
    { name: "JavaScript", color: "#A855F7", iconUrl: "images/javascript.png" },
    { name: "TypeScript", color: "#3178C6", iconUrl: "images/typescript.png" },
    { name: "Python", color: "#3776AB", iconUrl: "images/python.png" },
    { name: "PHP", color: "#777BB4", iconUrl: "images/php.png" },
    { name: "Lua", color: "#646CFF", iconUrl: "images/lua.png" },
    { name: "React", color: "#61DAFB", iconUrl: "images/react.png" },
    { name: "Tailwind CSS", color: "#38BDF8", iconUrl: "images/tailwind.png" },
    { name: "Node.js", color: "#339933", iconUrl: "images/node.png" },
    { name: "Vite", color: "#646CFF", iconUrl: "images/vite.png" },
    { name: "MySQL", color: "#A855F7", iconUrl: "images/mysql.png" },
    { name: "Git & GitHub", color: "#F05032", iconUrl: "images/git.png" },
    { name: "GSAP", color: "#88CE02", iconUrl: "images/gsap.png" },
    { name: "Windows", color: "#0078D6", iconUrl: "images/windows.png" },
    { name: "Linux", color: "#FCC624", iconUrl: "images/linux.png" },
  ];

  return (
    <section id="tech-stack" className="w-full py-32 flex flex-col items-center bg-transparent relative overflow-hidden">
      
      <div className="w-full max-w-5xl px-8 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {/* Traduzindo o título principal */}
            {t('tech.title')} <span className="text-blue-400 italic">{t('tech.subtitle')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-3">
          {techs.map((tech, index) => (
            <SkillStack 
              key={tech.name} 
              name={tech.name} 
              color={tech.color} 
              index={index} 
              iconUrl={tech.iconUrl}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default TechStack;