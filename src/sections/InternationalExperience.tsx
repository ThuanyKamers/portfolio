import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import Globe from "../components/Globe";
import { asset } from "../utils/asset";

interface JobData {
  period: string;
  role: string;
  company?: string;
  description?: string;
}

interface CountryInfo {
  countryKey: string;
  jobsKey: string;
  images: string[];
}

const COUNTRIES: Record<string, CountryInfo> = {
  brazil: {
    countryKey: "intl.brazil",
    jobsKey: "intl.brazil.jobs",
    images: [
      asset("images/international/shopping.jpg"),
      asset("images/international/chocolate.jpg"),
      asset("images/international/cacaushow.jpg"),
    ],
  },
  portugal: {
    countryKey: "intl.portugal",
    jobsKey: "intl.portugal.jobs",
    images: [
      asset("images/international/talenter1.jpg"),
      asset("images/international/talenter2.jpg"),
      asset("images/international/talenter3.jpg"),
      asset("images/international/talenter4.jpg"),
      asset("images/international/hanon1.jpg"),
      asset("images/international/hanon2.jpg"),
      asset("images/international/hanon3.jpg"),
      asset("images/international/hanon4.JPG"),
    ],
  },
  germany: {
    countryKey: "intl.germany",
    jobsKey: "intl.germany.jobs",
    images: [
      asset("images/international/amzfoto.jpg"),
    ],
  },
};

const InternationalExperience: React.FC = () => {
  const { t } = useTranslation();
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const active = activeCountry ? COUNTRIES[activeCountry] : null;
  const jobs = active ? (t(active.jobsKey, { returnObjects: true }) as JobData[]) : [];

  useEffect(() => {
    if (activeCountry) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSlideIndex(0);
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeCountry]);

  useEffect(() => {
    if (!active) return;
    const images = active.images;
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <section
      id="international"
      className="py-32 flex flex-col items-center"
      style={{ backgroundColor: "var(--background)", position: "relative", zIndex: 1 }}
    >
      <div className="text-center px-8">
        <h2 className="text-4xl font-bold tracking-tighter" style={{ color: "var(--foreground)" }}>
          {t("intl.title")} <span className="text-blue-400 italic">{t("intl.subtitle")}</span>
        </h2>
        <p className="text-sm mt-3 flex items-center justify-center gap-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {t("intl.hint")}
        </p>
      </div>

      <div className="flex justify-center px-4">
        <Globe
          size={typeof window !== 'undefined' && window.innerWidth < 640 ? 320 : 600}
          onMarkerClick={(id) => { setActiveCountry(id); setSlideIndex(0); }}
        />
      </div>

      {/* Modal — same style as Achievements */}
      {active && createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 99999 }}
          onClick={() => setActiveCountry(null)}
        >
          <div
            className="relative flex flex-col md:flex-row rounded-2xl overflow-y-auto md:overflow-hidden w-full"
            style={{ backgroundColor: "#0d1117", maxWidth: "1300px", height: "90vh", maxHeight: "900px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveCountry(null)}
              className="absolute top-3 right-3 md:top-5 md:right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 text-lg cursor-pointer transition-all"
            >
              ✕
            </button>

            {/* Left: Slideshow */}
            <div className="relative overflow-hidden items-center justify-center h-52 shrink-0 md:h-auto md:flex md:flex-1" style={{ backgroundColor: "#0a0a0a" }}>
              {active.images.map((src, i) => (
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

            {/* Right: Details */}
            <div className="flex flex-col md:overflow-y-auto no-scrollbar w-full md:w-110 md:shrink-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
              <div style={{ marginBottom: 20 }}>
                <h3 className="text-xl font-bold text-white leading-tight uppercase tracking-widest">
                  {t(active.countryKey)}
                </h3>
              </div>

              {/* Jobs */}
              <div className="flex flex-col">
                {Array.isArray(jobs) && jobs.map((job, i) => (
                  <div key={i} className="flex gap-4 items-stretch">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 shrink-0 mt-1" />
                      {i < jobs.length - 1 && (
                        <div className="w-px flex-1 bg-blue-500/20" />
                      )}
                    </div>
                    <div style={{ paddingBottom: 32 }}>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest mb-1">{job.period}</p>
                      <p className="text-white font-bold text-sm">{job.role}</p>
                      {job.company && (
                        <p className="text-blue-400/70 text-xs mt-0.5 font-medium">{job.company}</p>
                      )}
                      {job.description && (
                        <ul className="text-white/50 text-xs mt-2 leading-relaxed list-disc ml-4 space-y-1">
                          {job.description.split(". ").filter(Boolean).map((s: string, j: number) => (
                            <li key={j}>{s.endsWith(".") ? s : `${s}.`}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default InternationalExperience;
