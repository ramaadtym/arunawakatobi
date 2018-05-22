import Api from '../../services/api'

let endpoint = new Api('commodity-alias?embeds=commodity')
let point = new Api('commodity-alias')

export default {
  getComodityAlias (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  },
  createComodityAlias (data) {
    return point.post(data).then(res => {
      return res
    })
  },
  showComodityAlias (id) {
    return point.show(id).then(res => {
      return res.data
    })
  },
  updateComodityAlias (id, data) {
    return point.put(id, data).then(res => {
      return res.data
    })
  }
}
