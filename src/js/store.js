
import { createStore } from 'framework7/lite'

const store = createStore({
  state: {
    route: null,
    routeControl: null,
    address: null,
    panelOpened: false,
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
    }
  },
})

export default store
