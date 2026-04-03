import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navItems = [
    { id: 'experience', label: t('nav.experience') },
    { id: 'tech-stack', label: t('nav.techStack') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'achievements', label: t('nav.achievements') },
    { id: 'contact', label: t('nav.contact') },
  ];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const smoother = (window as any).__smoother;
      if (smoother) {
        smoother.scrollTo(element, true, 'top top+=80');
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--card-bg)',
        opacity: 0.98
      }}
    >
      <div className="w-full px-12">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '80px',
          gap: '2rem'
        }}>
          
          {/* ESQUERDA: Logo */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '60px' }}>
            <div 
              className="font-bold text-2xl tracking-tighter"
              style={{ color: 'var(--foreground)' }}
            >
              TPK<span className="text-blue-600">.</span>
            </div>
          </div>

          {/* CENTRO: Menu com a Animação Estilo Uiverse */}
          <nav className="hidden md:flex items-center" style={{ gap: '2.5rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative text-xs font-extrabold uppercase tracking-widest transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:text-(--foreground) whitespace-nowrap"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
                
                {/* A LINHA (Pseudo-elemento after) */}
                <span 
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:w-full group-hover:left-0"
                  style={{ backgroundColor: 'var(--foreground)' }}
                ></span>
              </button>
            ))}
          </nav>

          {/* DIREITA: Language */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: '60px' }}>

            <LanguageSwitcher />

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;