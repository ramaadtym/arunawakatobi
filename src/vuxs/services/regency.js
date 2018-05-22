import Api from '../../services/api'

let endpoint = new Api('regency')

export default {
  getRegency (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  }
}
