import fishtank from '../../services/fishtank'
import session from '../../services/session'
import fakeRest from '../../utils/fake-rest'
import dummy from '../../utils/dummy'

export default {
  getAll(params) {
    // cek usergroup kalau admin dia ambil hanya data punya entitas dia
    var me = session.me()
    if (me.user_group_id !== '65536') {
      if (typeof params.conditions === 'undefined') {
        params.conditions = ''
      }

      var entity = session.entity()
      if (params.conditions.length > 0) {
        params['conditions'] = 'entity:' + entity.entity_name + ',' + params.conditions
      } else {
        params['conditions'] = 'entity:' + entity.entity_name
      }
    }

    return fishtank.get('transaction', {params}).then(res => {
      return res.data
    })
  },
  getSummary(year, params) {
    // cek usergroup kalau admin dia ambil hanya data punya entitas dia
    var me = session.me()
    if (me.user_group_id !== '65536') {
      var entity = session.entity()
      params['entity'] = entity.entity_name
    }

    // @TODO: ganti ke endpoint khusus
    // Sementara request 12 kali untuk setiap bulan
    const results = []
    return this.getTransactionCommodityMonthly(1, year, params)
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(2, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(3, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(4, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(5, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(6, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(7, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(8, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(9, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(10, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(11, year, params)
    })
    .then(data => {
      results.push(data)
      return this.getTransactionCommodityMonthly(12, year, params)
    })
    .then(data => {
      results.push(data)
      return results.map((data, index) => {
        let qty = 0
        if (data && data.data) {
          data.data.forEach(d => {
            qty += d.total_quantity
          })
        }

        return {
          month: index + 1,
          total_quantity: qty
        }
      })
    })
  },
  getTransactionCommodityMonthly (month, year, params) {
    console.time('Fetch transaction/summary/commodity/monthly ' + month)
    return fishtank.get('transaction/summary/commodity/monthly', {
      params: {...params, month, year}
    }).then(res => {
      console.timeEnd('Fetch transaction/summary/commodity/monthly ' + month)
      return res.data
    })
  },
  getList() {
    return fakeRest({
      method: 'GET',
      path: 'transaction',
      description: 'Get production data (for page report and manage transaction)',
      result: {
        total: 10,
        data: Array(10).fill().map(_ => {
          return {
            uptd: dummy.uptd(),
            user: dummy.uptdUser(),
            production: dummy.production()
          }
        })
      }
    })
  }
}
