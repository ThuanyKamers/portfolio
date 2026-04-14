import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  cover?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, cover, link }) => {
  const openLink = () => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const preview = cover || image;

  return (
    <div className="flex flex-col w-full">
      {/* Preview area */}
      <div
        className="rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          aspectRatio: '16 / 10',
        }}
        onClick={openLink}
      >
        {preview ? (
          <img
            src={preview}
            alt={title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">No preview</div>
        )}
      </div>

      {/* Title row with inline separator */}
      <div className="flex items-center gap-4" style={{ marginTop: '20px' }}>
        <h3 className="text-white font-bold text-lg md:text-xl shrink-0">{title}</h3>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        <button
          onClick={openLink}
          aria-label={`Open ${title}`}
          className="shrink-0 cursor-pointer text-white/50 hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>

      {/* Tech */}
      <p className="text-blue-400 text-sm font-medium mt-3">
        {tech.join(' · ')}
      </p>

      {/* Description */}
      <p className="text-white/60 text-sm mt-3 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ProjectCard;
