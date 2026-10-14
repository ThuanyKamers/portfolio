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
    <div
      onClick={openLink}
      className={`group relative shrink-0 h-105 rounded-2xl overflow-hidden select-none transition-[width,transform] duration-300 hover:-translate-y-1.5 ${open ? 'w-[min(30rem,85vw)]' : 'w-72 sm:w-80'} ${hasLink ? 'cursor-pointer' : ''}`}
      style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {preview && (
        <img
          src={preview}
          alt={title}
          draggable={false}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110 transition-all duration-500 group-hover:scale-100 group-hover:opacity-35"
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,10,16,0.95) 0%, rgba(8,10,16,0.6) 45%, rgba(8,10,16,0.1) 100%)' }} />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3" style={{ padding: '20px' }}>
        <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span key={item} className="text-[10px] font-semibold uppercase tracking-wider text-white/70 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px' }}>
              {item}
            </span>
          ))}
        </div>
        {open && <p className="text-white/75 text-sm leading-relaxed">{description}</p>}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="self-start cursor-pointer text-sm font-semibold text-white/80 hover:text-white rounded-full transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.06)', padding: '8px 16px', marginTop: '4px' }}
        >
          {open ? `${t('projects.close')} ⌃` : `${t('projects.details')} ⌄`}
        </button>
      </div>
    </div>
  );
});

export default ProjectCard;
