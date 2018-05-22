// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// user.js
// Collection function of service authentication
//
import Api from '../../services/api'
import session from '../../services/session'

var endpoint = new Api('user')

export default {
  // Retrive current user info
  getMe () {
    return endpoint.show('me').then(res => {
      return res.data
    })
  },
  updateMe(data) {
    return endpoint.put('me', data).then(res => {
      return res.data
    })
  },
  getAll(params) {
    if (typeof params === 'undefined') {
      params = {}
    }
    params['embeds'] = 'usergroup'
    return endpoint.get(params).then(res => {
      return res
    })
  },
  // Create new User
  createUser (data) {
    return endpoint.post(data).then(res => {
      return res
    })
  },
  getUserDetail (id) {
    return endpoint.show(id).then(res => {
      return res.data
    })
  },
  updateUser (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  updateUserPassword (id, data) {
    return endpoint.put(id + '/change-password', data).then(res => {
      return res.data
    })
  },
  getEntityUser(params) {
    var endpoint = new Api('entity-user')
    var me = session.me()
    if (typeof params === 'undefined') {
      params = {}
    }
    if (me.user_group_id !== '65536') {
      var entity = session.entity()
      params['conditions'] = 'entity.entity_name:' + entity.entity_name
    }
    params['embeds'] = 'entity,user'
    return endpoint.get(params).then(res => {
      return res
    })
  },
  getEntityUserDetail(id, params) {
    var endpoint = new Api('entity-user')
    if (typeof params === 'undefined') {
      params = {}
    }
    params['embeds'] = 'entity,user'
    return endpoint.show(id, params).then(res => {
      return res.data
    })
  },
  getCountUserFishlog() {
    var endpoint = new Api('entity-user')
    var params = {
      conditions: 'entity.entity_app:fishlog'
    }
    return endpoint.get(params).then(res => {
      return res
    })
  },
  deactiveUser (id) {
    return endpoint.put('inactive/' + id, {}).then(res => {
      return res.data
    })
  }
}
