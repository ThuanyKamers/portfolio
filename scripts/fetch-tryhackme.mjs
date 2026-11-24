// Busca os números do perfil público do TryHackMe antes da build e salva em src/data/tryhackme.json.
// Se a busca falhar (sem internet, API fora do ar), mantém o arquivo que já está no repositório.
// Só roda no GitHub Actions (CI=true), para não deixar o arquivo alterado no seu PC a cada build.
import { readFile, writeFile } from 'node:fs/promises';

if (!process.env.CI) {
  console.log('TryHackMe: build local, usando os dados salvos');
  process.exit(0);
}

const FILE = new URL('../src/data/tryhackme.json', import.meta.url);
const current = JSON.parse(await readFile(FILE, 'utf8'));
const url = `https://tryhackme.com/api/v2/public-profile?username=${current.username}`;

try {
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { data } = await res.json();
  const next = {
    username: current.username,
    rank: String(data.rank),
    level: Number(data.level),
    rooms: Number(data.completedRoomsNumber),
    badges: Number(data.badgesNumber),
    points: Number(data.totalPoints),
    league: String(data.leagueTier),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  if (Object.values(next).some((v) => v === 'undefined' || Number.isNaN(v))) throw new Error('resposta inesperada');
  await writeFile(FILE, JSON.stringify(next, null, 2) + '\n');
  console.log(`TryHackMe: ${next.rank}, ${next.rooms} rooms, ${next.badges} badges`);
} catch (err) {
  console.warn(`TryHackMe: usando os dados salvos (${err.message})`);
}
