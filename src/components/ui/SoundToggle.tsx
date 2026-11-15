import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { isMuted, onMuteChange, play, setMuted } from '../../utils/sound';

// Liga e desliga os efeitos sonoros do site; a escolha fica salva no navegador
export const SoundToggle: React.FC = () => {
  const { t } = useTranslation();
  const [muted, setState] = useState(isMuted);

  useEffect(() => onMuteChange(setState), []);

  const label = muted ? t('sound.on') : t('sound.off');
  return (
    <button
      type="button"
      className="sound-toggle"
      aria-label={label}
      aria-pressed={!muted}
      title={label}
      onClick={() => {
        setMuted(!muted);
        // Ao religar, toca um som para confirmar que voltou
        if (muted) play('tap');
      }}
    >
      {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
    </button>
  );
};
