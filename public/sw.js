// PASSIVE SERVICE WORKER FOR OFFLINE-FIRST RETRIEVALS
const CACHE_NAME = 'mc-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install Event: cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: intercept requests and serve from cache if offline
self.addEventListener('fetch', (event) => {
  const req = event.request;
  
  // Skip external GitHub API requests to allow real-time fetch always, with fallback
  if (req.url.includes('api.github.com')) {
    event.respondWith(
      fetch(req).catch(() => {
        return caches.match(req);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background (Stale-While-Revalidate pattern)
        fetch(req).then((freshResponse) => {
          if (freshResponse && freshResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, freshResponse));
          }
        }).catch(() => {/* Ignore network glitches in background */});
        
        return cachedResponse;
      }

      return fetch(req).then((response) => {
        // Don't cache non-GET requests or error responses
        if (!response || response.status !== 200 || req.method !== 'GET') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });

        return response;
      }).catch(() => {
        // If entirely offline and request is page layout, return index.html
        if (req.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
