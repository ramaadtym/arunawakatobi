// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// mutation-types.js
// Defining action and mutation types based on modules.
//
import namespaces from '../utils/namespace'

// AUTH MODULES
export const auth = namespaces('auth', {
  action: [
    'doLogin',
    'doLogout',
    'fetchSession'
  ],
  mutation: [
    'LOGGED_IN',
    'LOGGED_OUT'
  ]
})

// FORM MODULES
export const form = namespaces('form', {
  action: [
    'submit',
    'fail',
    'success'
  ],
  mutation: [
    'SUBMITTED',
    'FINISHED',
    'FAILED',
    'SUCCEED',
    'NOTIFIED'
  ]
})

export const user = namespaces('user', {
  action: [
    'create',
    'update',
    'update_me',
    'update_pass',
    'diactive'
  ]
})

export const entity = namespaces('entity', {
  action: [
    'create',
    'update',
    'diactive',
    'update_me'
  ]
})

export const comodity = namespaces('comodity', {
  action: [
    'create',
    'update',
    'delete'
  ]
})

export const comodityAlias = namespaces('comodityAlias', {
  action: [
    'create',
    'update',
    'delete'
  ]
})
