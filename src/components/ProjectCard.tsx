import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectCardProps {
  title: string;
  description: string;
  details?: string;
  tech: string[];
  link: string;
  image?: string;
  cover?: string;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ title, description, details, tech, image, cover, link, index }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const preview = cover || image;
  const hasLink = !!link && link !== '#';

  return (
    <div
      className="relative shrink-0 w-72 sm:w-80 h-105 rounded-2xl overflow-hidden select-none"
      style={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {preview && (
        <img
          src={preview}
          alt={title}
          draggable={false}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,10,16,0.95) 0%, rgba(8,10,16,0.6) 45%, rgba(8,10,16,0.1) 100%)' }} />

      <span className="absolute top-4 left-5 font-mono text-xs tracking-widest text-white/40">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3" style={{ padding: '20px' }}>
        <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span key={item} className="text-[10px] font-semibold uppercase tracking-wider text-white/70 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px' }}>
              {item}
            </span>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="self-start cursor-pointer text-sm font-semibold text-white/80 hover:text-white rounded-full transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.06)', padding: '8px 16px', marginTop: '4px' }}
        >
          {t('projects.details')} ⌄
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 flex flex-col gap-3" style={{ backgroundColor: '#0a0d14', padding: '20px' }}>
          <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3">
            <p className="text-white/80 text-sm leading-relaxed">{description}</p>
            {details && <p className="text-white/55 text-sm leading-relaxed">{details}</p>}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer text-sm font-semibold text-white/80 hover:text-white rounded-full transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.06)', padding: '8px 16px' }}
            >
              {t('projects.close')} ⌃
            </button>
            {hasLink && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {t('projects.open')} ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default ProjectCard;
