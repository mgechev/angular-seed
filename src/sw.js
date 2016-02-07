// Cache then network strategy
// https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('angular2-seed').then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
