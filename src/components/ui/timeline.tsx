import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !lineRef.current) return;

    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center", opacity: 0 });

    const scaleTween = gsap.to(lineRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
      },
    });

    const fadeTween = gsap.to(lineRef.current, {
      opacity: 1,
      duration: 0.5,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      scaleTween.scrollTrigger?.kill();
      scaleTween.kill();
      fadeTween.scrollTrigger?.kill();
      fadeTween.kill();
    };
  }, []);

  return (
    <div
      className="w-full font-sans md:px-10"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Título */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10 text-center" style={{ marginBottom: '40px' }}>
        <h2 className="text-4xl font-bold tracking-tighter" style={{ color: 'var(--foreground)' }}>
          {t("exp.title")} <span className="text-blue-400 italic">{t("exp.subtitle")}</span>
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 relative"
          >
            <div className="relative flex flex-col md:flex-row z-40 items-center top-0 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Bolinha */}
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center md:mr-10"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div
                  className="h-4 w-4 rounded-full border p-2"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--text-muted)'
                  }}
                />
              </div>

              {/* Ano */}
              <h3
                className="hidden md:block text-xl md:text-5xl font-bold"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Linha animada com GSAP */}
        <div
          style={{ left: "19px" }}
          className="absolute top-0 bottom-0 overflow-hidden w-0.5"
        >
          <div
            ref={lineRef}
            className="absolute inset-0 w-0.5 bg-linear-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
