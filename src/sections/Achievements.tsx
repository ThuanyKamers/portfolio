import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { asset } from "../utils/asset";
import { useIsMobile } from "../hooks/useIsMobile";
import { FaLinkedin } from "react-icons/fa";

const SW_IMAGES = [
  asset("images/achievements/CertificadoSW.webp"),
  asset("images/achievements/swfoto1.webp"),
  asset("images/achievements/sw.webp"),
  asset("images/achievements/sw1.webp"),
  asset("images/achievements/sw2.webp"),
  asset("images/achievements/sw3.webp"),
  asset("images/achievements/sw4.webp"),
  asset("images/achievements/sw5.webp"),
  asset("images/achievements/sw6.webp"),
  asset("images/achievements/sw7.webp"),
  asset("images/achievements/swfoto2.webp"),
  asset("images/achievements/swfoto3.webp"),
  asset("images/achievements/swfoto4.webp"),
  asset("images/achievements/swfoto5.webp"),
  asset("images/achievements/swfoto6.webp"),
  asset("images/achievements/swfoto7.webp"),
  asset("images/achievements/swfoto8.webp"),
  asset("images/achievements/swfoto9.webp"),
];

const SW_DOC_URLS = {
  pitch: "https://drive.google.com/file/d/1BuEUpegRA1SCEJ9fwQdKufRhmCrRLM1j/view?usp=sharing",
  graphs: "https://drive.google.com/file/d/1hebzriee5VOueX5Mhml786cu-aLsCbbo/view?usp=sharing",
  frontend: "https://docs.google.com/document/d/1Z-SjtJI0lCFRD61zH8EE1tA0SMwPSPi8EISzvDNx5qw/edit?usp=sharing",
};

const TOTAL_CARDS = 4;

const CERTIFICATES: Certificate[] = [
  { name: "Recognizing Hallucinations, Inaccuracies, and Bias in AI", issuer: "Codecademy", date: "09/2026", image: asset("images/certs/codecademy-ai.webp"), url: "https://www.codecademy.com/profiles/thuanypk/certificates/1749aeec9b174fabab933fc63449bc34" },
  { name: "Cybersecurity Job Simulation", issuer: "Mastercard · Forage", date: "10/2026", image: asset("images/certs/mastercard.webp") },
  { name: "Introduction to AWS Management Console", issuer: "AWS", date: "11/2025", image: asset("images/certs/aws-console.webp") },
  { name: "PHP: Criando sua Aplicação", issuer: "Alura", date: "07/2025", image: asset("images/certs/alura-php.webp") },
  { name: "Startup Weekend Cyber Security", issuer: "Techstars", date: "05/2025", image: asset("images/certs/startup-weekend.webp") },
  { name: "Modelagem de Dados", issuer: "Fundação Bradesco", date: "03/2025", image: asset("images/certs/bradesco-modelagem.webp") },
  { name: "Design Thinking - Process", issuer: "FIAP", date: "03/2025", image: asset("images/certs/fiap-design-thinking.webp") },
  { name: "Desenvolvimento Orientado a Objetos com Python", issuer: "Fundação Bradesco", date: "03/2025", image: asset("images/certs/bradesco-poo-python.webp") },
  { name: "Introdução à Programação Orientada a Objetos (POO)", issuer: "Fundação Bradesco", date: "02/2025", image: asset("images/certs/bradesco-poo-intro.webp") },
  { name: "AI-900 - Fundamentos de IA no Azure", issuer: "Fundação Bradesco · Microsoft", date: "02/2025", image: asset("images/certs/bradesco-ai900.webp") },
  { name: "Segurança da Informação", issuer: "Uniglobo", date: "01/2025", image: asset("images/certs/uniglobo.webp") },
  { name: "Administrando Banco de Dados", issuer: "Fundação Bradesco", date: "01/2025", image: asset("images/certs/bradesco-db-admin.webp") },
  { name: "Implementando Banco de Dados", issuer: "Fundação Bradesco", date: "12/2024", image: asset("images/certs/bradesco-db-impl.webp") },
  { name: "Dominando Python e Suas Estruturas de Dados", issuer: "DIO", date: "06/2024", image: asset("images/certs/dio-python.webp") },
  { name: "Python Essencial e Desenvolvimento Colaborativo com Git", issuer: "DIO", date: "06/2024", image: asset("images/certs/dio-git.webp") },
  { name: "Jornada Python", issuer: "Hashtag Treinamentos", date: "05/2024", image: asset("images/certs/hashtag-python.webp") },
  { name: "NLW Unite - Fullstack", issuer: "Rocketseat", date: "04/2024", image: asset("images/certs/rocketseat-nlw.webp") },
  { name: "Salesforce", issuer: "Inter Flex", date: "10/2020", image: asset("images/certs/inter-salesforce.webp") },
];

