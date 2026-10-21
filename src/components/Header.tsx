import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBriefcase, FaCode, FaEnvelope, FaGlobeAmericas, FaRocket, FaTrophy } from 'react-icons/fa';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import DockNav from './DockNav';

const NAV_IDS = ['experience', 'international', 'tech-stack', 'projects', 'achievements', 'contact'] as const;
const NAV_KEYS: Record<typeof NAV_IDS[number], string> = {
  'experience': 'nav.experience',
  'international': 'nav.international',
  'tech-stack': 'nav.techStack',
  'projects': 'nav.projects',
  'achievements': 'nav.achievements',
  'contact': 'nav.contact',
};

// Ícone e cor de cada seção no Dock
const NAV_ICONS = {
  'experience': { icon: FaBriefcase, gradient: 'linear-gradient(160deg, #60a5fa 0%, #2563eb 55%, #1e3a8a 100%)' },
  'international': { icon: FaGlobeAmericas, gradient: 'linear-gradient(160deg, #5eead4 0%, #0d9488 55%, #134e4a 100%)' },
  'tech-stack': { icon: FaCode, gradient: 'linear-gradient(160deg, #c4b5fd 0%, #7c3aed 55%, #4c1d95 100%)' },
  'projects': { icon: FaRocket, gradient: 'linear-gradient(160deg, #fdba74 0%, #f97316 50%, #c2410c 100%)' },
  'achievements': { icon: FaTrophy, gradient: 'linear-gradient(160deg, #fde68a 0%, #f59e0b 55%, #b45309 100%)' },
  'contact': { icon: FaEnvelope, gradient: 'linear-gradient(160deg, #f9a8d4 0%, #ec4899 55%, #9d174d 100%)' },
} as const;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = useMemo(
    () => NAV_IDS.map((id) => ({ id, label: t(NAV_KEYS[id]), ...NAV_ICONS[id] })),
    [t]
  );

  const scrollToSection = useCallback((sectionId: string) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = window.innerWidth < 768 ? 64 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: 'var(--background)',
        opacity: 0.98,
      }}
    >
      <div className="w-full px-6 md:px-12">

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

          <DockNav items={navItems} onSelect={scrollToSection} />

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
        <nav className="flex flex-col px-8 pb-4 gap-3">
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
