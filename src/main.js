// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// Main.js
// Initialing vue application element.
//
import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import app from './app'
import router from './routers'
import store from './vuxs'
import Vx from 'vx'
import VueHead from 'vue-head'
import 'vx/dist/css/vx.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'element-ui/lib/theme-default/index.css'
import ElDatePicker from 'element-datepicker'
import {Select, Autocomplete, Option, Tooltip, Notification, Message} from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)
sync(store, router)
Vue.use(Vx)
Vue.use(VueHead)
Vue.use(ElDatePicker)
Vue.config.lang = 'en'
Vue.locale('en', enLocale)

const components = [
  Select,
  Option,
  Tooltip,
  Notification,
  Message,
  Autocomplete
]

components.map(component => {
  Vue.component(component.name, component)
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA6PGrtFKA7eV4arPGYGyDPg3dxjkqbkio',
    libraries: 'places' // If you need to use place input
  }
})

// moment.js
import moment from 'moment-timezone'
moment.tz.setDefault()
Object.defineProperty(Vue.prototype, '$moment', {
  get () {
    return this.$root.moment
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    moment
  },
  store,
  render: h => h(app)
})
