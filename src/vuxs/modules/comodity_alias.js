import ComodityAliasService from '../services/comodity_alias'
import { comodityAlias, form } from '../mutation-types'
import router from '../../routers'

export default {
  actions: {
    [comodityAlias.action.create] ({dispatch}, data) {
      dispatch(form.action.submit)

      ComodityAliasService.createComodityAlias(data).then(res => {
        router.push('/commodity')
      }).catch(errors => {
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [comodityAlias.action.update]({dispatch}, [id, data]) {
      dispatch(form.action.submit)
      ComodityAliasService.updateComodityAlias(id, data).then(res => {
      }).catch(errors => {
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    }
  }
}
