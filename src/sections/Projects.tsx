import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import MarqueeRow from '../components/ui/MarqueeRow';
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
      className="py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full">
        <h2
          className="text-3xl font-bold text-center px-8"
          style={{ color: 'var(--foreground)', marginBottom: '40px' }}
        >
          {t('projects.title')}
        </h2>

        {Array.isArray(projects) && (
          <MarqueeRow direction="left" speed={120} gap={24}>
            {projects.map((p, i) => (
              <div key={i} style={{ width: '300px' }}>
                <ProjectCard
                  title={p.title}
                  description={p.description}
                  tech={p.tech}
                  link={p.link}
                  image={p.image ? asset(p.image) : undefined}
                  cover={p.cover ? asset(p.cover) : undefined}
                />
              </div>
            ))}
          </MarqueeRow>
        )}
      </div>
    </section>
  );
};

export default Projects;
