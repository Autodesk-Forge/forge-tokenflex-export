import '@babel/polyfill'
import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
const config = require(`../../config/${process.env.NODE_ENV === 'production' ? 'production' : 'default'}.json`)

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GoogleAPIKey || config.GoogleAPIKey,
    libraries: 'places'
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
