import { useStore } from 'framework7-react'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMapEvents, useMap } from 'react-leaflet'
import store from '../js/store'


const Routing = (props) => {
  const map = useMap()
  const previousControl = useStore('routeControl')

  const destination = useStore('address')

  function loadRoute() {
    const control = L.Routing.control({
      language: 'de',
      formatter:  new L.Routing.Formatter({ language: 'de' }),
      waypoints: [L.latLng(props.user.lat, props.user.lng), L.latLng(destination.lat, destination.lng)],
      fitSelectedRoutes: true,
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
      store.dispatch('newPanelOpened', true)
    })
  }

  useEffect(() => {
    if (destination != null && props.user != null) {
      if (previousControl) { map.removeControl(previousControl) }
      loadRoute()
    }
  }, [destination, props.user])


  useMapEvents({
    click(e) {
      store.dispatch('newAddress', e.latlng)
    }
  })
    
  return null

}

export default Routing
