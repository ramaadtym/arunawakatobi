// Copyright 2016 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// namespace.js
// Helper to create a namespaces format to prevent conflict naming of vuex names.
// it will format like module/actionName
//

function mapValues(obj, f) {
  const res = {}
  Object.keys(obj).forEach(key => {
    res[key] = f(obj[key], key)
  })
  return res
}

export default (module, types) => {
  let newObj = {}

  mapValues(types, (names, type) => {
    newObj[type] = {}
    types[type].forEach(name => {
      var newKey = module + '/' + name
      newObj[type][name] = newKey
    })
  })
  return newObj
}
