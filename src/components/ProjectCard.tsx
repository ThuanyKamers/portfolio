import React from 'react';
import styled from 'styled-components';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  cover?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, cover, link }) => {
  const handleClick = () => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <StyledWrapper>
      <div className="card" onClick={handleClick}>
        <div className="content">
          <div className="back">
            <div className="back-content">
              <div className="back-glow" />
              <div className="back-text-overlay">
                <div className="back-title">{title}</div>
                <div className="back-description">{description}</div>
                <p className="back-tech">{tech.join(' · ')}</p>
              </div>
            </div>
          </div>
          <div className="front">
            <div
              className="front-cover"
              style={(cover || image) ? { backgroundImage: `url(${cover || image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            />
            <div className="front-overlay">
              <div className="front-info">
                <div className="front-title">
                  <p><strong>{title}</strong></p>
                </div>
                <p className="front-tech">{tech.join(' | ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  perspective: 1000px;

  .card {
    overflow: visible;
    width: 100%;
    height: 280px;
    cursor: default;
  }

  .card * {
    cursor: default;
    user-select: none;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 12px;
  }

  .front,
  .back {
    background-color: #0f172a;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: 12px;
    overflow: hidden;
  }

  .back {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: ' ';
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent);
    animation: rotation_481 5000ms infinite linear;
    will-change: transform;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #0f172a;
    border-radius: 12px;
    overflow: hidden;
    z-index: 2;
  }

  .back-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.06) 0%, transparent 50%);
  }

  .back-text-overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 28px;
    color: white;
    z-index: 1;
  }

  .back-title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: #e2e8f0;
  }

  .back-description {
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
    color: #94a3b8;
  }

  .back-tech {
    font-size: 10px;
    color: #3b82f6;
    margin-top: 4px;
    letter-spacing: 0.5px;
  }

  .front {
    transform: rotateY(180deg);
    color: white;
    position: relative;
  }

  .front-cover {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #0f172a;
  }

  .front-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 14px;
    z-index: 2;
  }

  .front-info {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 12px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 8px;
  }

  .front-title {
    font-size: 13px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
  }

  .front-title p { margin: 0; }
  .front-tech { color: #ffffff88; margin-top: 6px; font-size: 10px; }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% { transform: rotateZ(0deg); }
    100% { transform: rotateZ(360deg); }
  }

  @media (max-width: 1024px) { width: 48%; }
  @media (max-width: 640px) {
    width: 100%;
    .back-description { font-size: 12px; }
  }
`;

export default ProjectCard;
