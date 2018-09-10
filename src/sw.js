importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded.`);

  workbox.precaching.precacheAndRoute([]);

  // workbox.routing.registerRoute(
  //   /(.*)restaurant\.html/,
  //   workbox.strategies.cacheFirst({
  //     cacheName: 'restaurants-cache',
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         maxEntries: 50,
  //         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
  //       })
  //     ]
  //   })
  // );

  const restaurantHandler = workbox.strategies.networkFirst({
    cacheName: 'restaurants-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
      })
    ]
  });
  
  workbox.routing.registerRoute(/(.*)restaurant\.html/, args => {
    return restaurantHandler.handle(args).then(response => {
      if (!response) { // are offline & missed, thf return precached custom offline page
        return caches.match('pages/offline.html');
      } else if (response.status === 404) { // are online, is 404, return precached custom offline page
        return caches.match('pages/404.html');
      }
      return response;
    });
  });

  // const postHandler = workbox.strategies.cacheFirst({
  //   cacheName: 'posts-cache',
  //   plugins: [
  //     new workbox.expiration.Plugin({
  //       maxEntries: 50,
  //     })
  //   ]
  // });
  
  // workbox.routing.registerRoute(/(.*)pages\/post(.*)\.html/, args => {
  //   return postHandler.handle(args).then(response => {
  //     if (response.status === 404) {
  //       return caches.match('pages/404.html');
  //     }
  //     return response;
  //   })
  //   .catch(function(){
  //     return caches.match('pages/offline.html');
  //   });
  // });

} else {
  console.log(`Workbox failed to load 😬`);
}
