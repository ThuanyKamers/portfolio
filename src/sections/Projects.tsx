import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ShowcaseItem, type ShowcaseLink } from '../components/Showcase';
import { asset } from '../utils/asset';
import { play } from '../utils/sound';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  // Área do projeto, usada no filtro (dev, security, community)
  category?: string;
  // Opcionais: links extras e mais fotos para o slideshow
  links?: ShowcaseLink[];
  images?: string[];
  image?: string;
  cover?: string;
}

const FILTERS = ['dev', 'security', 'community'];

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) as Project[];
  const all = Array.isArray(projects) ? projects : [];
  const [filter, setFilter] = useState('all');
  // Só aparecem no filtro as áreas que têm pelo menos um projeto
  const categories = ['all', ...FILTERS.filter((c) => all.some((p) => p.category === c))];
  const visible = filter === 'all' ? all : all.filter((p) => p.category === filter);

  // A lista muda de altura ao filtrar: recalcula as animações de scroll do resto da página
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section
      id="projects"
      className="w-full py-20 md:py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="text-center px-8" style={{ marginBottom: '24px' }} data-reveal>
        <h2 data-index="04" className="section-title text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
          {t('projects.title')} <span className="section-title__accent">{t('projects.subtitle')}</span>
        </h2>
      </div>

      <div className="project-filter" role="group" aria-label={t('projects.filter.label')} data-reveal>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`project-filter__btn${filter === c ? ' is-active' : ''}`}
            aria-pressed={filter === c}
            onClick={() => {
              if (c !== filter) play('tap');
              setFilter(c);
            }}
          >
            {t(`projects.filter.${c}`)}
            <span className="project-filter__count">{c === 'all' ? all.length : all.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <div className="showcase-list">
        {visible.map((p, i) => {
          const images = (p.images ?? [p.cover || p.image]).filter(Boolean).map((src) => asset(src as string));
          const links = [{ label: t('projects.open'), url: p.link }, ...(p.links ?? [])];
          return (
            <ShowcaseItem
              key={p.title}
              title={p.title}
              description={p.description}
              tags={p.tech}
              images={images}
              links={links}
              reverse={i % 2 === 1}
            />
          );
        })}
      </div>

      {/* Indicador de "carregando" para os próximos projetos */}
      <div className="soon-loader" role="status" data-reveal>
        <span className="soon-loader__spinner" aria-hidden />
        <span>{t('projects.soon')}</span>
      </div>
    </section>
  );
};

export default Projects;
