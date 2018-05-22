// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// session.js
// User session services using jwt-token.
//
import storage from './storages'

export default {
  // saving data user into local storage.
  setToken (token) {
    storage.save('jwt-token', token)
  },

  setSession(user) {
    storage.save('session', user)
  },

  getSession() {
    return storage.get('session')
  },

  // retrive data user from local storage.
  me () {
    var session = this.getSession()
    return session.user
  },

  // retrive data user from local storage.
  entity () {
    var session = this.getSession()
    return session.entity
  },

  // retrive data token from local storage.
  token () {
    return storage.get('jwt-token')
  },

  // check session state
  isLogin () {
    return (this.token() !== null)
  },

  // clear all session data.
  clear () {
    storage.remove('jwt-token')
    storage.remove('me')
  }
}
