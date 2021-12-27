import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () => {
  let [userPosition, setUserPosition] = useState(null)

  const getUserLocation = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let coords = [position.coords.latitude, position.coords.longitude]
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
          center={userPosition}
          whenCreated={(map) => { setTimeout(() => map.invalidateSize(), 1000) }}
          style={{height: '100vh'}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        :
        null
      }
    </div>
  )
}

export default Map