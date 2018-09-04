let restaurants, neighborhoods, cuisines
var map
var markers = []

function getDatabaseUrl() {
  const port = 10000
  return `http://localhost:${port}/data/restaurants.json`
}

function fetchRestaurants(callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', getDatabaseUrl())
  xhr.onload = () => {
    if (xhr.status === 200) {
      const json = JSON.parse(xhr.responseText)
      const restaurants = json.restaurants
      callback(null, restaurants)
    } else {
      const error = `Request failed. Returned status of ${xhr.status}`
      callback(error, null)
    }
  }
  xhr.send()
}

// TODO: Get R's from jsonServer thusly...
// fetch('http://localhost:1337/restaurants').then(res => {


function fetchRestaurantById(id, callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      const restaurant = restaurants.find(r => r.id == id)
      if (restaurant) {
        callback(null, restaurant)
      } else {
        callback('Restaurant does not exist', null)
      }
    }
  })
}

function fetchRestaurantByCuisine(cuisine, callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      const results = restaurants.filter(r => r.cuisine_type == cuisine)
      callback(null, results)
    }
  })
}

function fetchRestaurantByNeighborhood(neighborhood, callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      const results = restaurants.filter(r => r.neighborhood == neighborhood)
      callback(null, results)
    }
  })
}

function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      let results = restaurants
      if (cuisine != 'all') {
        results = results.filter(r => r.cuisine_type == cuisine)
      }
      if (neighborhood != 'all') {
        results = results.filter(r => r.neighborhood == neighborhood)
      }
      callback(null, results)
    }
  })
}

function fetchNeighborhoods(callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
      const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
      callback(null, uniqueNeighborhoods)
    }
  })
}

function fetchCuisines(callback) {
  fetchRestaurants((error, restaurants) => {
    if (error) {
      callback(error, null)
    } else {
      const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
      const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
      callback(null, uniqueCuisines)
    }
  })
}

function urlForRestaurant(restaurant) {
  return `./restaurant.html?id=${restaurant.id}`
}

function imageUrlForRestaurant(restaurant) {
  return `/img/${restaurant.photograph}`
}

function mapMarkerForRestaurant(restaurant, map) {
  const marker = new google.maps.Marker({
    position: restaurant.latlng,
    title: restaurant.name,
    url: urlForRestaurant(restaurant),
    map: map,
    animation: google.maps.Animation.DROP,
  })
  return marker
}

getImageAltText = image => {
  const altTexts = {
    '1.jpg': 'bustling dining room with chandeliers',
    '2.jpg': 'mozzarella cheese pizza with bubbly crust',
    '3.jpg': 'dining room styled with wooden and lots of stainless steel',
    '4.jpg': 'artistic photo of brick building shot from the corner exterior sidewalk',
    '5.jpg': 'cook smiles while overlooking a busy cozy scene',
    '6.jpg': 'a rustic dining room in a converted warehouse, with a large US flag decoration',
    '7.jpg': 'black and white photo of concrete textured frontage of Superiority Burger joint',
    '8.jpg': 'building with awning and sign above says the DUTCH',
    '9.jpg': 'people casually eating and drinking water, beer, and wine, some browse on cellphones',
    '10.jpg': 'modern white and chrome styled eating bar and seating area'
  }  
  return altTexts[image.src.split('/').pop()]
}

getImageSourceSet = image => {
  const src = image.src.split('.')[0]
  return `${src}-500px.jpg 500w, ${src}-1000px.jpg 1000w, ${src}-1500px.jpg 1500w`
}

/* register service worker */
registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../sw.js')
        .then(
          function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
          },
          function(err) {
            console.log('ServiceWorker registration failed: ', err)
          }
        )
    })
  }
}

registerServiceWorker()

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', event => {
  fetchNeighborhoods()
  fetchCuisines()
})

/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  fetchRestaurants((error, neighborhoods) => {
    if (error) {
      console.error(error)
    } else {
      self.neighborhoods = neighborhoods
      fillNeighborhoodsHTML()
    }
  })
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.getElementById('neighborhoods-select')
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option')
    option.innerHTML = neighborhood
    option.value = neighborhood
    select.append(option)
  })
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  fetchRestaurants((error, cuisines) => {
    if (error) {
      console.error(error)
    } else {
      self.cuisines = cuisines
      fillCuisinesHTML()
    }
  })
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.getElementById('cuisines-select')

  cuisines.forEach(cuisine => {
    const option = document.createElement('option')
    option.innerHTML = cuisine
    option.value = cuisine
    select.append(option)
  })
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501,
  }
  self.map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: loc,
    scrollwheel: false,
  })
  updateRestaurants()
}

/**
 * Update page and map for current restaurants.
 */
updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select')
  const nSelect = document.getElementById('neighborhoods-select')

  const cIndex = cSelect.selectedIndex
  const nIndex = nSelect.selectedIndex

  const cuisine = cSelect[cIndex].value
  const neighborhood = nSelect[nIndex].value

  fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) {
      // Got an error!
      console.error(error)
    } else {
      resetRestaurants(restaurants)
      fillRestaurantsHTML()
    }
  })
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = restaurants => {
  // Remove all restaurants
  self.restaurants = []
  const ul = document.getElementById('restaurants-list')
  ul.innerHTML = ''

  // Remove all map markers
  if (self.markers) {
    self.markers.forEach(marker => marker.remove())
  }
  self.markers = []
  self.restaurants = restaurants
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {
  const ul = document.getElementById('restaurants-list')
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant))
  })
  addMarkersToMap()
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = restaurant => {
  const li = document.createElement('li')

  const restaurantContainerDiv = document.createElement('div')
  restaurantContainerDiv.classList.add('restaurant-container')

  const topDiv = document.createElement('div')
  const image = document.createElement('img')
  image.className = 'restaurant-img'
  image.src = imageUrlForRestaurant(restaurant)
  image.srcset = getImageSourceSet(image)
  image.alt = getImageAltText(image)

  topDiv.append(image)

  const name = document.createElement('h1')
  name.innerHTML = restaurant.name

  restaurantContainerDiv.append(topDiv)

  const bottomDiv = document.createElement('div')
  const neighborhood = document.createElement('p')
  neighborhood.innerHTML = restaurant.neighborhood

  const address = document.createElement('p')
  address.innerHTML = restaurant.address
  
  const viewDetails = document.createElement('a')
  viewDetails.innerHTML = 'View Details'
  viewDetails.href = urlForRestaurant(restaurant)

  bottomDiv.append(name)
  bottomDiv.append(neighborhood)
  bottomDiv.append(address)
  bottomDiv.append(viewDetails)
  bottomDiv.classList.add('restaurant-info')

  restaurantContainerDiv.append(bottomDiv)

  li.append(restaurantContainerDiv)
  return li
}

/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = mapMarkerForRestaurant(restaurant, self.map)
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    })
    self.markers.push(marker)
  })
}
