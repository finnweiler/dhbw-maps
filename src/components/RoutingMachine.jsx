import L from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-routing-machine'

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    waypoints: [
      // Make Points Variable
      L.latLng(52.264149, 10.526420),
      L.latLng(47.661766, 9.480011)
    ],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  })

  return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine
