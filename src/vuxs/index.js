// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// index.js
// Initialing vuex library and defining each module
// that will be used.
//
import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Entity from './modules/entity'
import Form from './modules/form'
import Comodity from './modules/comodity'
import ComodityAlias from './modules/comodity_alias'
import User from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    serverFailure: false
  },
  mutations: {
    // mutate server failure state.
    SERVER_STATUS (state, failure) {
      state.serverFailure = failure
    }
  },
  actions: {
    // change status state.serverFailure
    // based on response api server responses (api not responding, 404, 500).
    serverFailure ({commit}, failure) {
      if (typeof failure === 'boolean') {
        commit('SERVER_STATUS', failure)
      }
    }
  },
  modules: {
    Auth,
    Form,
    Comodity,
    ComodityAlias,
    User,
    Entity
  },
  strict: debug
})
