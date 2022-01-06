
import { createStore } from 'framework7/lite'

const store = createStore({
  state: {
    route: null,
    routeControl: null,
    address: null,
    panelOpened: false,
    isWikiPanelOpen: false,
    currentWikiEntry: null,
    currentPosition: null,
    programmaticSearch: null,
    reloadMap: false,
  },
  getters: {
    route({ state }) {
      return state.route
    },
    routeControl({ state }) {
      return state.routeControl
    },
    address({ state }) {
      return state.address
    },
    panelOpened({ state }) {
      return state.panelOpened
    },
    isWikiPanelOpen({state}) {
      return state.isWikiPanelOpen
    },
    currentWikiEntry({state}) {
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
    }
  },
  actions: {
    newRoute({ state }, route) {
      state.route = route
    },
    newRouteControl({ state }, control) {
      state.routeControl = control
    },
    newAddress({ state }, address) {
      state.address = address
    },
    newPanelOpened({ state }, panelOpened) {
      state.panelOpened = panelOpened
    },
    openWikiPanel({state}) {
      state.isWikiPanelOpen = true
    },
    closeWikiPanel({state}) {
      state.isWikiPanelOpen = false
    },
    newCurrentWikiEntry({state}, entry) {
      state.currentWikiEntry = entry
    },
    newCurrentPosition({ state }, currentPosition) {
      state.currentPosition = currentPosition
    },
    newProgrammaticSearch({ state }, programmaticSearch) {
      state.programmaticSearch = programmaticSearch
    },
    newReloadMap({ state }, reloadMap) {
      state.reloadMap = reloadMap
    }
  },
})

export default store
