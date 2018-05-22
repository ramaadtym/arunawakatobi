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
  getEntity (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  },
  // Create new Entity
  createEntity (data) {
    return endpoint.post(data).then(res => {
      return res
    })
  },
  getEntityDetail (id) {
    return endpoint.show(id).then(res => {
      return res.data
    })
  },
  updateEntity (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  updateEntityMe (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  deactiveEntity (id) {
    return endpoint.put('inactive/' + id, {}).then(res => {
      return res.data
    })
  }
}
