var CACHE_NAME = 'restaurant-reviews-2'
/*
  <link rel="stylesheet" src="//normalize-css.googlecode.com/svn/trunk/normalize.css" />
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/main-responsive.css">
  <link rel="stylesheet" href="css/restaurant.css" type="text/css">
  <link rel="stylesheet" href="css/restaurant-responsive.css" type="text/css">
  <script type="application/javascript" charset="utf-8" src="js/bundle-main.js"></script>
  <script type="text/javascript" src="js/bundle-restaurantInfo.js"></script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpPYmhjSFfGFY-nLn0G5CxCHp_IwfAaFU&libraries=places&callback=initMap"></script>
*/

// cache everything during the install event, before taking over
self.addEventListener('install', function(event) {
  console.log('sw ver 4');
  var urlsToCache = [
    '/',
    // 'normalize-css.googlecode.com/svn/trunk/normalize.css', // ?
    'css/main.css',
    'css/main-responsive.css',
    'css/restaurant.css',
    'css/restaurant-responsive.css',
    'js/bundle-main.js',
    'js/bundle-restaurantInfo.js',
    // 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpPYmhjSFfGFY-nLn0G5CxCHp_IwfAaFU&libraries=places&callback=initMap'
  ];

  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
    .catch(err => console.error(`Some error caching: ${err}`))
  )
})

// good code.
self.addEventListener('fetch', function(event) {

  if (event.request.url.indexOf('https://maps.googleapis.com/maps/api/js') == 0 ) {
    event.re
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response // if match, respond with match

        // else, cache it for next time
        const fetchRequest = event.request.clone()
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response; // basic requests are requests from our origin, if not our origin, do not cache
          }
          const responseToCache = response.clone()
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache))
            .catch(err => console.error(`Some error caching: ${err}`))
          return response // finally return response post caching
        })
    })
  )
})

// // if 404, respond with something
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).then(function(response) {
//       if (response.status === 404) {
//         return fetch('./img/1-500px.jpg');
//       }
//       return response;
//     }).catch(function() {
//       return new Response("failed, but not 404 failture");
//     })
//   )
// })

