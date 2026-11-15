import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiShield } from 'react-icons/fi';
import { asset } from '../utils/asset';

const TECHS = [
  { name: "HTML", color: "#A855F7", iconUrl: "images/tech/html.svg" },
  { name: "CSS", color: "#A855F7", iconUrl: "images/tech/css.svg" },
  { name: "JavaScript", color: "#A855F7", iconUrl: "images/tech/javascript.svg" },
  { name: "TypeScript", color: "#3178C6", iconUrl: "images/tech/typescript.svg" },
  { name: "Python", color: "#3776AB", iconUrl: "images/tech/python.svg" },
  { name: "PHP", color: "#777BB4", iconUrl: "images/tech/php.svg" },
  { name: "Dart", color: "#00B4AB", iconUrl: "images/tech/dart.svg" },
  { name: "Lua", color: "#646CFF", iconUrl: "images/tech/lua.svg" },
  { name: "React", color: "#61DAFB", iconUrl: "images/tech/react.svg" },
  { name: "Flutter", color: "#47C5FB", iconUrl: "images/tech/flutter.svg" },
  { name: "Tailwind CSS", color: "#38BDF8", iconUrl: "images/tech/tailwind.svg" },
  { name: "Node.js", color: "#339933", iconUrl: "images/tech/node.svg" },
  { name: "Express", color: "#A3A3A3", iconUrl: "images/tech/express.svg" },
  { name: "Vite", color: "#646CFF", iconUrl: "images/tech/vite.svg" },
  { name: "MySQL", color: "#A855F7", iconUrl: "images/tech/mysql.svg" },
  { name: "PostgreSQL", color: "#4169E1", iconUrl: "images/tech/postgresql.svg" },
  { name: "Git & GitHub", color: "#F05032", iconUrl: "images/tech/git.svg" },
  { name: "Docker", color: "#2496ED", iconUrl: "images/tech/docker.svg" },
  { name: "XAMPP", color: "#FB7A24", iconUrl: "images/tech/xampp.svg" },
  { name: "GSAP", color: "#88CE02", iconUrl: "images/tech/gsap.svg" },
  { name: "Windows", color: "#0078D6", iconUrl: "images/tech/windows.svg" },
  { name: "Linux", color: "#FCC624", iconUrl: "images/tech/linux.svg" },
] as const;

type Tech = typeof TECHS[number];
const byName = (names: string[]) => names.map((n) => TECHS.find((t) => t.name === n)).filter(Boolean) as Tech[];

// Cada grupo vira um painel; a chave é o nome da "pasta" e a tradução fica em tech.groups.*
const GROUPS = [
  { key: 'languages', items: byName(['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Python', 'PHP', 'Dart', 'Lua']) },
  { key: 'frameworks', items: byName(['React', 'Flutter', 'Tailwind CSS', 'Node.js', 'Express', 'Vite', 'GSAP']) },
  { key: 'data', items: byName(['MySQL', 'PostgreSQL', 'Git & GitHub', 'Docker', 'XAMPP']) },
  { key: 'systems', items: byName(['Windows', 'Linux']) },
];

// Assuntos de segurança praticados nos writeups do TryHackMe (sem logo, só texto)
const SECURITY = ['SOC', 'SIEM', 'Splunk', 'Phishing Analysis', 'Alert Triage', 'OSINT'];

const TechStack: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="tech-stack" className="w-full flex flex-col items-center bg-transparent relative" style={{ padding: '96px 0' }}>
      <div className="tech">
        <div className="text-center" style={{ marginBottom: '40px' }} data-reveal>
          <h2 data-index="03" className="section-title text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {t('tech.title')} <span className="section-title__accent">{t('tech.subtitle')}</span>
          </h2>
        </div>

        <div className="tech__grid">
          {GROUPS.map((g) => (
            <div key={g.key} className="tech-panel" data-reveal>
              <div className="tech-panel__bar">
                <span className="tech-panel__path">~/stack/{g.key}</span>
                <span className="tech-panel__name">{t(`tech.groups.${g.key}`)}</span>
              </div>
              <ul className="tech-panel__list">
                {g.items.map((tech) => (
                  <li key={tech.name} className="tech-chip" style={{ '--chip': tech.color } as React.CSSProperties}>
                    <img src={asset(tech.iconUrl)} alt="" width={20} height={20} loading="lazy" />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="tech-panel tech-panel--wide" data-reveal>
            <div className="tech-panel__bar">
              <span className="tech-panel__path">~/stack/security</span>
              <span className="tech-panel__name">{t('tech.groups.security')}</span>
            </div>
            <ul className="tech-panel__list">
              {SECURITY.map((name) => (
                <li key={name} className="tech-chip tech-chip--security">
                  <FiShield aria-hidden />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
