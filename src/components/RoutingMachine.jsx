import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMapEvents, useMap } from 'react-leaflet'

let last = null
let instructions = null

const Routing = (props) => {
  const map = useMap()

  useMapEvents({
    click(e) {

      // Warum geht das nur hier oben?
      instructions = last?._selectedRoute?.instructions

      if (last) {map.removeControl(last)}

      last = L.Routing.control({
        language: 'de',
        formatter:  new L.Routing.Formatter({
          language: 'de'
        }),
        waypoints: [L.latLng(props.user.lat, props.user.lng), L.latLng(e.latlng.lat, e.latlng.lng)],
        createMarker: function (i, waypoint, n) {
          let marker = null
          if (i < n - 1) {
            marker = L.marker(waypoint.latLng, {
              draggable: true,
              bounceOnAdd: false,
              bounceOnAddOptions: {
                duration: 1000,
                height: 800,
                function() {
                  (bindPopup(myPopup).openOn(map))
                }
              },
              icon: L.icon({
                iconUrl: '/icons/favicon.png',
                iconSize: [100, 95],
                iconAnchor: [22, 94],
              })
            });
          } else {
            marker = L.marker(waypoint.latLng, {
              draggable: true,
              bounceOnAdd: false,
              bounceOnAddOptions: {
                duration: 1000,
                height: 800,
                function() {
                  (bindPopup(myPopup).openOn(map))
                }
              },
              icon: L.icon({
                iconUrl: '/icons/icons8-destination-96.png',
                iconSize: [38, 95],
                iconAnchor: [22, 94],
              })
            });
          }

          return marker;
        }
      }).addTo(map)


      // Get JSON Object fpr routePanel
      let routeItem = last?._selectedRoute
      if (routeItem != null) {
        let name = routeItem.name
        let summary = routeItem.summary
        let instructions = routeItem.instructions
    
        let routeObject = {
          name: name,
          summary: summary,
          instructions: instructions
        }
        console.log(routeObject)
      }

    }
  })

  return null
}

export default Routing