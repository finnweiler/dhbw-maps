import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { useStore } from 'framework7-react'
import Routing from './routing'
import store from '../js/store'
import L from 'leaflet'

const Map = () => {
  
  const [position, setPosition] = useState({lat: 47.665753037254085, lng: 9.447255091829561})
  const [map, setMap] = useState(null)
  const address = useStore('address')
  const reloadPosition = useStore('reloadPosition')

  function refreshUserLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const current = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setPosition(current)
        store.dispatch('newCurrentPosition', current)
        store.dispatch('newReloadMap')
      })
    } else {
      // Browser doesn't support Geolocation
      alert('Dein Browser unterstützt Geolocation nicht.')
    }
  }

  function permissionListener(){
    navigator.permissions.query({name:'geolocation'}).then(function(permissionStatus) {
      permissionStatus.onchange = function() {
        //refreshUserLocation()
      }
    })
  }

  useEffect(() => {
    store.dispatch('newCurrentPosition', position)
    refreshUserLocation()
    permissionListener()
  }, [])

  useEffect(() => {
    refreshUserLocation()
  }, [reloadPosition])

  useEffect(() => {
    if (map != null) {
      map.flyTo([position.lat, position.lng], 14)
    }
  }, [position])

  const pointerIcon = new L.icon({
    iconUrl: '/icons/red_marker.png',
    iconSize: [29, 50],
    iconAnchor: [15, 49],
  })

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
      {
        !address ? 
          <Marker position={position} icon={pointerIcon}></Marker>
          : null
      }
      <Routing user={position}></Routing>
    </MapContainer>
  )

}

export default Map