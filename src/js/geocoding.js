export function ReverseGeocoding(lon, lat){
  let location = fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat)
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
      let coords_lon = json[0].lon
      let coords_json = {'lat':coords_lat, 'lon':coords_lon}
      return coords_json
    })
  return coords
}

