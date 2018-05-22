import fishtank from '../../services/fishtank'

export default {
  getTransactionYearly (year, params) {
    return fishtank.get('transaction/in-year', {
      params: {...params, year}
    }).then(res => {
      return res.data
    })
  }
}
