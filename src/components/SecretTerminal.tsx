import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { play } from '../utils/sound';
import { WRITEUPS } from '../data/writeups';

// Easter egg: digitar "sudo" em qualquer lugar do site (fora de um campo de texto) abre este terminal.
// Tem uma flag escondida no estilo CTF para quem explorar os comandos.
const SECRET = 'sudo';
const FLAG = 'THK{cur10s1ty_1s_th3_f1rst_sk1ll}';

const FILES: Record<string, string[]> = {
  'about.txt': [
    'Thuany Paula Kamers',
    'Junior developer and IT support, studying cybersecurity (SOC / Blue Team).',
    'Bachelor in Information Systems. Brazil -> Portugal -> Germany.',
  ],
  'writeups.txt': WRITEUPS.map((w, i) => `${String(i + 1).padStart(2, '0')}  ${w.room}`),
  '.flag': [FLAG, 'Nice find. Tell me you got here: the contact form is one scroll away.'],
};

const HELP = [
  'help        show this list',
  'whoami      who runs this place',
  'ls [-a]     list files',
  'cat <file>  read a file',
  'clear       clean the screen',
  'exit        close the terminal',
];

const run = (raw: string): string[] | 'clear' | 'exit' => {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  switch (cmd) {
    case '': return [];
    case 'help': return HELP;
    case 'whoami': return ['visitor (curious, which is a good sign)'];
    case 'ls': {
      const all = args.some((a) => a.startsWith('-') && a.includes('a'));
      return [Object.keys(FILES).filter((f) => all || !f.startsWith('.')).join('   ')];
    }
    case 'cat': {
      if (!args[0]) return ['cat: which file?'];
      return FILES[args[0]] ?? [`cat: ${args[0]}: No such file`];
    }
    case 'sudo': return ['You are already root here. Try "ls -a".'];
    case 'clear': return 'clear';
    case 'exit': return 'exit';
    default: return [`${cmd}: command not found. Try "help".`];
  }
};

const INTRO = ['Access granted. Welcome to the hidden terminal.', 'Type "help" to see what you can do.'];

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName));

const SecretTerminal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>(INTRO);
  const [value, setValue] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  // Escuta a palavra secreta sendo digitada na página
  useEffect(() => {
    if (open) return;
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
      if (typed === SECRET) {
        // Sem isto, a última letra cairia dentro do terminal que acabou de abrir
        e.preventDefault();
        setLines(INTRO);
        setValue('');
        setOpen(true);
        play('open');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = screen.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    play('close');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(value);
    setValue('');
    if (out === 'exit') return close();
    if (out === 'clear') return setLines([]);
    if (out.some((l) => l === FLAG)) play('receive');
    else play('tap');
    setLines((prev) => [...prev, `$ ${value}`, ...out].slice(-200));
  };

  return createPortal(
    <div className="terminal" onPointerDown={close}>
      <div
        className="terminal__window"
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => input.current?.focus()}
        onKeyDown={(e) => e.key === 'Escape' && close()}
      >
        <div className="terminal__bar">
          <button type="button" className="terminal__dot terminal__dot--close" onClick={close} aria-label="Close" />
          <span className="terminal__dot" />
          <span className="terminal__dot" />
          <span className="terminal__title">visitor@thuany: ~</span>
        </div>
        <div ref={screen} className="terminal__screen no-scrollbar" aria-live="polite">
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith('$ ') ? 'terminal__cmd' : l === FLAG ? 'terminal__flag' : undefined}>{l || ' '}</div>
          ))}
          <form onSubmit={submit} className="terminal__prompt">
            <span aria-hidden>$</span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-label="Command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SecretTerminal;
