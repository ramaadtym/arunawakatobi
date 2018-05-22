// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// auth.js
// Collection function of service authentication
//
import Api from '../../services/api'

export default {
  // Perform login using credentials (username, password).
  login (credentials) {
    return new Api('auth').post(credentials).then(res => {
      return res
    })
  }
}
