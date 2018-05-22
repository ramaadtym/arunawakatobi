// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// auth.js
// Auth vuex module.
//
import router from '../../routers'
import session from '../../services/session'
import AuthService from '../services/auth'
import UserService from '../services/user'
import { auth, form } from './../mutation-types'

export default {
  actions: {
    // Perform action login.
    [auth.action.doLogin] ({dispatch}, credentials) {
      // start form progress
      dispatch(form.action.submit)

      AuthService.login(credentials).then(res => {
        session.setToken(res.data)

        UserService.getMe().then(res => {
          session.setSession(res)

          // dispatch form was success
          dispatch(form.action.success, 'logged in')

          // redirect to dashboard
          router.push('/')
        })
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', {username: 'Invalid email or password.'}])
      })
    },

    // Perform action logout.
    [auth.action.doLogout] ({commit}) {
      // clearing current session.
      session.clear()
      // redirect to auth
      router.push('/auth')
    }
  }
}
