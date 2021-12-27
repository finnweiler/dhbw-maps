import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMapEvents, useMap } from 'react-leaflet'

let last = null

const Routing = (props) => {
  const map = useMap()

  useMapEvents({
    click(e) {
      if (last) {map.removeControl(last)}

      last = L.Routing.control({
        waypoints: [L.latLng(props.user.lat, props.user.lng), L.latLng(e.latlng.lat, e.latlng.lng)],
        routeWhileDragging: true
      }).addTo(map)
    }
  })

  return null
}

export default Routing