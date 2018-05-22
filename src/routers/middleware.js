// Copyright 2016 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// middleware.js
// Buch of middleware function that used by router.
//
import session from '../services/session'
import router from './index'

// Authorization only can be view this page.
export const Auth = (to, from, next) => {
  if (session.isLogin()) {
    next(true)
  } else {
    next(false)
    router.push('/auth')
  }
}

// Guest only can be view this page.
export const Guest = (to, from, next) => {
  if (!session.isLogin()) {
    next(true)
  } else {
    next(false)
    router.push('/')
  }
}

// SuperAdmin only can viewed this page.
export const SuperAdmin = (to, from, next) => {
  if (session.isLogin() && session.me().user_group_id === '65536') {
    next(true)
  } else {
    next(false)
    router.push('/auth')
  }
}

// Admin only can viewed this page.
export const Admin = (to, from, next) => {
  if (session.isLogin() && (session.me().user_group_id === '131072' || session.me().user_group_id === '65536')) {
    next(true)
  } else {
    next(false)
    router.push('/auth')
  }
}
