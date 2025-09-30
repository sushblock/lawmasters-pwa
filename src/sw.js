import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst, StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

// Inject manifest from build (Vite plugin will replace self.__WB_MANIFEST)
precacheAndRoute(self.__WB_MANIFEST || []);

// App shell routing (SPA): network-first for HTML
registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'html-pages',
    networkTimeoutSeconds: 3,
  })
);

// Static assets: stale-while-revalidate (fast UI)
registerRoute(
  ({request}) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({ cacheName: 'static-assets' })
);

// Images: cache-first with expiration
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 })]
  })
);

// API calls (adjust domain): network-first with fallback to cache
registerRoute(
  ({url}) => url.origin === self.location.origin && url.pathname.startsWith('/api'),
  new NetworkFirst({ cacheName: 'api' })
);

// Optional: offline fallback for navigations (serve /offline.html)
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try { return await fetch(event.request); }
      catch {
        const cache = await caches.open('html-pages');
        return (await cache.match('/offline.html')) || Response.error();
      }
    })());
  }
});
