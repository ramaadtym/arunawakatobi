/**
 * Created by kevintjong on 6/22/17.
 */

import Api from '../../services/api'

let endpoint = new Api('district')

export default {
  getDistrict (params) {
    return endpoint.get(params).then(res => {
      return res
    })
  }
}
