import React from 'react'
import { App, Button, useStore } from 'framework7-react'
import routes from '../js/routes'
import store from '../js/store'
import localforage from 'localforage'
//Own components
import Map from './map'
import SearchBar from './searchBar'
import RoutePanel from './routePanel'
import WikiPanel from './wikiPanel'
import NotificationButton from './notificationButton'
import RoutingButton from './startRoutingButton'

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

  localforage.setDriver(localforage.INDEXEDDB)
  localforage.setItem('wikiPanelOpened', false)

  return (
    <App { ...f7params } themeDark>
      <SearchBar />
      <NotificationButton />
      <RoutingButton />
      <RoutePanel />
      <WikiPanel />
      <Map />
    </App>
  )
}

export default LocationBasedService
