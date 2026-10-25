import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye } from 'react-icons/fa';

// Conta do GoatCounter (https://thuanypk.goatcounter.com)
const GOATCOUNTER = 'https://thuanypk.goatcounter.com';

const VisitCounter: React.FC = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    // Registra a visita só no site publicado, não no modo dev
    if (import.meta.env.PROD) {
      const params = new URLSearchParams({
        p: window.location.pathname,
        t: document.title,
        r: document.referrer,
        rnd: Math.random().toString(36).slice(2),
      });
      new Image().src = `${GOATCOUNTER}/count?${params}`;
    }

    // Total de visitas de todas as páginas
    fetch(`${GOATCOUNTER}/counter/TOTAL.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data?.count && setCount(String(data.count).replace(/ /g, ',')))
      .catch(() => {});
  }, []);

  if (!count) return null;

  return (
    <p
      className="text-sm inline-flex items-center gap-2"
      style={{ color: 'var(--text-muted)', marginBottom: '12px' }}
    >
      <FaEye size={13} /> {count} {t('footer.visits')}
    </p>
  );
};

export default VisitCounter;
