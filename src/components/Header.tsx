import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'experience', label: t('nav.experience') },
    { id: 'international', label: t('nav.international') },
    { id: 'tech-stack', label: t('nav.techStack') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'achievements', label: t('nav.achievements') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--card-bg)',
        opacity: 0.98,
      }}
    >
      <div className="w-full px-4 md:px-12">

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

          <nav className="flex items-center" style={{ gap: '2.5rem' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative text-xs font-extrabold uppercase tracking-widest transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:text-(--foreground) whitespace-nowrap"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:w-full group-hover:left-0"
                  style={{ backgroundColor: 'var(--foreground)' }}
                />
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
        <nav className="flex flex-col px-6 pb-4 gap-3">
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
