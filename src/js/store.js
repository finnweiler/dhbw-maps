
import { createStore } from 'framework7/lite'

const store = createStore({
  state: {
    route: null,
    routeControl: null,
    address: null,
    panelOpened: false,
    currentPosition: null,
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
    currentPosition({ state }) {
      return state.currentPosition
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
    newCurrentPosition({ state }, currentPosition) {
      state.currentPosition = currentPosition
    }
  },
})

export default store
