import fishtank from '../../services/fishtank'

export default {
  getReportTransaction(params) {
    return fishtank.get('report/transaction', {params}).then(res => {
      return res.data
    })
  },
  getActiveFishermanType (params) {
    return fishtank.get('report/active-fisherman', {params}).then(res => {
      return res.data
    })
  }
}
