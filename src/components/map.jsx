import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Routing from './routing'
import store from '../js/store'

const Map = () => {
  
  const [position, setPosition] = useState({lat: 47.665753037254085, lng: 9.447255091829561})
  const [map, setMap] = useState(null)

  function getUserLocation(){
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setPosition(current)
        store.dispatch('newCurrentPosition', current)
      })
    } else {
      // Browser doesn't support Geolocation
      alert('Dein Browser unterstützt Geolocation nicht.')
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    if (map != null) {
      map.flyTo([position.lat, position.lng], 14)
    }
  }, [position])


  return (
    <MapContainer 
      zoom={14}
      minZoom={4}
      scrollWheelZoom={true}
      center={[position.lat, position.lng]}
      whenCreated={(lmap) => {
        setTimeout(() => lmap.invalidateSize(), 1000)
        setMap(lmap)
      }}
      style={{height: '100vh'}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        
      <Routing user={position}></Routing>
    </MapContainer>
  )

}

export default Map