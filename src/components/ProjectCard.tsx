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
      className={`group relative shrink-0 h-105 rounded-2xl overflow-hidden select-none transition-[width,transform,border-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_64px_-15px_rgba(123,79,255,0.18),0_10px_28px_-8px_rgba(0,0,0,0.45)] ${open ? 'w-[min(510px,85vw)] border-[rgba(123,79,255,0.2)]' : 'w-72 sm:w-80 border-white/8 hover:border-white/10'} ${hasLink ? 'cursor-pointer' : ''}`}
      style={{ backgroundColor: '#0d1117', borderWidth: '1px', borderStyle: 'solid' }}
    >
      {preview && (
        <div className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-35">
          {/* fundo desfocado só preenche a área extra quando o card abre */}
          <img src={preview} alt="" aria-hidden draggable={false} loading="lazy" className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125" />
          {/* imagem com o tamanho do card fechado: nunca muda de escala ao abrir */}
          <img
            src={preview}
            alt={title}
            draggable={false}
            loading="lazy"
            className="absolute left-0 top-0 h-full w-72 sm:w-80 max-w-none object-cover"
            style={open ? { WebkitMaskImage: 'linear-gradient(to right, #000 80%, transparent)', maskImage: 'linear-gradient(to right, #000 80%, transparent)' } : undefined}
          />
        </div>
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,10,16,0.95) 0%, rgba(8,10,16,0.6) 45%, rgba(8,10,16,0.1) 100%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100" style={{ background: 'radial-gradient(120% 70% at 50% 0%, rgba(123,79,255,0.22), transparent 70%)' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100" style={{ background: 'linear-gradient(90deg, transparent, rgba(123,79,255,0.9), transparent)' }} />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3" style={{ padding: '20px' }}>
        <h3 className="bg-linear-to-r from-white to-[rgba(180,160,255,0.9)] bg-clip-text font-bold text-xl leading-tight text-white transition-colors duration-[450ms] group-hover:text-transparent">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span key={item} className="text-[10px] font-semibold uppercase tracking-wider text-white/70 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '4px 10px' }}>
              {item}
            </span>
          ))}
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          style={{ marginTop: open ? 0 : '-12px', transition: 'grid-template-rows 450ms cubic-bezier(0.16,1,0.3,1), margin-top 450ms cubic-bezier(0.16,1,0.3,1)' }}
        >
          <div className="overflow-hidden">
            <p
              className="text-white/75 text-sm leading-relaxed"
              style={{ opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 450ms cubic-bezier(0.16,1,0.3,1) 100ms, transform 450ms cubic-bezier(0.16,1,0.3,1) 100ms' }}
            >
              {description}
            </p>
          </div>
        </div>
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