const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/thuanypaulakamers/details/certifications/";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

// Duas faixas em sentidos opostos; passar o mouse pausa a faixa e mostra os detalhes
const CertRow: React.FC<{ items: Certificate[]; reverse?: boolean }> = ({ items, reverse }) => {
  const half = [...items, ...items];
  return (
    <div className="marquee-row w-full overflow-hidden">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-4" style={{ paddingRight: "16px" }} aria-hidden={copy === 1}>
            {half.map((c, i) => (
              <CertCard key={`${copy}-${i}`} cert={c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const CertCard: React.FC<{ cert: Certificate }> = ({ cert }) => {
  const Tag = cert.url ? "a" : "div";
  const linkProps = cert.url ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag
      {...linkProps}
      className="group relative shrink-0 w-72 h-44 rounded-xl overflow-hidden select-none"
      style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0d1117" }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:blur-sm group-hover:brightness-50 group-hover:scale-105">
        {cert.image ? (
          <img src={cert.image} alt={cert.name} loading="lazy" draggable={false} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.18))" }}
          >
            <span className="text-3xl font-bold tracking-tight text-white/70">{cert.issuer}</span>
          </div>
        )}
      </div>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ padding: "16px" }}
      >
        <p className="text-white font-bold text-sm leading-snug">{cert.name}</p>
        <p className="text-xs" style={{ color: "#a5b4fc" }}>{cert.issuer}</p>
        <p className="text-xs text-white/50">{cert.date}</p>
      </div>
    </Tag>
  );
};

interface AchievementDoc {
  label: string;
  url: string;
}

interface AchievementData {
  id: string;
  cardTitle: string;
  cardSubtitle: string;
  backgroundImage: string;
  frontImage: string;
  images: string[];
  details: { label: string; value: string }[];
  description: string;
  docs: AchievementDoc[];
}

const HOVER_FX_CLASSES =
  "after:duration-500 before:duration-500 duration-500 " +
  "hover:after:duration-500 hover:after:translate-x-24 " +
  "hover:before:translate-y-12 hover:before:-translate-x-32 " +
  "hover:duration-500 hover:rotate-12 " +
  "after:absolute after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12 " +
  "before:absolute before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12";

const STATIC_CLASSES =
  "after:absolute after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12 " +
  "before:absolute before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12";

const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const fxClasses = isMobile ? STATIC_CLASSES : HOVER_FX_CLASSES;
  const [activeCard, setActiveCard] = useState<AchievementData | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  // Para adicionar um achievement: copie o objeto e preencha as traduções no i18n.ts
  const achievements: AchievementData[] = useMemo(() => [
    {
      id: "sw",
      cardTitle: "Startup Weekend SJ",
      cardSubtitle: t("achievements.sw.theme"),
      frontImage: SW_IMAGES[0],
      backgroundImage: SW_IMAGES[1],
      images: SW_IMAGES,
      details: [
        { label: t("achievements.sw.placement"), value: t("achievements.sw.badge") },
        { label: "MVP", value: "VerifiCAR" },
        { label: t("achievements.sw.dateLabel"), value: t("achievements.sw.date") },
        { label: t("achievements.sw.locationLabel"), value: t("achievements.sw.location") },
      ],
      description: t("achievements.sw.description"),
      docs: [
        { label: t("achievements.sw.pitch"), url: SW_DOC_URLS.pitch },
        { label: t("achievements.sw.graphs"), url: SW_DOC_URLS.graphs },
        { label: t("achievements.sw.frontend"), url: SW_DOC_URLS.frontend },
      ],
    },
  ], [t]);

  const emptySlots = TOTAL_CARDS - achievements.length;

  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSlideIndex(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeCard]);

  useEffect(() => {
    if (!activeCard) return;
    const images = activeCard.images;
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeCard]);

  const openDoc = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section
      id="achievements"
      className="w-full py-32 flex flex-col items-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="w-full">
        <div className="text-center px-8" style={{ marginBottom: '40px' }} data-reveal>
          <h2 className="text-4xl font-bold tracking-tighter" style={{ color: "var(--foreground)" }}>
            {t("achievements.title")} <span className="text-blue-400 italic">{t("achievements.subtitle")}</span>
          </h2>
        </div>

        <div data-reveal className="flex flex-wrap justify-center gap-4 px-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="cursor-pointer"
                onClick={() => { setActiveCard(achievement); setSlideIndex(0); }}
              >
                <div style={{ padding: '20px' }}>
                  <div
                    className="relative rounded-2xl"
                    style={{
                      backgroundImage: `url(${achievement.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div
                      className={`group overflow-hidden relative after:bg-sky-700 before:bg-sky-400 flex justify-center items-center h-36 w-44 sm:h-44 sm:w-56 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8 ${fxClasses}`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.75)), url(${achievement.frontImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="z-10 flex flex-col items-center gap-2 px-5">
                        <span className="text-white text-xl font-bold tracking-tight text-center leading-tight">
                          {achievement.cardTitle}
                        </span>
                        <p className="text-gray-50 text-xs">{achievement.cardSubtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-${i}`} style={{ padding: '20px' }}>
                <div
                  className={`group overflow-hidden relative after:bg-slate-700 before:bg-slate-500 flex justify-center items-center h-36 w-44 sm:h-44 sm:w-56 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-600 -outline-offset-8 ${fxClasses}`}
                >
                  <div className="z-10 flex flex-col items-center gap-2">
                    <span className="text-slate-600 text-2xl font-bold tracking-tight text-center">
                      {t("achievements.comingSoon")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div style={{ marginTop: '60px' }} data-reveal>
          <h3 className="text-2xl font-bold tracking-tighter text-center" style={{ color: "var(--foreground)", marginBottom: '32px' }}>
            {t("achievements.certs.title")}
          </h3>
          <div className="flex flex-col gap-4 overflow-hidden">
            <CertRow items={CERTIFICATES} />
            <CertRow items={[...CERTIFICATES].reverse()} reverse />
          </div>
          <div className="flex justify-center" style={{ marginTop: '32px' }}>
            <a
              href={LINKEDIN_CERTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "var(--foreground)", padding: "12px 24px" }}
            >
              <FaLinkedin /> {t("achievements.certs.linkedin")} →
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeCard && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 99999 }}
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative flex flex-col md:flex-row rounded-2xl overflow-y-auto md:overflow-hidden w-full"
            style={{ backgroundColor: "#0d1117", maxWidth: "1300px", height: "90vh", maxHeight: "900px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 text-lg cursor-pointer transition-all"
            >
              ✕
            </button>

            <>
              {/* Esquerda: Slideshow */}
                <div className="relative overflow-hidden h-52 shrink-0 md:h-auto md:flex-1" style={{ backgroundColor: "#0a0a0a" }}>
                  {activeCard.images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className="absolute inset-0 w-full h-full transition-opacity duration-700"
                      style={{
                        objectFit: "contain",
                        opacity: i === slideIndex ? 1 : 0,
                      }}
                    />
                  ))}
                </div>

                {/* Direita: Detalhes */}
                <div className="flex flex-col justify-between md:overflow-y-auto no-scrollbar w-full md:w-110 md:shrink-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                      {activeCard.cardTitle}
                    </h3>
                    <p className="text-blue-400 text-sm font-medium">
                      {activeCard.cardSubtitle}
                    </p>
                  </div>

                  {activeCard.details.map((detail, i) => (
                    <div key={i}>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">{detail.label}</p>
                      <p className="text-white font-bold text-sm">{detail.value}</p>
                    </div>
                  ))}

                  <div>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {activeCard.description}
                    </p>
                  </div>

                  {activeCard.docs.length > 0 && (
                    <div className="flex flex-col gap-2 mt-auto">
                      {activeCard.docs.map((doc) => (
                        <button
                          key={doc.url}
                          onClick={() => openDoc(doc.url)}
                          className="w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105 cursor-pointer text-center"
                          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 16px" }}
                        >
                          {doc.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
            </>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Achievements;
