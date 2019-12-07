import Vue from 'vue'
import App from './app.vue'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('LMarker', LMarker)
Vue.component('l-icon', LIcon)
Vue.component('l-tooltip', LTooltip)


delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: '/public/ambrozia/140/ambr-green.png',
  iconUrl: '/public/ambrozia/140/ambr-green.png',
  shadowUrl: '/public/ambrozia/370/ambr_shadow.png',
})

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

Vue.use(Buefy)

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
