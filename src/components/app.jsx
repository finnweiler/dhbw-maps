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
import WikipediaButton from './wikipediaButton'
import CurrentPositionButton from './currentPositionButton'
import { Helmet } from 'react-helmet'
import HomescreenAddButton from './homescreenAddButton'

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
      <Helmet>
        <html lang="de" />
        <meta charSet="utf-8" />
        <title>Location Based Service</title>
        <meta name="description" content="Durch eine Karte kann eine Position oder der aktueller Standort mit ihren Geo-Koordinaten ausgewählt werden. Mit Hilfe des Location Based Service können nun die entsprechenden Information zur Örtlichkeit eingesehen werden, sowie eine Route ausgehend vom aktuellen Standort berechnet werden." />
        <meta property="og:image" content="/icons/455x256.png" />
        <meta property="og:image:type" content="image/png"/>
        <meta property="og:image:width" content="256"/>
        <meta property="og:image:height" content="256"/>
      </Helmet>
      <SearchBar />   
      <NotificationButton />
      <RoutingButton />
      <RoutePanel />
      <WikipediaButton  />
      <CurrentPositionButton />
      <WikiPanel />
      <HomescreenAddButton />
      <Map />
    </App>
  )
}

export default LocationBasedService