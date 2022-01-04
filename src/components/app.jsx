import React from 'react'
import { App, Button } from 'framework7-react'
import routes from '../js/routes'
import store from '../js/store'
import localforage from 'localforage'
//Own components
import Map from './map'
import SearchBar from './searchBar'
import WikiPanel from './wikiPanel'
import NotificationButton from './notificationButton'

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

  return (
    <App { ...f7params } themeDark>
      <SearchBar />
      <Button fill raised panelOpen="left">Left Panel</Button>
      <NotificationButton />
      <WikiPanel city={'Pfullendorf'} />
      <Map />
    </App>
  )
}

export default LocationBasedService