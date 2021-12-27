import React from 'react'
import { App } from 'framework7-react'
import routes from '../js/routes'
import store from '../js/store'
import Map from './map'

const LocationBasedService = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'LocationBasedService', // App name
    theme: 'auto', // Automatic theme detection
    // App store
    store: store,
    // App routes
    routes: routes,
    // Register service worker (only on production build)
    // eslint-disable-next-line no-undef
    serviceWorker: process.env.NODE_ENV ==='production' ? {
      path: '/service-worker.js',
    } : {},
  }

  return (
    <App { ...f7params } themeDark>
      <Map />
    </App>
  )
}

export default LocationBasedService