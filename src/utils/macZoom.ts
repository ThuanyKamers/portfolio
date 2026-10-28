// Animação de abrir/fechar estilo macOS: a janela cresce a partir de onde a pessoa clicou
// e encolhe de volta para lá ao fechar.

type Point = { x: number; y: number };

let lastPoint: Point | null = null;
if (typeof window !== 'undefined') {
  window.addEventListener('pointerdown', (e) => { lastPoint = { x: e.clientX, y: e.clientY }; }, true);
}

/** De onde a animação parte: um elemento (ex.: a miniatura clicada) ou o último clique. */
export type ZoomSource = DOMRect | Point | null;

export const lastClick = (): Point | null => lastPoint;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const collapsed = (el: HTMLElement, source: ZoomSource) => {
  const r = el.getBoundingClientRect();
  const isRect = !!source && 'width' in source;
  const cx = isRect ? source.left + source.width / 2 : source?.x ?? r.left + r.width / 2;
  const cy = isRect ? source.top + source.height / 2 : source?.y ?? r.top + r.height / 2;
  // Saindo de uma miniatura, a janela começa do tamanho dela; de um clique, começa quase do zero
  const sx = isRect ? Math.max(source.width / r.width, 0.04) : 0.06;
  const sy = isRect ? Math.max(source.height / r.height, 0.04) : 0.06;
  return `translate(${cx - (r.left + r.width / 2)}px, ${cy - (r.top + r.height / 2)}px) scale(${sx}, ${sy})`;
};

export const zoomIn = (el: HTMLElement | null, source: ZoomSource) => {
  if (!el || reducedMotion()) return;
  el.animate(
    [
      { transform: collapsed(el, source), opacity: 0, transformOrigin: 'center' },
      { opacity: 1, offset: 0.3 },
      { transform: 'none', opacity: 1, transformOrigin: 'center' },
    ],
    { duration: 460, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
  );
};

export const zoomOut = (el: HTMLElement | null, source: ZoomSource, backdrop?: HTMLElement | null): Promise<void> => {
  if (!el || reducedMotion()) return Promise.resolve();
  const timing = { duration: 280, easing: 'cubic-bezier(0.4, 0, 0.7, 0.2)', fill: 'forwards' as const };
  backdrop?.animate([{ opacity: 1 }, { opacity: 0 }], timing);
  const anim = el.animate(
    [
      { transform: 'none', opacity: 1, transformOrigin: 'center' },
      { opacity: 1, offset: 0.7 },
      { transform: collapsed(el, source), opacity: 0, transformOrigin: 'center' },
    ],
    timing
  );
  return anim.finished.then(() => undefined, () => undefined);
};
