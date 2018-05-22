/**
 * Created by Kevin on 4/11/2017.
 */

import EntityService from '../services/entity'
import {entity, form} from '../mutation-types'
import router from '../../routers'
import UserService from '../services/user'
import session from '../../services/session'

export default {
  actions: {
    [entity.action.create] ({dispatch}, data) {
      // start form progress
      dispatch(form.action.submit)

      EntityService.createEntity(data).then(res => {
        // redirect to entity
        router.push('/entity')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [entity.action.update] ({dispatch}, [id, data]) {
      // start form progress
      dispatch(form.action.submit)
      EntityService.updateEntity(id, data).then(res => {
        // redirect to entity
        router.push('/entity')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [entity.action.update_me] ({dispatch}, [id, data]) {
      // start form progress
      dispatch(form.action.submit)
      EntityService.updateEntityMe(id, data).then(res => {
        // redirect to entity
        UserService.getMe().then(query => {
          session.setSession(query)
          router.go({
            path: '/settings'
          })
        })
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [entity.action.diactive] ({dispatch}, [id]) {
      // start form progress
      dispatch(form.action.submit)
      EntityService.deactiveEntity(id).then(res => {
        // redirect to entity
        router.go({
          path: '/entity'
        })
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    }
  }
}
