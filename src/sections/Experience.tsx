import React from "react";
import { useTranslation } from "react-i18next";
import { Timeline } from "../components/ui/timeline";
import { asset } from "../utils/asset";
import { PolaroidStack } from "../components/ui/polaroid-stack";

const Experience: React.FC = () => {
  const { t } = useTranslation();

  const spTasks = t("exp.sp.tasks", { returnObjects: true }) as string[];
  const spCaptions = t("exp.sp.captions", { returnObjects: true }) as string[];
  const nscTasks = t("exp.nsc.tasks", { returnObjects: true }) as string[];
  const nscCaptions = t("exp.nsc.captions", { returnObjects: true }) as string[];
  const flexTasks = t("exp.flex.tasks", { returnObjects: true }) as string[];
  const flexCaptions = t("exp.flex.captions", { returnObjects: true }) as string[];

  const data = [
    {
      title: "2025",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Sistema Pet
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            {t("exp.sp.role")} <span className="text-sm font-normal opacity-70">— {t("exp.sp.period")}</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            {Array.isArray(spTasks) && spTasks.map((task, i) => (
              <li key={i} className="leading-relaxed">{task}</li>
            ))}
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: asset("images/experience/sp.png"), alt: "Preview 1", caption: Array.isArray(spCaptions) ? spCaptions[0] : "" },
                { src: asset("images/experience/sp2.png"), alt: "Preview 2", caption: Array.isArray(spCaptions) ? spCaptions[1] : "" },
                { src: asset("images/experience/sp3.png"), alt: "Preview 3", caption: Array.isArray(spCaptions) ? spCaptions[2] : "" },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            NSC Comunicação
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            {t("exp.nsc.role")} <span className="text-sm font-normal opacity-70">— {t("exp.nsc.period")}</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            {Array.isArray(nscTasks) && nscTasks.map((task, i) => (
              <li key={i} className="leading-relaxed">{task}</li>
            ))}
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: asset("images/experience/nsc.png"), alt: "Office entrance", caption: Array.isArray(nscCaptions) ? nscCaptions[0] : "" },
                { src: asset("images/experience/nsc1.png"), alt: "My first day", caption: Array.isArray(nscCaptions) ? nscCaptions[1] : "" },
                { src: asset("images/experience/nsc2.png"), alt: "Selfie photo in office", caption: Array.isArray(nscCaptions) ? nscCaptions[2] : "" },
                { src: asset("images/experience/nsc3.png"), alt: "Women's day", caption: Array.isArray(nscCaptions) ? nscCaptions[3] : "" },
                { src: asset("images/experience/nsc4.png"), alt: "Carnaval", caption: Array.isArray(nscCaptions) ? nscCaptions[4] : "" },
                { src: asset("images/experience/nsc5.png"), alt: "Meeting with interns", caption: Array.isArray(nscCaptions) ? nscCaptions[5] : "" },
                { src: asset("images/experience/nsc6.PNG"), alt: "Another meeting with interns", caption: Array.isArray(nscCaptions) ? nscCaptions[6] : "" },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="mb-20 md:mb-40">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            Flex Contact Center
          </h3>
          <p className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            {t("exp.flex.role")} <span className="text-sm font-normal opacity-70">— {t("exp.flex.period")}</span>
          </p>
          <ul className="space-y-3 ml-5 list-disc" style={{ color: 'var(--text-muted)' }}>
            {Array.isArray(flexTasks) && flexTasks.map((task, i) => (
              <li key={i} className="leading-relaxed">{task}</li>
            ))}
          </ul>

          <div className="flex justify-center" style={{ marginTop: '30px' }}>
            <PolaroidStack
              images={[
                { src: asset("images/experience/flex.png"), alt: "Office entrance", caption: Array.isArray(flexCaptions) ? flexCaptions[0] : "" },
                { src: asset("images/experience/flex2.png"), alt: "Last day of training", caption: Array.isArray(flexCaptions) ? flexCaptions[1] : "" },
                { src: asset("images/experience/flex3.png"), alt: "Christmas in office", caption: Array.isArray(flexCaptions) ? flexCaptions[2] : "", rotation: -80 },
              ]}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="experience"
      className="py-32 flex flex-col items-center transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="w-full max-w-4xl px-4 md:px-0">
        <Timeline data={data} />
      </div>
    </section>
  );
};

export default Experience;
