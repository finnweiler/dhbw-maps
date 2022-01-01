import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Routing from './RoutingMachine'

class Map extends React.Component{
  //the default location is the dhbw friedrichshafen
  def_lat = 47.665753037254085
  def_lng = 9.447255091829561

  //first set the default location as currtent location
  state = {
    lat: this.def_lat,
    lng: this.def_lng
  }

  locationChanged(newLocation) {
    return this.state !== newLocation
  }

  getUserLocation(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(position => {
        let current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        if (this.locationChanged(current)) {
          // the new user location is saved and the map recentered
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          this.map.flyTo([this.state.lat, this.state.lng], 14)
        }
      })
    } else {
      // Browser doesn't support Geolocation
      alert('Dein Browser unterstützt Geolocation nicht.')
    }
  }

  componentDidMount() {
    // use mount hook to load current position after component did mount
    this.getUserLocation()
  }

  render() {
    return (
      <MapContainer 
        zoom={14}
        minZoom={4}
        scrollWheelZoom={true}
        center={[this.state.lat, this.state.lng]}
        whenCreated={(lmap) => {
          setTimeout(() => lmap.invalidateSize(), 1000)
          this.map = lmap
        }}
        style={{height: '100vh'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          
        <Routing user={this.state}></Routing>
      </MapContainer>
    )
  }
}

export default Map