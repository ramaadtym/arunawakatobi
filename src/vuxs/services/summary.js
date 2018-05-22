import fakeRest from '../../utils/fake-rest'

export default {
  getCountNelayan () {
    return fakeRest({
      request: true,
      method: 'GET',
      description: 'Get count active and total user fisherman (nelayan)',
      path: '/summary/count-nelayan',
      result: {
        total: 65,
        active: 41
      }
    })
  },

  getCountUPI () {
    return fakeRest({
      request: true,
      method: 'GET',
      description: 'Get count active and total user UPI',
      path: '/summary/count-upi',
      result: {
        total: 77,
        active: 25
      }
    })
  },

  getCountTPI () {
    return fakeRest({
      request: true,
      method: 'GET',
      description: 'Get count active and total user TPI',
      path: '/summary/count-tpi',
      result: {
        active: 40,
        total: 92
      }
    })
  },

  getCountBudidaya () {
    return fakeRest({
      request: true,
      method: 'GET',
      description: 'Get count active and total user Budaya',
      path: '/summary/count-budaya',
      result: {
        active: 40,
        total: 57
      }
    })
  },

  getCountUsers () {
    return fakeRest({
      request: true,
      method: 'GET',
      description: 'Get count users from all types (for pie chart in dashboard)',
      path: '/summary/count-users',
      result: [
        {
          type: 'budidaya',
          label: 'Budidaya',
          count: 12
        },
        {
          type: 'penangkapan',
          label: 'Penangkapan',
          count: 20
        },
        {
          type: 'UPI',
          label: 'UPI',
          count: 16
        },
        {
          type: 'nelayan',
          label: 'Nelayan',
          count: 36
        }
      ]
    })
  }
}
