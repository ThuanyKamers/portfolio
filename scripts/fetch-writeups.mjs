// Traz os writeups do repositório TryHackMe-Studies antes da build e transforma cada um numa página do site.
// Para cada writeup gera public/writeups/<slug>.json (título, HTML, índice e tempo de leitura)
// e baixa as imagens usadas para public/writeups/img/. Essa pasta não vai para o git.
// No GitHub Actions (CI=true) também procura writeups novos no repositório e os acrescenta em src/data/writeups.json.
// Se algo falhar (sem internet, GitHub fora do ar), a build segue: o writeup abre direto no GitHub.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { Marked } from 'marked';

const REPO = 'ThuanyKamers/TryHackMe-Studies';
const RAW = `https://raw.githubusercontent.com/${REPO}/main/`;
const LIST = new URL('../src/data/writeups.json', import.meta.url);
const OUT = new URL('../public/writeups/', import.meta.url);
const IMG = new URL('img/', OUT);

const slugOf = (file) => file.replace(/^tryhackme-/, '').replace(/\.md$/, '');
const get = async (url, as = 'text') => {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return as === 'buffer' ? Buffer.from(await res.arrayBuffer()) : res.text();
};
const exists = (url) => access(url).then(() => true, () => false);
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const titleOf = (md, fallback) => (md.match(/^#\s+(.+)$/m)?.[1] ?? fallback).replace(/^TryHackMe\s*[-:]\s*/i, '').trim();

let list = JSON.parse(await readFile(LIST, 'utf8'));

// Writeups novos: só no CI, para não deixar o arquivo alterado no seu PC a cada build
if (process.env.CI) {
  try {
    const files = JSON.parse(await get(`https://api.github.com/repos/${REPO}/contents/`))
      .filter((f) => f.type === 'file' && /^tryhackme-.+\.md$/.test(f.name))
      .map((f) => f.name);
    const known = new Set(list.map((w) => w.file));
    const added = [];
    for (const file of files.filter((f) => !known.has(f))) {
      const md = await get(RAW + file);
      added.push({ room: titleOf(md, slugOf(file)), topics: [], file });
    }
    if (added.length) {
      list = [...list, ...added];
      await writeFile(LIST, JSON.stringify(list, null, 2) + '\n');
    }
    console.log(`Writeups: ${added.length} novo(s) no repositório`);
  } catch (err) {
    console.warn(`Writeups: não deu para procurar writeups novos (${err.message})`);
  }
}

await mkdir(IMG, { recursive: true });

let ok = 0;
for (const w of list) {
  const slug = slugOf(w.file);
  try {
    const md = await get(RAW + w.file);
    const toc = [];
    const images = new Set();
    const marked = new Marked({
      gfm: true,
      renderer: {
        // HTML solto dentro do markdown aparece como texto, nunca como código da página
        html: ({ text }) => escape(text),
        heading({ tokens, depth, text }) {
          if (depth === 1) return '';
          const id = text.toLowerCase().replace(/^task:\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const label = text.replace(/^Task:\s*/i, '');
          if (depth === 2) toc.push({ id, label });
          return `<h${depth} id="${id}">${this.parser.parseInline(tokens).replace(/^Task:\s*/i, '')}</h${depth}>\n`;
        },
        image({ href, text }) {
          if (/^https?:/.test(href)) return `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${escape(text || href)}</a>`;
          const name = href.split('/').pop();
          images.add(href);
          return `<figure><img src="img/${escape(name)}" alt="${escape(text)}" loading="lazy" decoding="async"></figure>`;
        },
        link({ href, tokens }) {
          return `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer">${this.parser.parseInline(tokens)}</a>`;
        },
      },
    });

    let html = marked.parse(md);
    // Pergunta e resposta do TryHackMe ganham um visual próprio
    html = html
      .replace(/<p><strong>Question:<\/strong>\s*([\s\S]*?)<\/p>/g, '<div class="wr-q"><span class="wr-q__tag">Q</span><p>$1</p></div>')
      .replace(/<p><strong>Answer:<\/strong>\s*([\s\S]*?)<\/p>/g, '<div class="wr-a"><span class="wr-a__tag">answer</span>$1</div>')
      // Uma figura sozinha num parágrafo não precisa do <p> em volta
      .replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, '$1');

    for (const href of images) {
      const name = href.split('/').pop();
      const target = new URL(name, IMG);
      if (await exists(target)) continue;
      await writeFile(target, await get(RAW + href.replace(/^\.?\//, ''), 'buffer'));
    }

    const words = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').split(/\s+/).length;
    const page = { slug, title: titleOf(md, w.room), minutes: Math.max(1, Math.round(words / 200)), toc, html };
    await writeFile(new URL(`${slug}.json`, OUT), JSON.stringify(page));
    ok++;
  } catch (err) {
    console.warn(`Writeups: ${w.file} não foi gerado (${err.message})`);
  }
}
console.log(`Writeups: ${ok} de ${list.length} prontos`);
