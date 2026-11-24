// Writeups do repositório TryHackMe-Studies, do mais antigo ao mais novo.
// A lista fica em writeups.json: a cada publicação do site, o script scripts/fetch-writeups.mjs
// acrescenta sozinho os writeups novos do repositório. Os assuntos (topics) podem ser editados à mão.
import list from './writeups.json';

export const WRITEUPS_REPO = 'https://github.com/ThuanyKamers/TryHackMe-Studies';

export interface Writeup {
  room: string;
  topics: string[];
  file: string;
}

export const WRITEUPS: Writeup[] = list;

// "tryhackme-soc-l1-alert-triage.md" vira "soc-l1-alert-triage"
export const slugOf = (file: string) => file.replace(/^tryhackme-/, '').replace(/\.md$/, '');

// Endereço que abre o writeup como página dentro do site
export const writeupHref = (file: string) => `#writeup/${slugOf(file)}`;
