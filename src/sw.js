var staticCacheName = 'angular2-seed-v1';
self.addEventListener('activate', function(event) {
  console.log("Activated service worker");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('angular2-seed-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method != 'GET') {
     event.respondWith(fetch(event.request));
     return;
  }
  event.respondWith(
    caches.open(staticCacheName).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});