import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { BR, DE, PT } from "country-flag-icons/react/3x2";
import { FaExternalLinkAlt } from "react-icons/fa";
import { asset } from "../utils/asset";
import { play } from "../utils/sound";
import { lastClick, zoomIn, zoomOut, type ZoomSource } from "../utils/macZoom";

// O globo (three.js) é a parte mais pesada do site: só é baixado quando o visitante abre o painel
const Globe = lazy(() => import("../components/Globe"));

type Country = "germany" | "portugal" | "brazil";
type Filter = "all" | "it" | Country;

interface Photo { src: string; caption?: string }
interface Position { role: string; period: string; place?: string; bullets: string[] }
interface Entry {
  id: string;
  company: string;
  country: Country;
  it: boolean;
  positions: Position[];
  photos: Photo[];
  doc?: { label: string; url: string };
}

interface JobData { period: string; role: string; company?: string; description?: string }

const FLAGS: Record<Country, React.ComponentType<{ className?: string; title?: string }>> = { germany: DE, portugal: PT, brazil: BR };
const COUNTRY_IDS: Country[] = ["germany", "portugal", "brazil"];

const img = (path: string) => asset(`images/${path}`);
const PHOTOS = {
  amazon: ["international/amzfoto.jpg"],
  sp: ["experience/sp.webp", "experience/sp2.webp", "experience/sp3.webp"],
  nsc: ["experience/nsc.webp", "experience/nsc1.webp", "experience/nsc2.webp", "experience/nsc3.webp", "experience/nsc4.webp", "experience/nsc5.webp", "experience/nsc6.webp"],
  hanon: ["international/hanon1.jpg", "international/hanon2.jpg", "international/hanon3.jpg", "international/hanon4.webp"],
  talenter: ["international/talenter1.jpg", "international/talenter2.jpg", "international/talenter3.jpg", "international/talenter4.jpg"],
  cacau: ["international/cacaushow.jpg", "international/chocolate.jpg", "international/shopping.jpg"],
  flex: ["experience/flex.webp", "experience/flex2.webp", "experience/flex3.webp"],
};

// "Empresa — Cidade" vira empresa e local separados
const splitCompany = (company = "") => {
  const i = company.lastIndexOf(" — ");
  return i < 0 ? { name: company, place: "" } : { name: company.slice(0, i), place: company.slice(i + 3) };
};

// "2023-24" vira "2023 - 2024"
const fullPeriod = (period: string) => {
  const [a, b] = period.split("-");
  if (!b) return a;
  return `${a} - ${b.length === 2 ? a.slice(0, 2) + b : b}`;
};

const toBullets = (text = "") =>
  text.split(". ").filter(Boolean).map((s) => (s.endsWith(".") ? s : `${s}.`));

