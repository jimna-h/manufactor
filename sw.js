const CACHE = 'manufactor-v1.6';
const FILES = [
  '/manufactor/',
  '/manufactor/index.html',
  '/manufactor/manifest.json',
  '/manufactor/img/clue-token.jpg',
  '/manufactor/img/food-token.jpg',
  '/manufactor/img/treasure-token.jpg',
  '/manufactor/img/mutagen-token.jpg',
  '/manufactor/img/academy-manufactor.jpg',
  '/manufactor/img/adrix-and-nev-twincasters.jpg',
  '/manufactor/img/peregrin-took.jpg',
  '/manufactor/img/nuka-cola-vending-machine.jpg',
  '/manufactor/img/donatello-the-brains.jpg',
  '/manufactor/img/mondrak-glory-dominus.jpg',
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
