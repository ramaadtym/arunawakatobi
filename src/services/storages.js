// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// storage.js
// Local storage services.
//

export default {
  // save data to local storage.
  save (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
  },

  // retrive data from local storage.
  get (key) {
    var item = window.localStorage.getItem(key)
    if (this.isJson(item)) {
      item = JSON.parse(item)
    }
    return item
  },

  // remove data from local storage.
  remove (key) {
    var item = window.localStorage.getItem(key)
    if (item) {
      window.localStorage.removeItem(key)
      return true
    } else {
      return false
    }
  },

  // clear all local storage.
  clear () {
    return window.localStorage.clear()
  },

  // check if value is json format.
  isJson (item) {
    return /{.*}/.test(item)
  }
}
