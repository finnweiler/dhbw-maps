import { useStore } from 'framework7-react'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMapEvents, useMap } from 'react-leaflet'
import store from '../js/store'


const Routing = (props) => {
  const map = useMap()
  const previousControl = useStore('routeControl')

  function loadRoute(latlng) {
    const control = L.Routing.control({
      language: 'de',
      formatter:  new L.Routing.Formatter({ language: 'de' }),
      waypoints: [L.latLng(props.user.lat, props.user.lng), L.latLng(latlng.lat, latlng.lng)],
      fitSelectedRoutes: true,
      addWaypoints: false,
      routeWhileDragging: true,
      createMarker: (i, waypoint, n) => {
        let marker = null
        if (i == 0) {
          marker = L.marker(waypoint.latLng, {
            draggable: false,
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
          marker.on('dragend', (e) => {
            store.dispatch('newAddress', e.target._latlng)
          })
        }
        return marker
      }
    }).addTo(map)


    store.dispatch('newRouteControl', control)

    control.on('routesfound', (e) => {
      console.log(e)
      store.dispatch('newRoute', e.routes[0])
    })
  }


  useMapEvents({
    click(e) {
      store.dispatch('newAddress', e.latlng)
      
      if (e.latlng != null && props.user != null) {
        if (previousControl) { map.removeControl(previousControl) }
        loadRoute(e.latlng)
      }
    }
  })
    
  return null

}

export default Routing