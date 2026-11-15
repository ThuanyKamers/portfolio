import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';

// O inglês vai junto com o site; os outros idiomas só são baixados quando alguém escolhe
const LOADERS: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  PT: () => import('./locales/pt'),
  ES: () => import('./locales/es'),
  DE: () => import('./locales/de'),
  FR: () => import('./locales/fr'),
};

i18n
  .use(LanguageDetector)
  .use({
    type: 'backend' as const,
    read(lng: string, _ns: string, done: (err: unknown, data?: Record<string, unknown>) => void) {
      const load = LOADERS[lng];
      if (!load) return done(null, {});
      load().then((m) => done(null, m.default)).catch((err) => done(err));
    },
  })
  .use(initReactI18next)
  .init({
    resources: { EN: { translation: en } },
    partialBundledLanguages: true,
    lng: "EN",
    fallbackLng: "EN",
    interpolation: { escapeValue: false },
    // Enquanto um idioma carrega, o site continua no anterior em vez de sumir
    react: { useSuspense: false },
  });

// Mantém o atributo lang do <html> igual ao idioma escolhido (leitores de tela e tradutores usam ele)
const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.slice(0, 2).toLowerCase();
};
syncHtmlLang(i18n.language);
i18n.on('languageChanged', syncHtmlLang);

export default i18n;
