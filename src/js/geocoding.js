export function reverseGeocoding(lng, lat) {
  let location = fetch(
    'https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lng + '&lat=' + lat + '&accept-language=de'
  ).then(function (response) {
    return response.json()
  })
  return location
}

//allow any search (for example City, Adress etc)
export function geocoding(searchString) {
  let coords = fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + searchString)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      if (json.length == 0) {
        return null
      }
      let coords_lng = json[0].lon
      let coords_lat = json[0].lat
      let coords_json = { lng: coords_lng, lat: coords_lat }
      return coords_json
    })
  return coords
}
