
import { createStore } from 'framework7/lite'

const store = createStore({
  state: {
    route: null,
    routeControl: null,
    address: null
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
  },
})

export default store
