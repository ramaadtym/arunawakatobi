/**
 * Created by kevintjong on 6/22/17.
 */

import Api from '../../services/api'

let endpoint = new Api('province')

export default {
  getProvince (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  }
}
