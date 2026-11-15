// Service worker do portfolio: deixa o site abrir sem internet depois da primeira visita.
// - Página (HTML): sempre tenta a rede primeiro, então uma versão nova aparece na hora.
// - Arquivos em /assets/: têm o conteúdo no nome, nunca mudam, então vêm direto do cache.
// - Imagens e o resto: mostra o que está no cache e atualiza por trás.
const CACHE = 'portfolio-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (request, response) => {
  if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response));
};

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  // Só cuida de leituras do próprio site; chat, GIFs e contador passam direto
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          put(request, response.clone());
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match(self.registration.scope)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((hit) => {
      const fresh = fetch(request).then((response) => {
        put(request, response.clone());
        return response;
      });
      if (!hit) return fresh;
      // Arquivos com hash no nome não precisam ser conferidos de novo
      if (!url.pathname.includes('/assets/')) fresh.catch(() => {});
      return hit;
    })
  );
});
