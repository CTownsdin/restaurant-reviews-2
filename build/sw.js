importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded.`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "css/main-responsive.css",
    "revision": "e8cc458d515c6218fa413b54724dfe97"
  },
  {
    "url": "css/main.css",
    "revision": "ff1fae5449537216b36967c6e526da8a"
  },
  {
    "url": "css/restaurant-responsive.css",
    "revision": "d79d0abdea249ef266ae2f3e7d70b951"
  },
  {
    "url": "css/restaurant.css",
    "revision": "27755fcc2fc89de085bb19c18e395bf1"
  },
  {
    "url": "index.html",
    "revision": "167e793055557324dc4171daacc94be2"
  },
  {
    "url": "restaurant.html",
    "revision": "e1a969ec3f900ed3a34aafa825843bdb"
  },
  {
    "url": "js/bundle-main.js",
    "revision": "726f527ddbb376a7f240cd6736fe8cc0"
  },
  {
    "url": "js/bundle-restaurantInfo.js",
    "revision": "6bb5147100f0cdddbb92b940cf3b548e"
  },
  {
    "url": "js/main.js",
    "revision": "cf3dc546cd41ab0be62ea352c93cf7cb"
  },
  {
    "url": "js/restaurantInfo.js",
    "revision": "e5fd6d9933385cc76d759925311d1c68"
  },
  {
    "url": "js/shared.js",
    "revision": "36d232b35fd4bc8987b5140695c239ad"
  },
  {
    "url": "img/1-1000px.jpg",
    "revision": "ecfd94e55faa3079ce0e37496a185e6f"
  },
  {
    "url": "img/1-1500px.jpg",
    "revision": "ecfd94e55faa3079ce0e37496a185e6f"
  },
  {
    "url": "img/1-500px.jpg",
    "revision": "1845535a5b48fd3d4b861d6165de98e3"
  },
  {
    "url": "img/1.jpg",
    "revision": "cc074688becddd2725114187fba9471c"
  },
  {
    "url": "img/10-1000px.jpg",
    "revision": "e548ab6500832ddd546cc217748b9fe5"
  },
  {
    "url": "img/10-1500px.jpg",
    "revision": "e548ab6500832ddd546cc217748b9fe5"
  },
  {
    "url": "img/10-500px.jpg",
    "revision": "859c271a62b0fb44641b41ed91febdc5"
  },
  {
    "url": "img/10.jpg",
    "revision": "2bd68efbe70c926de6609946e359faa2"
  },
  {
    "url": "img/2-1000px.jpg",
    "revision": "4250b06c5d73a65c99a6c849fd75a5ff"
  },
  {
    "url": "img/2-1500px.jpg",
    "revision": "4250b06c5d73a65c99a6c849fd75a5ff"
  },
  {
    "url": "img/2-500px.jpg",
    "revision": "23295d1122567400f4341fd7cade73c5"
  },
  {
    "url": "img/2.jpg",
    "revision": "759b34e9a95647fbea0933207f8fc401"
  },
  {
    "url": "img/3-1000px.jpg",
    "revision": "29e4cef468fbd9944f60091f77590f18"
  },
  {
    "url": "img/3-1500px.jpg",
    "revision": "29e4cef468fbd9944f60091f77590f18"
  },
  {
    "url": "img/3-500px.jpg",
    "revision": "44fe84942c62afa8c214cab363221bed"
  },
  {
    "url": "img/3.jpg",
    "revision": "81ee36a32bcfeea00db09f9e08d56cd8"
  },
  {
    "url": "img/4-1000px.jpg",
    "revision": "01280069f9eaa08465085768404af203"
  },
  {
    "url": "img/4-1500px.jpg",
    "revision": "01280069f9eaa08465085768404af203"
  },
  {
    "url": "img/4-500px.jpg",
    "revision": "c9528746170b27bc44db354df10763eb"
  },
  {
    "url": "img/4.jpg",
    "revision": "23f21d5c53cbd8b0fb2a37af79d0d37f"
  },
  {
    "url": "img/5-1000px.jpg",
    "revision": "2afca43716ec55c51359336918f1b886"
  },
  {
    "url": "img/5-1500px.jpg",
    "revision": "2afca43716ec55c51359336918f1b886"
  },
  {
    "url": "img/5-500px.jpg",
    "revision": "13e9a8b9339bd7d6bf8fec1967283f73"
  },
  {
    "url": "img/5.jpg",
    "revision": "0a166f0f4e10c36882f97327b3835aec"
  },
  {
    "url": "img/6-1000px.jpg",
    "revision": "da9613144546cf93e6ec0595a38f1a38"
  },
  {
    "url": "img/6-1500px.jpg",
    "revision": "da9613144546cf93e6ec0595a38f1a38"
  },
  {
    "url": "img/6-500px.jpg",
    "revision": "9229d3b5f40067e511cbaf19cc3eed4d"
  },
  {
    "url": "img/6.jpg",
    "revision": "eaf1fec4ee66e121cadc608435fec72f"
  },
  {
    "url": "img/7-1000px.jpg",
    "revision": "25241f2e19923ce316391ff50a60be96"
  },
  {
    "url": "img/7-1500px.jpg",
    "revision": "25241f2e19923ce316391ff50a60be96"
  },
  {
    "url": "img/7-500px.jpg",
    "revision": "665e95a5c3fb35a3149e8b36e82e0a7a"
  },
  {
    "url": "img/7.jpg",
    "revision": "bd0ac197c58cf9853dc49b6d1d7581cd"
  },
  {
    "url": "img/8-1000px.jpg",
    "revision": "dc46092d2cc33be288b5164322b1c243"
  },
  {
    "url": "img/8-1500px.jpg",
    "revision": "dc46092d2cc33be288b5164322b1c243"
  },
  {
    "url": "img/8-500px.jpg",
    "revision": "d31683d04a59c917ba1ed30fa38c608c"
  },
  {
    "url": "img/8.jpg",
    "revision": "6e0e6fb335ba49a4a732591f79000bb4"
  },
  {
    "url": "img/9-1000px.jpg",
    "revision": "f709f3d10f448b32e09e074bf4f085d2"
  },
  {
    "url": "img/9-1500px.jpg",
    "revision": "f709f3d10f448b32e09e074bf4f085d2"
  },
  {
    "url": "img/9-500px.jpg",
    "revision": "0249b9a2188067bd01de670a6102634c"
  },
  {
    "url": "img/9.jpg",
    "revision": "ba4260dee2806745957f4ac41a20fa72"
  }
]);

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
