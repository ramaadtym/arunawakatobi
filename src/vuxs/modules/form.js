// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// form.js
// Form Modules, Populate state of form.
//
import {form} from '../mutation-types'

export default {
  state: {
    submitted: null,
    notification: null,
    errors: [],
    success: null
  },
  mutations: {
    // Initialing form state submitted.
    [form.mutation.SUBMITTED] (state) {
      state.submitted = true
      state.notification = null
      state.errors = []
      state.success = null
    },

    // Finish state of form submitted.
    [form.mutation.FINISHED] (state) {
      state.submitted = false
    },

    // Set error form messages.
    [form.mutation.FAILED] (state, errors) {
      state.errors = errors
    },

    // Set notified form.
    [form.mutation.NOTIFIED] (state, messages, succeed) {
      state.notification = messages
      state.success = succeed
    }
  },
  actions: {
    // Trigger that form submitted.
    [form.action.submit] ({commit}) {
      commit(form.mutation.SUBMITTED)
    },

    // Trigger that form was failed to perform.
    [form.action.fail] ({commit, rootState}, [msg, errors]) {
      // dont set error when server is down
      if (!rootState.serverFailure) {
        commit(form.mutation.FAILED, errors)
      }

      // triggering form notified
      commit(form.mutation.NOTIFIED, msg, false)

      // triggering that form was finished
      commit(form.mutation.FINISHED)
    },

    // Trigger that form was succesfully processed.
    [form.action.success] ({commit}, msg) {
      // triggering form notified
      commit(form.mutation.NOTIFIED, msg, true)

      // triggering that form was finished
      commit(form.mutation.FINISHED)
    }
  }
}
