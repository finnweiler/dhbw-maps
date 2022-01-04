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
      <PanelButton />
      <RoutePanel />
      <WikiPanel city={'Pfullendorf'} />
      <Map />
    </App>
  )
}

const PanelButton = () => {
  const route = useStore('route')

  return (
    <Button fill raised panelOpen="right" disabled={!route}>Route anzeigen</Button>
  )
}

export default LocationBasedService