// Al principio de tu archivo JS
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        setInterval(() => {
          registration.sync.register('keep-alive');
        }, 30000); // Cada 30 segundos
      });
  }
  // sw.js
self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request));
  });
  
  self.addEventListener('sync', event => {
    if (event.tag === 'keep-alive') {
      event.waitUntil(clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage('keep-alive'));
      }));
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      reproductor.nodo.classList.add('reproduciendo');
    } else {
      reproductor.nodo.classList.remove('reproduciendo');
    }
  });