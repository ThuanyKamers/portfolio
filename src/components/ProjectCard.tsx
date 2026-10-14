import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  cover?: string;
  open: boolean;
  onToggle: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ title, description, tech, image, cover, link, open, onToggle }) => {
  const { t } = useTranslation();
  const preview = cover || image;
  const hasLink = !!link && link !== '#';

  const openLink = () => {
    if (hasLink) window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article onClick={openLink} className={`proj-card${open ? ' proj-card--expanded' : ''}${hasLink ? ' cursor-pointer' : ''}`}>
      <div className="proj-card__bg">
        {preview && <img src={preview} alt={title} className="proj-card__bg-img" draggable={false} loading="lazy" decoding="async" />}
      </div>
      <div className="proj-card__glow" />
      <div className="proj-card__dark-hover" />

      <div className="proj-card__body">
        <h3 className="proj-card__title">{title}</h3>
        <div className="proj-card__tools">
          {tech.map((item) => (
            <span key={item} className="proj-card__tool">{item}</span>
          ))}
        </div>
        <div className="proj-card__desc-wrap">
          <div className="proj-card__desc-inner">
            <p className="proj-card__desc">{description}</p>
          </div>
        </div>
        <div className="proj-card__actions">
          <button
            className="proj-card__toggle"
            aria-expanded={open}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <span>{open ? t('projects.close') : t('projects.details')}</span>
            <svg className="proj-card__toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <div className="proj-card__border-accent" />
    </article>
  );
});

export default ProjectCard;
