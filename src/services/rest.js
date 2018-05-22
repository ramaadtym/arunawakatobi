// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// rest.js
// Intercept restful api for loading and formating response
// using axios.
//
import axios from 'axios'
import debug from '../utils/debug'
import session from './session'
import { Notification } from 'element-ui'
import vuex from '../vuxs'

//
// Initialing axios instances with api url.
//
const rest = axios.create({
  baseURL: process.env.API_URL
})

//
// Request Interceptor
// Set header authorization when token available.
//
rest.interceptors.request.use(config => {
  vuex.dispatch('serverFailure', false)

  var token = session.token()
  if (token !== '') {
    config.headers.common['Authorization'] = 'Bearer ' + token
  }
  return config
}, error => {
  return Promise.reject(error)
})

//
// Response Interceptor
// Intercept response from rest server, it will formating response data.
//
rest.interceptors.response.use(res => {
  return res
}, error => {
  // when server is not responding
  if (!error.response) {
    serverFailure('API Server is not responding.', error)
    return Promise.reject(error)
  }

  // when endpoint not found
  if (error.response.status === 404) {
    serverFailure('Endpoint target is not found.', error.response)
    return Promise.reject(error.response.data)
  }

  // when jwt rejected
  if (error.response.status === 401) {
    serverFailure('Your session was expired.', error.response)
    return Promise.reject(error.response.data)
  }

  // when error validation
  if (error.response.status === 422) {
    return Promise.reject(error.response.data.errors)
  }

  return Promise.reject(error.response)
})

// Triggering response server when failure.
const serverFailure = function serverFailure (msg, log) {
  Notification.error({
    title: 'Mayday!',
    message: msg
  })

  vuex.dispatch('serverFailure', true)

  debug.log(log)
}

export default rest
