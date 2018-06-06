import Api from '../../services/api'

let endpoint = new Api('fisherman-user')

export default {
  // Retrive current user info
  getFisherman (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  },
  // Create new Entity
  createFisherman (data) {
    return endpoint.post(data).then(res => {
      return res
    })
  },
  getFishermanDetail (id) {
    return endpoint.show(id).then(res => {
      return res.data
    })
  },
  updateFisherman (id, data) {
    return endpoint.put(id, data).then(res => {
      return res.data
    })
  },
  deleteFisherman (id) {
    return endpoint.delete(id).then(res => {
      return res.data
    })
  }
}
