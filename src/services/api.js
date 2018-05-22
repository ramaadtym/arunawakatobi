import rest from '../services/rest'

/**
 * API class wrapper to get a response from REST API
 * Example:
 * var api = new API('endpoint')
 * - api.get(params)      // to get all data, use params to pass a query string
 * - api.show(id, params) // get detail data, use params to pass query string
 * - api.post(data)       // post some data
 * - api.put(id, data)    // update partial data with id defined
 * - api.delete(id)       // delete data with id defined
 */
class API {
  // class constructor
  constructor (endpoint) {
    this.endpoint = endpoint
  }

  // Perform GET http request.
  get (params) {
    return rest.get(this.endpoint, {params}).then(res => {
      return res.data
    })
  }

  // Perform GET http request for detail.
  show (id, params) {
    return rest.get(this.parseUrl(id), {params}).then(res => {
      return res.data
    })
  }

  // Perform POST http request.
  post (data) {
    return rest.post(this.endpoint, data).then(res => {
      return res.data
    })
  }

  // Perform PUT http request.
  put (id, data) {
    return rest.put(this.parseUrl(id), data).then(res => {
      return res.data
    })
  }

  // Perform DELETE http request.
  delete (id) {
    return rest.delete(this.parseUrl(id)).then(res => {
      return res.data
    })
  }

  request (method, path, data) {
    return rest[method.toLowerCase()](this.endpoint + '/' + path, data).then(res => {
      return res.data
    })
  }

  // bake endpoint with id
  parseUrl (id) {
    var x = this.endpoint + '/' + id
    return x
  }
}

export default API
