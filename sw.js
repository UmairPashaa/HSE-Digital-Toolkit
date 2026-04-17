const cacheName = 'hse-toolkit-v6';
const assets = [
  './',
  './index.html',
  './aramco-jsa.html',
  './incident-report.html',
  './qsi-checklist.html',
  './capa-tracker.html',
  './office-safety.html',
  './training-matrix.html',
  './audit-report.html',
  './hse-objectives.html',
  './hazard-id.html',
  './hse-meetings.html',
  './waste-tracker.html',
  './env-aspects.html',
  './erp-plan.html',
  './sub-eval.html'
];

// Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching all tools...');
      return cache.addAll(assets);
    })
  );
});

// Activate and clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch assets from cache if offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
