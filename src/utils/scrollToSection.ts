// Rola até uma seção descontando a altura do header.
// Fotos e o globo carregam durante o caminho e mudam a altura da página,
// então o destino é conferido de novo algumas vezes até a seção parar no lugar certo.
let timers: number[] = [];

export const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  timers.forEach(clearTimeout);

  const offset = () => {
    const header = window.innerWidth < 768 ? 64 : 80;
    return el.getBoundingClientRect().top - header;
  };
  const go = () => window.scrollTo({ top: window.scrollY + offset(), behavior: 'smooth' });

  go();
  timers = [700, 1400, 2100, 2800, 3600, 4500].map((ms) =>
    window.setTimeout(() => {
      if (Math.abs(offset()) > 24) go();
    }, ms)
  );
  // Se a pessoa rolar por conta própria, as correções param
  const cancel = () => {
    timers.forEach(clearTimeout);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
  };
  window.addEventListener('wheel', cancel, { passive: true, once: true });
  window.addEventListener('touchstart', cancel, { passive: true, once: true });
};
