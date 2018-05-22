// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// debug.js
// Helper function to print log only on development mode.
//
const debug = process.env.NODE_ENV !== 'production'

export default {
  log (msg) {
    if (debug) {
      console.log('DEBUG LOG: \n\n')
      console.log(msg)
      console.log('\n')
    }
  }
}
