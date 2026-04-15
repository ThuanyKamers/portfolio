import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import MarqueeRow from "../components/ui/MarqueeRow";
import { asset } from "../utils/asset";

interface AchievementDoc {
  label: string;
  url: string;
}

interface AchievementData {
  id: string;
  cardTitle: string;
  cardSubtitle: string;
  backgroundImage: string;
  images: string[];
  details: { label: string; value: string }[];
  description: string;
  docs: AchievementDoc[];
}

const Achievements: React.FC = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState<AchievementData | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  /*
   * ========================================
   * CONFIGURE SEUS ACHIEVEMENTS AQUI
   * ========================================
   * Para adicionar um novo achievement:
   * 1. Copie o objeto do card1 e cole como card2, card3, etc.
   * 2. Preencha os campos com suas informações
   * 3. Adicione as traduções no i18n.ts
   * 4. Coloque as imagens na pasta public/images
   * ========================================
   */

  const achievements: AchievementData[] = [
    {
      id: "sw",
      cardTitle: "Startup Weekend SJ",
      cardSubtitle: t("achievements.sw.theme"),
      backgroundImage: asset("images/achievements/CertificadoSW.png"),
      images: [
        asset("images/achievements/CertificadoSW.png"),
        asset("images/achievements/sw.png"),
        asset("images/achievements/sw1.png"),
        asset("images/achievements/sw2.png"),
        asset("images/achievements/sw3.png"),
        asset("images/achievements/sw4.png"),
        asset("images/achievements/sw5.png"),
        asset("images/achievements/sw6.png"),
        asset("images/achievements/sw7.png"),
      ],
      details: [
        { label: t("achievements.sw.placement"), value: t("achievements.sw.badge") },
        { label: "MVP", value: "VerifiCAR" },
        { label: t("achievements.sw.dateLabel"), value: t("achievements.sw.date") },
        { label: t("achievements.sw.locationLabel"), value: t("achievements.sw.location") },
      ],
      description: t("achievements.sw.description"),
      docs: [
        { label: t("achievements.sw.pitch"), url: "https://drive.google.com/file/d/1BuEUpegRA1SCEJ9fwQdKufRhmCrRLM1j/view?usp=sharing" },
        { label: t("achievements.sw.graphs"), url: "https://drive.google.com/file/d/1hebzriee5VOueX5Mhml786cu-aLsCbbo/view?usp=sharing" },
        { label: t("achievements.sw.frontend"), url: "https://docs.google.com/document/d/1Z-SjtJI0lCFRD61zH8EE1tA0SMwPSPi8EISzvDNx5qw/edit?usp=sharing" },
      ],
    },
  ];

  // Preenche até 4 cards (os vazios ficam como "Em Breve")
  const totalCards = 4;
  const emptySlots = totalCards - achievements.length;

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

  const openDoc = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

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

        <div data-reveal>
        <MarqueeRow direction="right" speed={80}>
          {[
            ...achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="cursor-pointer px-3"
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
                      className="group overflow-hidden relative
                        after:duration-500 before:duration-500 duration-500
                        hover:after:duration-500 hover:after:translate-x-24
                        hover:before:translate-y-12 hover:before:-translate-x-32
                        hover:duration-500
                        after:absolute after:bg-sky-700 after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12
                        before:absolute before:bg-sky-400 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12
                        hover:rotate-12 flex justify-center items-center h-36 w-44 sm:h-44 sm:w-56 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-400 -outline-offset-8"
                    >
                      <div className="z-10 flex flex-col items-center gap-2 px-5">
                        <span className="text-slate-400 text-xl font-bold tracking-tight text-center leading-tight">
                          {achievement.cardTitle}
                        </span>
                        <p className="text-gray-50 text-xs">{achievement.cardSubtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )),
            ...Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-${i}`} className="px-3" style={{ padding: '20px' }}>
                <div
                  className="group overflow-hidden relative
                    after:duration-500 before:duration-500 duration-500
                    hover:after:duration-500 hover:after:translate-x-24
                    hover:before:translate-y-12 hover:before:-translate-x-32
                    hover:duration-500
                    after:absolute after:bg-slate-700 after:rounded-full after:blur-xl after:bottom-32 after:right-16 after:w-12 after:h-12
                    before:absolute before:bg-slate-500 before:rounded-full before:blur-xl before:top-20 before:right-16 before:w-12 before:h-12
                    hover:rotate-12 flex justify-center items-center h-36 w-44 sm:h-44 sm:w-56 origin-bottom-right bg-neutral-900 rounded-2xl outline outline-slate-600 -outline-offset-8"
                >
                  <div className="z-10 flex flex-col items-center gap-2">
                    <span className="text-slate-600 text-2xl font-bold tracking-tight text-center">
                      {t("achievements.comingSoon")}
                    </span>
                  </div>
                </div>
              </div>
            )),
          ]}
        </MarqueeRow>
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
                        objectFit: "cover",
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
                          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
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
