import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Routing from './RoutingMachine'


const Map = () => {
  let [userPosition, setUserPosition] = useState(null)

  const getUserLocation = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = {lat: position.coords.latitude, lng: position.coords.longitude}
        setUserPosition(coords)
      })
    } else {
      // Browser doesn't support Geolocation
      alert('Dein Browser unterstützt Geolocation nicht.')
    }
  }

  useEffect(() => {
    getUserLocation()
  })

  return (
    <div>
      {userPosition !== null ? 
        <MapContainer 
          zoom={14}
          minZoom={4}
          scrollWheelZoom={true}
          center={[userPosition.lat, userPosition.lng]}
          whenCreated={(map) => { setTimeout(() => map.invalidateSize(), 1000) }}
          style={{height: '100vh'}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Routing user={userPosition}></Routing>
        </MapContainer>
        :
        null
      }
    </div>
  )
}

export default Map