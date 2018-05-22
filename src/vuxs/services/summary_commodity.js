import summary from '../../services/fishtank'

export default {
  getAll(params) {
    return summary.get('transaction/summary/commodity', {params}).then(res => {
      return res.data
    })
  }
}
