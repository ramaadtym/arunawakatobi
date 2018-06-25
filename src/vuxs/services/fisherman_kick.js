import Api from '../../services/api'

let endpoint = new Api('fisherman-user/kick')

export default {
  // Retrive current user info
  deleteFisherman (id) {
    return endpoint.delete(id).then(res => {
      return res.data
    })
  }
}