const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const WorkExperience: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const [globeOpen, setGlobeOpen] = useState(false);
  const [globeSize, setGlobeSize] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 300 : 460
  );

  useEffect(() => {
    const onResize = () => setGlobeSize(window.innerWidth < 640 ? 300 : 460);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const entries = useMemo<Entry[]>(() => {
    const jobs = (c: Country) => {
      const v = t(`intl.${c}.jobs`, { returnObjects: true });
      return Array.isArray(v) ? (v as JobData[]) : [];
    };
    const de = jobs("germany");
    const pt = jobs("portugal");
    const br = jobs("brazil");

    const fromJob = (job?: JobData): Position => {
      const { place } = splitCompany(job?.company);
      return { role: job?.role ?? "", period: fullPeriod(job?.period ?? ""), place, bullets: toBullets(job?.description) };
    };
    const companyOf = (job?: JobData) => splitCompany(job?.company).name;
    const photos = (paths: string[], captions: string[] = []) =>
      paths.map((p, i) => ({ src: img(p), caption: captions[i] }));
    const itPosition = (key: string, place: string): Position => ({
      role: t(`exp.${key}.role`),
      period: t(`exp.${key}.period`),
      place,
      bullets: list(t(`exp.${key}.tasks`, { returnObjects: true })),
    });

    return [
      { id: "amazon", company: "Amazon", country: "germany", it: false, positions: [fromJob(de[0]), fromJob(de[1])], photos: photos(PHOTOS.amazon) },
      {
        id: "sp", company: "Sistema Pet", country: "brazil", it: true,
        positions: [itPosition("sp", "")],
        photos: photos(PHOTOS.sp, list(t("exp.sp.captions", { returnObjects: true }))),
        doc: { label: t("exp.sp.doc"), url: t("exp.sp.docUrl") },
      },
      {
        id: "nsc", company: "NSC Comunicação", country: "brazil", it: true,
        positions: [itPosition("nsc", "Florianópolis")],
        photos: photos(PHOTOS.nsc, list(t("exp.nsc.captions", { returnObjects: true }))),
      },
      { id: "hanon", company: companyOf(pt[0]), country: "portugal", it: false, positions: [fromJob(pt[0])], photos: photos(PHOTOS.hanon) },
      { id: "talenter", company: companyOf(pt[1]), country: "portugal", it: false, positions: [fromJob(pt[1])], photos: photos(PHOTOS.talenter) },
      { id: "fit", company: companyOf(pt[2]), country: "portugal", it: false, positions: [fromJob(pt[2])], photos: [] },
      { id: "cacau", company: companyOf(br[0]), country: "brazil", it: false, positions: [fromJob(br[0])], photos: photos(PHOTOS.cacau) },
      {
        id: "flex", company: "Flex Contact Center", country: "brazil", it: true,
        positions: [itPosition("flex", "")],
        photos: photos(PHOTOS.flex, list(t("exp.flex.captions", { returnObjects: true }))),
      },
      { id: "teacher", company: companyOf(br[1]), country: "brazil", it: false, positions: [fromJob(br[1])], photos: [] },
    ];
  }, [t]);

  const visible = entries.filter((e) => filter === "all" || (filter === "it" ? e.it : e.country === filter));

  const listRef = useRef<HTMLOListElement>(null);
  const pickCountry = useCallback((id: string) => {
    if (!COUNTRY_IDS.includes(id as Country)) return;
    play("pop");
    setFilter(id as Country);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const globeLabels = useMemo(
    () => Object.fromEntries(COUNTRY_IDS.map((c) => [c, t(`intl.${c}`)])),
    [t]
  );

  // Visualizador de fotos: abre a partir da foto clicada, como uma janela do macOS
  const [viewer, setViewer] = useState<{ entry: Entry; index: number } | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const source = useRef<ZoomSource>(null);
  const closing = useRef(false);

  const openViewer = (entry: Entry, index: number) => {
    source.current = lastClick();
    play("pop");
    setViewer({ entry, index });
  };

  const isOpen = viewer !== null;
  useLayoutEffect(() => {
    if (isOpen) zoomIn(cardRef.current, source.current);
  }, [isOpen]);

  const closeViewer = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    play("close");
    zoomOut(cardRef.current, source.current, backdropRef.current).then(() => {
      closing.current = false;
      setViewer(null);
    });
  }, []);

  const step = useCallback((delta: number) => {
    setViewer((v) => {
      if (!v) return v;
      const n = v.entry.photos.length;
      return { ...v, index: (v.index + delta + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeViewer, step]);

  const chips: { id: Filter; label: string; flag?: Country }[] = [
    { id: "all", label: t("work.filter.all") },
    { id: "it", label: t("work.filter.it") },
    ...COUNTRY_IDS.map((c) => ({ id: c as Filter, label: t(`intl.${c}`), flag: c })),
  ];

  const current = viewer ? viewer.entry.photos[viewer.index] : null;

  return (
    <section id="experience" className="work" style={{ backgroundColor: "var(--background)", position: "relative", zIndex: 1 }}>
      <div className="text-center" data-reveal>
        <h2 data-index="01" className="section-title text-4xl font-bold tracking-tighter" style={{ color: "var(--foreground)" }}>
          {t("work.title")} <span className="section-title__accent">{t("work.subtitle")}</span>
        </h2>
      </div>

      <div className="work__filters" role="group" aria-label={t("work.filterLabel")} data-reveal>
        {chips.map((c) => {
          const Flag = c.flag ? FLAGS[c.flag] : null;
          return (
            <button
              key={c.id}
              type="button"
              className={`work__chip${filter === c.id ? " is-on" : ""}`}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              {Flag && <Flag className="work__flag" />}
              {c.label}
            </button>
          );
        })}
        <button
          type="button"
          className={`work__chip work__chip--globe${globeOpen ? " is-on" : ""}`}
          aria-expanded={globeOpen}
          onClick={() => setGlobeOpen((o) => !o)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          {t(globeOpen ? "work.globeHide" : "work.globe")}
        </button>
      </div>

      {globeOpen && (
        <div className="work__globe">
          <p className="work__globe-hint">{t("work.globeHint")}</p>
          <div style={{ width: globeSize, height: globeSize }}>
            <Suspense fallback={null}>
              <Globe size={globeSize} onMarkerClick={pickCountry} labels={globeLabels} />
            </Suspense>
          </div>
        </div>
      )}

      <ol ref={listRef} className="work__list">
        {visible.map((e) => {
          const Flag = FLAGS[e.country];
          const first = e.positions[0];
          const last = e.positions[e.positions.length - 1];
          const [start] = last.period.split(" - ");
          const end = first.period.split(" - ").pop();
          const range = start === end ? start : `${start} - ${end}`;
          const roles = [...new Set(e.positions.map((p) => p.role))].join(" · ");
          const extra = e.photos.length - 3;
          const isOpen = open === e.id;
          return (
            <li key={e.id} className={`work__item${e.it ? " is-it" : ""}${isOpen ? " is-open" : ""}`}>
              <span className="work__dot" aria-hidden />
              <article className="work__card">
                <div className="work__head">
                  <button
                    type="button"
                    className="work__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`work-${e.id}`}
                    onClick={() => setOpen(isOpen ? null : e.id)}
                  >
                    <span className="work__summary">
                      <span className="work__top">
                        <span className="work__company">{e.company}</span>
                        {e.it && <span className="work__tag">{t("work.filter.it")}</span>}
                      </span>
                      <span className="work__role">{roles}</span>
                      <span className="work__meta">
                        <span className="work__range">{range}</span>
                        <span className="work__country"><Flag className="work__flag" /> {t(`intl.${e.country}`)}</span>
                      </span>
                    </span>
                    <svg className="work__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {e.photos.length > 0 && (
                    <div className="work__thumbs">
                      {e.photos.slice(0, 3).map((p, i) => (
                        <button
                          key={p.src}
                          type="button"
                          className="work__thumb"
                          onClick={() => openViewer(e, i)}
                          aria-label={`${e.company}: ${p.caption || t("work.photo", { n: i + 1 })}`}
                        >
                          <img src={p.src} alt="" loading="lazy" decoding="async" draggable={false} />
                          {i === 2 && extra > 0 && <span className="work__more">+{extra}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isOpen && (
                  <div id={`work-${e.id}`} className="work__details">
                    {e.positions.map((p, i) => (
                      <div key={i} className="work__position">
                        {(e.positions.length > 1 || p.place) && (
                          <p className="work__subrole">
                            {e.positions.length > 1 && <span>{p.role} · {p.period}</span>}
                            {p.place && <span className="work__place"><PinIcon /> {p.place}</span>}
                          </p>
                        )}
                        <ul className="work__bullets">
                          {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                    {e.doc && (
                      <a className="work__doc" href={e.doc.url} target="_blank" rel="noopener noreferrer">
                        {e.doc.label} <FaExternalLinkAlt size={11} />
                      </a>
                    )}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      {viewer && current && createPortal(
        <div ref={backdropRef} className="work-viewer" onClick={closeViewer} role="dialog" aria-modal="true" aria-label={viewer.entry.company}>
          <div ref={cardRef} className="work-viewer__card" onClick={(ev) => ev.stopPropagation()}>
            <button className="work-viewer__close" onClick={closeViewer} aria-label={t("work.close")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <img key={current.src} className="work-viewer__img" src={current.src} alt={current.caption || viewer.entry.company} draggable={false} />
            {viewer.entry.photos.length > 1 && (
              <>
                <button className="work-viewer__nav work-viewer__nav--prev" onClick={() => step(-1)} aria-label={t("work.prev")}>‹</button>
                <button className="work-viewer__nav work-viewer__nav--next" onClick={() => step(1)} aria-label={t("work.next")}>›</button>
              </>
            )}
            <div className="work-viewer__caption">
              <strong>{viewer.entry.company}</strong>
              {current.caption && <span>{current.caption}</span>}
              <span className="work-viewer__count">{viewer.index + 1} / {viewer.entry.photos.length}</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default WorkExperience;
