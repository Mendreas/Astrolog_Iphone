const CACHE_NAME = 'astrologs-v1';

const PRECACHE_URLS = [
  '/Astrolog_Iphone/',
  '/Astrolog_Iphone/index.html',
  '/Astrolog_Iphone/manifest.json',
  '/Astrolog_Iphone/favicon.ico',
  '/Astrolog_Iphone/logo192.png',
  '/Astrolog_Iphone/AstroEvents.txt',
  '/Astrolog_Iphone/events-list.txt',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;

  const externalHosts = [
    'api.imgur.com', 'nominatim.openstreetmap.org',
    'www.lightpollutionmap.info', 'clearoutside.com',
    'www.meteoblue.com', 'www.moongiant.com', 'www.solarsystemscope.com',
  ];
  if (externalHosts.some(h => url.hostname.includes(h))) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          if (response.ok && url.origin === self.location.origin) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/Astrolog_Iphone/index.html');
          }
        });
    })
  );
});
