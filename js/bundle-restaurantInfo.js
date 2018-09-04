(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let restaurant
let map
const getImageAltText = require('./shared').getImageAltText;
const fetchRestaurants = require('./shared').fetchRestaurants;
const urlForRestaurant = require('./shared').urlForRestaurant;
const mapMarkerForRestaurant = require('./shared').mapMarkerForRestaurant;
const fetchRestaurantById = require('./shared').fetchRestaurantById;
const getImageSourceSet = require('./shared').getImageSourceSet;

window.initMap = () => {
  window.alert('init')
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) {
      console.error(`When initMap, got error: ${error}`)
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false,
      })
      fillBreadcrumb()
      mapMarkerForRestaurant(self.restaurant, self.map)
    }
  })
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = callback => {

  // TODO: NEXT Troubleshoot rest info page.
  // specifically, what fns are being called, and why is page messed up ?
  alert('called fetchRestFromURL')
  if (self.restaurant) {
    // restaurant already fetched!
    callback(null, self.restaurant)
    return
  }
  const id = getParameterByName('id')
  if (!id) {
    // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null)
  } else {
    fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant
      alert(`rest info, fetchRestById id: ${id}, err:${error}, rest:${restaurant}`);
      if (!restaurant) {
        console.error(error)
        return
      }
      fillRestaurantHTML()
      callback(null, restaurant)
    })
  }
}

function imageUrlForRestaurant(restaurant) {
  return `/img/${restaurant.photograph}`
}

fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name')
  name.innerHTML = restaurant.name

  const address = document.getElementById('restaurant-address')
  address.innerHTML = restaurant.address

  const image = document.getElementById('restaurant-img')
  image.className = 'restaurant-img'
  image.src = imageUrlForRestaurant(restaurant)
  image.srcset = getImageSourceSet(image)
  image.alt = getImageAltText(image)

  const cuisine = document.getElementById('restaurant-cuisine')
  cuisine.innerHTML = restaurant.cuisine_type

  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML()
  }
  fillReviewsHTML()
}

fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours')
  for (let key in operatingHours) {
    const row = document.createElement('tr')

    const day = document.createElement('td')
    day.innerHTML = key
    row.appendChild(day)

    const time = document.createElement('td')
    time.innerHTML = operatingHours[key]
    row.appendChild(time)

    hours.appendChild(row)
  }
}

fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container')
  const title = document.createElement('h2')
  title.innerHTML = 'Reviews'
  container.appendChild(title)

  if (!reviews) {
    const noReviews = document.createElement('p')
    noReviews.innerHTML = 'No reviews yet!'
    container.appendChild(noReviews)
    return
  }
  const ul = document.getElementById('reviews-list')
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review))
  })
  container.appendChild(ul)
}

createReviewHTML = review => {
  const li = document.createElement('li')
  const name = document.createElement('p')
  name.innerHTML = review.name
  li.appendChild(name)

  const date = document.createElement('p')
  date.innerHTML = review.date
  li.appendChild(date)

  const rating = document.createElement('p')
  rating.innerHTML = `Rating: ${review.rating}`
  li.appendChild(rating)

  const comments = document.createElement('p')
  comments.innerHTML = review.comments
  li.appendChild(comments)

  return li
}

fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb')
  const li = document.createElement('li')
  li.innerHTML = restaurant.name
  breadcrumb.appendChild(li)
}

getParameterByName = (name, url) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

},{"./shared":2}],2:[function(require,module,exports){
function getImageAltText(image) {
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

function fetchRestaurants(callback) {
  fetch('http://localhost:1337/restaurants')
    .then(res => res.json())
    .then(restaurants => callback(null, restaurants))
    .catch(err => callback(err, null))
}

function urlForRestaurant(restaurant) {
  return `./restaurant.html?id=${restaurant.id}`
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

/*
* Given an image, return a srcset for it.
* like: srcset="/img/1-500px.jpg 500w, /img/1-1000px.jpg 1000w, /img/1-1500px.jpg 1500w"
*/
function getImageSourceSet(image) {
  const src = image.src.split('.')[0]
  return `${src}-500px.jpg 500w, ${src}-1000px.jpg 1000w, ${src}-1500px.jpg 1500w`
}

module.exports = {
  getImageAltText,
  fetchRestaurants,
  urlForRestaurant,
  mapMarkerForRestaurant,
  fetchRestaurantById,
  getImageSourceSet
}
},{}]},{},[1]);
