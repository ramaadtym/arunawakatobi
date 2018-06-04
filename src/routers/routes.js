// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// routes.js
// Define each route of applications, with using vue-router format.
// //
// import Authorized from './middlewares/auth'
import { Admin, Guest, SuperAdmin } from './middleware'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: resolve => require(['../pages/auth.vue'], resolve),
    beforeEnter: Guest
  },
  {
    path: '/',
    component: resolve => require(['../pages/dash.vue'], resolve),
    beforeEnter: Admin,
    children: [
      {
        path: 'dashboard',
        alias: '',
        name: 'dashboard',
        component: resolve => require(['../pages/dashboard.vue'], resolve),
        beforeEnter: Admin,
        meta: {description: 'Dashboard Aruna'}
      },
      {
        path: 'uptd',
        name: 'uptd',
        component: resolve => require(['../pages/uptd/index.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Daftar UPTD'}
      },
      {
        path: 'uptd/create',
        name: 'uptd-create',
        // component: resolve => require(['../pages/enumerator/create.vue'], resolve),
        component: resolve => require(['../pages/uptd/create.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Tambah UPTD'}
      },
      {
        path: 'uptd/detail/:id',
        name: 'uptd-detail',
        component: resolve => require(['../pages/uptd/detail.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Detail UPTD'}
      },
      {
        path: 'uptd/detail-users/:id',
        name: 'uptd-detail-users',
        component: resolve => require(['../pages/uptd/detail_users.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Detail Users UPTD'}
      },
      {
        path: 'management-transaction',
        name: 'management-transaction',
        component: resolve => require(['../pages/management-transaction/index.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Managemen Transaksi'}
      },
      {
        path: 'comodity',
        name: 'comodity',
        component: resolve => require(['../pages/comodity/index.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'List Komoditas'}
      },
      {
        path: 'comodity/create',
        name: 'create-comodity',
        component: resolve => require(['../pages/comodity/create.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Tambah Komoditas'}
      },
      {
        path: 'comodity/edit/:id',
        name: 'edit-comodity',
        component: resolve => require(['../pages/comodity/edit.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Edit Komoditas'}
      },
      {
        path: 'comodity/detail',
        name: 'detail-comodity',
        component: resolve => require(['../pages/comodity/edit.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Edit Komoditas'}
      },
      {
        path: 'report',
        name: 'report',
        component: resolve => require(['../pages/report/index.vue'], resolve),
        beforeEnter: SuperAdmin,
        meta: {description: 'Laporan'}
      },
      {
        path: 'enumerator',
        name: 'enumerator',
        component: resolve => require(['../pages/enumerator/index.vue'], resolve),
        beforeEnter: Admin,
        meta: {description: 'Daftar Enumerator'}
      },
      {
        path: 'enumerator/create',
        name: 'enumerator-create',
        component: resolve => require(['../pages/enumerator/create.vue'], resolve),
        beforeEnter: Admin,
        meta: {description: 'Create Enumerator'}
      },
      {
        path: 'enumerator/detail/:id',
        name: 'enumerator-detail',
        component: resolve => require(['../pages/enumerator/detail.vue'], resolve),
        beforeEnter: Admin,
        meta: {description: 'Detail Enumerator'}
      },
      {
        path: 'enumerator/edit/:id',
        name: 'enumerator-edit',
        component: resolve => require(['../pages/enumerator/edit.vue'], resolve),
        beforeEnter: Admin,
        meta: {description: 'Edit Enumerator'}
      },
      {
        path: '*',
        name: 'error',
        component: resolve => require(['../pages/404.vue'], resolve),
        hidden: true
      }
    ]
  }
]

export default routes
