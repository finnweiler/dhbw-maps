import { createStore } from 'framework7/lite'

/** Description of store Items:
 *
 * routeInstructions:
 * - new Route ist set by routing.jsx
 * - routingPanel.jsx displays routeInstructions
 *
 * routeControl:
 * - is used to delete old route object
 *
 * destination:
 * - holds current destination {lat, lng}
 * - is set by routing.jsx
 * - is used for routing.jsx, map.jsx
 *
 * isRoutePanelOpen:
 * - shows if routePanel is open or not
 *
 * isWikiPanelOpen:
 * - shows if wikiPanel is open or not
 *
 * currenWikiEntry:
 * - holds current wikipedia entry
 *
 * currentPosition:
 * - holds current position {lat, lng}
 * - is set by map.jsx
 * - is used for wikiPanel.jsx
 *
 * programmaticSearch:
 * - add position or destination to searchbar
 *
 * reloadMap:
 * - if toggled it reloads the map
 *
 * reloadPosition:
 * - if userloacation changes it reloads the position
 * */

const store = createStore({
  state: {
    routeInstructions: null,
    routeControl: null,
    destination: null,
    isRoutePanelOpen: false,
    isWikiPanelOpen: false,
    currentWikiEntry: null,
    currentPosition: null,
    programmaticSearch: null,
    reloadMap: false,
    reloadPosition: false,
  },
  getters: {
    routeInstructions({ state }) {
      return state.routeInstructions
    },
    routeControl({ state }) {
      return state.routeControl
    },
    destination({ state }) {
      return state.destination
    },
    isRoutePanelOpen({ state }) {
      return state.isRoutePanelOpen
    },
    isWikiPanelOpen({ state }) {
      return state.isWikiPanelOpen
    },
    currentWikiEntry({ state }) {
      return state.currentWikiEntry
    },
    currentPosition({ state }) {
      return state.currentPosition
    },
    programmaticSearch({ state }) {
      return state.programmaticSearch
    },
    reloadMap({ state }) {
      return state.reloadMap
    },
    reloadPosition({ state }) {
      return state.reloadPosition
    },
  },
  actions: {
    newRouteInstructions({ state }, routeInstructions) {
      state.routeInstructions = routeInstructions
    },
    newRouteControl({ state }, control) {
      state.routeControl = control
    },
    newDestination({ state }, destination) {
      state.destination = destination
    },
    openRoutePanel({ state }) {
      state.isRoutePanelOpen = true
    },
    closeRoutePanel({ state }) {
      state.isRoutePanelOpen = false
    },
    openWikiPanel({ state }) {
      state.isWikiPanelOpen = true
    },
    closeWikiPanel({ state }) {
      state.isWikiPanelOpen = false
    },
    newCurrentWikiEntry({ state }, entry) {
      state.currentWikiEntry = entry
    },
    newCurrentPosition({ state }, currentPosition) {
      state.currentPosition = currentPosition
    },
    newProgrammaticSearch({ state }, programmaticSearch) {
      state.programmaticSearch = programmaticSearch
    },
    newReloadMap({ state }) {
      state.reloadMap = !state.reloadMap
    },
    newReloadPosition({ state }) {
      state.reloadPosition = !state.reloadPosition
    },
  },
})

export default store
