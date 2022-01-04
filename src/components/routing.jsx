import { useStore } from 'framework7-react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMapEvents, useMap } from 'react-leaflet'

import store from '../js/store'


const Routing = (props) => {
  const map = useMap()
  const previousControl = useStore('routeControl')

  useMapEvents({
    click(e) {

      if (previousControl) { map.removeControl(previousControl) }
    
      let control = L.Routing.control({
        language: 'de',
        formatter:  new L.Routing.Formatter({ language: 'de' }),
        waypoints: [L.latLng(props.user.lat, props.user.lng), L.latLng(e.latlng.lat, e.latlng.lng)],
        createMarker: (i, waypoint, n) => {
          let marker = null
          if (i < n - 1) {
            marker = L.marker(waypoint.latLng, {
              draggable: true,
              icon: L.icon({
                iconUrl: '/icons/red_marker.png',
                iconSize: [29, 50],
                iconAnchor: [15, 49],
              })
            })
          } else {
            marker = L.marker(waypoint.latLng, {
              draggable: true,
              icon: L.icon({
                iconUrl: '/icons/blue_marker.png',
                iconSize: [29, 50],
                iconAnchor: [15, 49],
              })
            })
          }

          return marker
        }
      }).addTo(map)

      store.dispatch('newRouteControl', control)

      control.on('routesfound', (e) => {
        store.dispatch('newRoute', e.routes[0])
      })
    }
  })
    
  return null

}

export default Routing
