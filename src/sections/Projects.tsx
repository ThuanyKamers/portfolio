import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import { asset } from '../utils/asset';

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const projects = t('projects.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    tech: string[];
    link: string;
    image?: string;
    cover?: string;
  }>;

  return (
    <section
      id="projects"
      className="py-20 md:py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-6xl px-6 md:px-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
            {t('projects.title')} <span className="text-blue-400 italic">{t('projects.subtitle')}</span>
          </h2>
        </div>

        {/* Grid */}
        {Array.isArray(projects) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14" style={{ marginTop: '40px' }}>
            {projects.map((p, i) => (
              <ProjectCard
                key={i}
                title={p.title}
                description={p.description}
                tech={p.tech}
                link={p.link}
                image={p.image ? asset(p.image) : undefined}
                cover={p.cover ? asset(p.cover) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
