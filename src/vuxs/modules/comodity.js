import comodityService from '../services/comodity'
import {comodity, form} from '../mutation-types'
import router from '../../routers'

export default {
  actions: {
    [comodity.action.create] ({dispatch}, data) {
      dispatch(form.action.submit)

      comodityService.createComodity(data).then(res => {
        router.push('/comodity')
      }).catch(errors => {
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [comodity.action.update]({dispatch}, [id, data]) {
      dispatch(form.action.submit)
      comodityService.updateComodity(id, data).then(res => {
        location.reload()
      }).catch(errors => {
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    }
  }
}
