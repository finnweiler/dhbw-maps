import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Routing from './RoutingMachine'

class Map extends React.Component{
  //the default location is the dhbw friedrichshafen
  state = {
    current_state: 'default',
    map: null,
    lat: 47.665753037254085,
    lng: 9.447255091829561
  }

  getUserLocation(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //seting the state automatically refreshes the component
        this.setState({
          current_state: 'gps',
          map: null,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        console.log('set new state')
      })
    } else {
      // Browser doesn't support Geolocation
      alert('Dein Browser unterstützt Geolocation nicht.')
    } 
  }

  render() {
    console.log('render')
    //get user location if currently the default location is used
    if (this.state.current_state == 'default'){
      this.getUserLocation()
    }
    //fly to current location if the map component is set and the gps location is set
    else if (this.map != null){
      this.map.flyTo([this.state.lat, this.state.lng], 14)
    }
    //return map container
    return (
      <div>
        {<MapContainer 
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
          
          <Routing user={{lat: this.state.lat, lng: this.state.lng}}></Routing>
        </MapContainer>
        }
      </div>
    )
  }
}

export default Map