// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// user.js
// Collection function of service authentication
//
import Api from '../../services/api'

let endpoint = new Api('entity')

export default {
  // Retrive current user info
  getUPTD (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  },
  getUPTDUsers (id, params) {
    return endpoint.request('get', id + '/fisherman', {params}).then(res => {
      return res
    })
  },
  showUPTD (id) {
    return endpoint.show(id).then(res => {
      return res.data
    })
  },
  getUPTDDetail (id, params) {
    return endpoint.show(id, params)
  },

  // Create new UPTD
  createUPTD (data) {
    return endpoint.post(data).then(res => {
      return res
    })
  },
  updateUPTD (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  updateUPTDMe (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  deactiveUPTD (id) {
    return endpoint.put('inactive/' + id, {}).then(res => {
      return res.data
    })
  },
  deleteUPTD (id) {
    return endpoint.delete(id).then(res => {
      return res.data
    })
  }
}
