// Copyright 2017 PT. Qasico Teknologi Indonesia. All rights reserved.
// Use of this source code is governed by a MIT style
// license that can be found in the LICENSE file.
//
// geocoder.js
// Perform request geocode to google maps api
// using axios.
//
import axios from 'axios'

const QueryString = require('querystring')
const ApiKey = 'AIzaSyBHY1yo5gOeKzfBRqJFWNfg-hjy5rh4wvI'

// export default function (region) {
//   // don't do anything when region is empty
//   if (region === '') {
//     return false
//   }
//   // making clean query strings
//   var qs = QueryString.stringify({
//     address: region,
//     key: ApiKey
//   })
//   // perform get request into google maps api with query string above
//   return axios.get('https://maps.googleapis.com/maps/api/geocode/json?' + qs).then(res => {
//     if (res.data.status === 'OK' && res.data.results.length > 0) {
//       return res.data.results[0]
//     }
//   })
// }

export default {
  getLangLat (region) {
    // don't do anything when region is empty
    if (region === '') {
      return false
    }
    // making clean query strings
    var qs = QueryString.stringify({
      address: region,
      key: ApiKey
    })
    // perform get request into google maps api with query string above
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?' + qs).then(res => {
      if (res.data.status === 'OK' && res.data.results.length > 0) {
        return res.data.results[0]
      }
    })
  }
  // reversed geocoding for getting address based on marker
  // getAddress (lang, lat) {
  //   // don't do anything when region is empty
  //   if (lang === '' || lat === '') {
  //     return false
  //   }
  //
  //   // making clean query strings
  //   var qs = QueryString.stringify({
  //     latlng: lat + ',' + lang,
  //     key: ApiKey
  //   })
  //   // perform get request into google maps api with query string above
  //   return axios.get('https://maps.googleapis.com/maps/api/geocode/json?' + qs).then(res => {
  //     if (res.data.status === 'OK' && res.data.results.length > 0) {
  //       return res.data.results[0]
  //     }
  //   })
  // }
}
