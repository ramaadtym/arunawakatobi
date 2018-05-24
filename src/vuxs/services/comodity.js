import Api from '../../services/api'
// import fakeRest from '../../utils/fake-rest'
// import dummy from '../../utils/dummy'

let endpoint = new Api('commodity')

export default {
  getComodity (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  },
  createComodity (data) {
    return endpoint.post(data).then(res => {
      return res
    })
  },
  showComodity (id) {
    return endpoint.show(id).then(res => {
      return res.data
    })
  },
  updateComodity (id, data) {
    return endpoint.put(id, data)
    .then(res => {
      return res.data
    })
  },
  deleteComodity (id) {
    return endpoint.delete(id).then(res => {
      return res.data
    })
  }
}
