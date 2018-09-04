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