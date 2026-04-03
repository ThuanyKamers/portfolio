import React from 'react';
import styled from 'styled-components';

// Tamanho dos cards: 300px de largura por 280px de altura

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  isDark: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, image, link, isDark }) => {
  const handleClick = () => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <StyledWrapper $isDark={isDark}>
      <div className="card" onClick={handleClick}>
        <div className="content">
          <div className="back">
            <div className="back-content">
              <div className="back-title">{title}</div>
              <div className="back-description">{description}</div>
            </div>
          </div>
          <div className="front">
            {image ? (
              <>
                <img src={image} alt={title} className="front-image" />
                <div className="front-overlay">
                  <div className="front-info">
                    <div className="front-title">
                      <p><strong>{title}</strong></p>
                    </div>
                    <p className="front-tech">{tech.join(' | ')}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="front-bg-circles">
                  <div className="circle" />
                  <div className="circle circle-right" />
                  <div className="circle circle-bottom" />
                </div>
                <div className="front-overlay">
                  <div className="front-info">
                    <div className="front-title">
                      <p><strong>{title}</strong></p>
                    </div>
                    <p className="front-tech">{tech.join(' | ')}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $isDark: boolean }>`
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
    background-color: ${(props) => props.$isDark ? '#0f172a' : '#CEC3CE'};
    border-radius: 12px;
    color: ${(props) => props.$isDark ? 'white' : '#2d2d2d'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 28px;
    z-index: 2;
  }

  .back-title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.$isDark ? '#e2e8f0' : '#2d2d2d'};
  }

  .back-description {
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
    color: ${(props) => props.$isDark ? '#94a3b8' : '#606060'};
  }

  .front {
    transform: rotateY(180deg);
    color: white;
    position: relative;
  }

  .front-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .front-bg-circles {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #3b82f6;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
    will-change: transform;
  }

  .circle-right {
    background-color: #60a5fa;
    left: 140px;
    top: -60px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }

  .circle-bottom {
    background-color: #1e40af;
    left: 50px;
    top: 0px;
    width: 120px;
    height: 120px;
    animation-delay: -800ms;
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

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(10px); }
    100% { transform: translateY(0px); }
  }

  @media (max-width: 1024px) { width: 48%; }
  @media (max-width: 640px) {
    width: 100%;
    .back-description { font-size: 12px; }
  }
`;

export default ProjectCard;
