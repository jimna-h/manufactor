const CACHE = 'manufactor-v1.10';
const FILES = [
  '/manufactor/',
  '/manufactor/index.html',
  '/manufactor/manifest.json',

  // Token art (default + alt)
  '/manufactor/img/clue-token.jpg',
  '/manufactor/img/clue-token-alt.jpg',
  '/manufactor/img/food-token.jpg',
  '/manufactor/img/food-token-alt.jpg',
  '/manufactor/img/treasure-token.jpg',
  '/manufactor/img/treasure-token-alt.jpg',
  '/manufactor/img/mutagen-token.jpg',
  '/manufactor/img/map-token.jpg',
  '/manufactor/img/map-token-alt.jpg',

  // Modifier art (default + alt, where it exists)
  '/manufactor/img/academy-manufactor.jpg',
  '/manufactor/img/academy-manufactor-alt.jpg',
  '/manufactor/img/adrix-and-nev-twincasters.jpg',
  '/manufactor/img/adrix-and-nev-twincasters-alt.jpg',
  '/manufactor/img/peregrin-took.jpg',
  '/manufactor/img/peregrin-took-alt.jpg',
  '/manufactor/img/nuka-cola-vending-machine.jpg',
  '/manufactor/img/nuka-cola-vending-machine-alt.jpg',
  '/manufactor/img/donatello-the-brains.jpg',
  '/manufactor/img/mondrak-glory-dominus.jpg',
  '/manufactor/img/mondrak-glory-dominus-alt.jpg',
  '/manufactor/img/tippy-toe.jpg',
  '/manufactor/img/tippy-toe-alt.jpg',
  '/manufactor/img/worldwalker-helm.jpg',
  '/manufactor/img/worldwalker-helm-alt.jpg',
  '/manufactor/img/anointed-procession.jpg',
  '/manufactor/img/anointed-procession-alt.jpg',
  '/manufactor/img/case-of-the-pilfered-proof.jpg',
  '/manufactor/img/doubling-season.jpg',
  '/manufactor/img/doubling-season-alt.jpg',
  '/manufactor/img/elspeth.jpg',
  '/manufactor/img/elspeth-alt.jpg',
  '/manufactor/img/exalted-sunborn.jpg',
  '/manufactor/img/exalted-sunborn-alt.jpg',
  '/manufactor/img/jolene-the-plunder-queen.jpg',
  '/manufactor/img/parallel-lives.jpg',
  '/manufactor/img/parallel-lives-alt.jpg',
  '/manufactor/img/primal-vigor.jpg',
  '/manufactor/img/primal-vigor-alt.jpg',
  '/manufactor/img/xorn.jpg',
  '/manufactor/img/xorn-alt.jpg',
  '/manufactor/img/bilbo.jpg',
  '/manufactor/img/bard-king-of-dale.jpg',
  '/manufactor/img/bard-king-of-dale-alt/jpg',

  '/manufactor/img/icon-192.png',
  '/manufactor/img/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Oswald:wght@300;400;700&display=swap'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
    })
  );
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
        return response;
      });
    }).catch(function() {
      return caches.match('/manufactor/index.html');
    })
  );
});
