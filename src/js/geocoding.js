export function ReverseGeocoding(lng, lat){
  let location = fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lng + '&lat=' + lat)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      return json.address
    })
  return location
}

export function Geocoding(searchstring){
  let coords = fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + searchstring)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      let coords_lat = json[0].lat
      let coords_lng = json[0].lng
      let coords_json = {'lat':coords_lat, 'lng':coords_lng}
      return coords_json
    })
  return coords
}

