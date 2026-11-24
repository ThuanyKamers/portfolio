import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { play } from '../utils/sound';
import { WRITEUPS, WRITEUPS_REPO, writeupHref } from '../data/writeups';
import thm from '../data/tryhackme.json';

const SHOWN = 6;

// Os writeups mais recentes do TryHackMe; cada um abre como página dentro do site
const Writeups: React.FC = () => {
  const { t } = useTranslation();
  const latest = [...WRITEUPS].reverse().slice(0, SHOWN);

  return (
    <section id="writeups" className="w-full flex flex-col items-center" style={{ backgroundColor: 'var(--background)' }}>
      <div className="text-center" style={{ padding: '0 32px', marginBottom: '12px' }} data-reveal>
        <h2 data-index="04" className="section-title text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
          {t('writeups.title')} <span className="section-title__accent">{t('writeups.subtitle')}</span>
        </h2>
      </div>
      <p className="writeups__intro" data-reveal>{t('writeups.intro')}</p>

      {/* Números do perfil do TryHackMe, atualizados a cada publicação do site */}
      <a className="thm" href={`https://tryhackme.com/p/${thm.username}`} target="_blank" rel="noopener noreferrer" data-reveal>
        <span className="thm__path">~/tryhackme/{thm.username}</span>
        <span className="thm__stats">
          <span className="thm__stat"><strong>{thm.rank}</strong>{t('writeups.thm.rank')}</span>
          <span className="thm__stat"><strong>{thm.rooms}</strong>{t('writeups.thm.rooms')}</span>
          <span className="thm__stat"><strong>{thm.badges}</strong>{t('writeups.thm.badges')}</span>
          <span className="thm__stat">{t('writeups.thm.level')}<strong>{thm.level}</strong></span>
        </span>
        <FiArrowUpRight className="thm__arrow" aria-hidden />
      </a>

      <ul className="writeups">
        {latest.map((w, i) => (
          <li key={w.file} data-reveal>
            <a className="writeup" href={writeupHref(w.file)} onClick={() => play('pop')}>
              <span className="writeup__number">{String(WRITEUPS.length - i).padStart(2, '0')}</span>
              <span className="writeup__body">
                <span className="writeup__room">{w.room}</span>
                <span className="writeup__topics">{w.topics.join(' · ')}</span>
              </span>
              <FiArrowRight className="writeup__arrow" aria-hidden />
            </a>
          </li>
        ))}
      </ul>

      <a className="writeups__all" href={WRITEUPS_REPO} target="_blank" rel="noopener noreferrer" data-reveal>
        {t('writeups.all', { count: WRITEUPS.length })} <FiArrowUpRight aria-hidden />
      </a>
    </section>
  );
};

export default Writeups;
