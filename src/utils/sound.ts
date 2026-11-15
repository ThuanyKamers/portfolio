// Efeitos sonoros gerados na hora com a Web Audio API: nenhum arquivo de áudio é baixado.
// O navegador só libera som depois de um clique, então todo som aqui nasce de uma ação do visitante.

const MUTE_KEY = 'sound-muted';
const listeners = new Set<(muted: boolean) => void>();

let ctx: AudioContext | null = null;
let muted = false;
try {
  muted = localStorage.getItem(MUTE_KEY) === '1';
} catch {
  /* sem acesso ao armazenamento: começa com som */
}

export const isMuted = () => muted;

export const setMuted = (value: boolean) => {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0');
  } catch {
    /* sem persistência */
  }
  listeners.forEach((fn) => fn(muted));
};

export const onMuteChange = (fn: (muted: boolean) => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const audio = () => {
  if (muted || typeof window === 'undefined' || !('AudioContext' in window)) return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

interface Tone {
  from: number;        // frequência inicial (Hz)
  to?: number;         // frequência final, para o som "escorregar"
  at?: number;         // atraso até começar (s)
  length: number;      // duração (s)
  volume?: number;
  type?: OscillatorType;
}

const tone = (ac: AudioContext, { from, to = from, at = 0, length, volume = 0.08, type = 'sine' }: Tone) => {
  const start = ac.currentTime + at;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + length);
  // Entrada e saída suaves para não dar estalo
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + length + 0.02);
};

const SOUNDS = {
  // Celular do chat abrindo: duas notas subindo
  open: [{ from: 420, to: 640, length: 0.11 }, { from: 640, to: 960, at: 0.07, length: 0.14, volume: 0.06 }],
  // Celular fechando: as mesmas notas descendo
  close: [{ from: 720, to: 480, length: 0.1 }, { from: 480, to: 320, at: 0.06, length: 0.12, volume: 0.06 }],
  // Mensagem enviada: "whoosh" curto para cima
  send: [{ from: 520, to: 1250, length: 0.16, type: 'triangle' }],
  // Mensagem de outra pessoa chegando: duas notas de sino
  receive: [{ from: 880, length: 0.14 }, { from: 1175, at: 0.1, length: 0.22, volume: 0.07 }],
  // Algo deu errado (limite de mensagens, falha de envio)
  error: [{ from: 240, to: 180, length: 0.18, type: 'triangle' }],
  // Clique leve: troca de idioma, filtro, pino do globo
  tap: [{ from: 900, to: 700, length: 0.05, volume: 0.05 }],
  // Painel grande abrindo (país no globo)
  pop: [{ from: 300, to: 700, length: 0.12, type: 'triangle', volume: 0.06 }],
} satisfies Record<string, Tone[]>;

export type SoundName = keyof typeof SOUNDS;

export const play = (name: SoundName) => {
  const ac = audio();
  if (!ac) return;
  SOUNDS[name].forEach((t) => tone(ac, t));
};
