import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY as string | undefined;

interface Gif {
  id: string;
  title: string;
  preview: string;
  url: string;
}

interface GiphyItem {
  id: string;
  title: string;
  images: { fixed_width: { url: string }; fixed_width_small: { url: string } };
}

const GifPicker: React.FC<{ onPick: (url: string) => void }> = ({ onPick }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState(false);

  // Busca com um pequeno atraso enquanto a pessoa digita; sem busca mostra os populares
  useEffect(() => {
    if (!GIPHY_KEY) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      const q = query.trim();
      const params = new URLSearchParams({ api_key: GIPHY_KEY, limit: '24', rating: 'pg-13' });
      if (q) params.set('q', q);
      fetch(`https://api.giphy.com/v1/gifs/${q ? 'search' : 'trending'}?${params}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((body: { data: GiphyItem[] }) => {
          setError(false);
          setGifs(
            body.data.map((g) => ({
              id: g.id,
              title: g.title,
              preview: g.images.fixed_width_small.url,
              url: g.images.fixed_width.url,
            })),
          );
        })
        .catch((err) => err.name !== 'AbortError' && setError(true));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="chat-gifs">
      <input
        className="chat-gifs__search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('chat.gifSearch')}
        aria-label={t('chat.gifSearch')}
        autoFocus
      />
      {error && <p className="chat-empty">{t('chat.gifError')}</p>}
      <div className="chat-gifs__grid">
        {gifs.map((g) => (
          <button key={g.id} type="button" className="chat-gifs__item" onClick={() => onPick(g.url)} title={g.title}>
            <img src={g.preview} alt={g.title} loading="lazy" />
          </button>
        ))}
      </div>
      <span className="chat-gifs__credit">Powered by GIPHY</span>
    </div>
  );
};

export default GifPicker;
