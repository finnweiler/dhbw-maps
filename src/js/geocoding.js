function ReverseGeocoding(lon, lat){
  fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon' + lon + '&lat' + lat)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      return json
    })
}

function Geocoding(searchstring){
  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + searchstring)
    .then(function(response){
      return response.json()
    })
    .then(function(json){
      return json
    })


}

