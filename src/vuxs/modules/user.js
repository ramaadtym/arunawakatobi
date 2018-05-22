/**
 * Created by Kevin on 4/12/2017.
 */
import UserService from '../services/user'
import {user, form} from '../mutation-types'
import router from '../../routers'

export default {
  actions: {
    [user.action.create] ({dispatch}, data) {
      // start form progress
      dispatch(form.action.submit)
      UserService.createUser(data).then(res => {
        // redirect to users
        router.push('/users')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [user.action.update] ({dispatch}, [id, data]) {
      // start form progress
      dispatch(form.action.submit)
      UserService.updateUser(id, data).then(res => {
        // redirect to users
        router.push('/users')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [user.action.update_pass] ({dispatch}, [id, data]) {
      // start form progress
      dispatch(form.action.submit)
      UserService.updateUserPassword(id, data).then(res => {
        // redirect to users
        router.push('/users')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [user.action.update_me] ({dispatch}, data) {
      // start form progress
      dispatch(form.action.submit)
      UserService.updateMe(data).then(res => {
        // redirect to users
        router.go('/settings')
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    },
    [user.action.diactive] ({dispatch}, [id]) {
      // start form progress
      dispatch(form.action.submit)
      UserService.deactiveUser(id).then(res => {
        // redirect to entity
        router.go({
          path: '/users'
        })
      }).catch(errors => {
        // dispatch form was failed
        dispatch(form.action.fail, ['Please check your credentials.', errors])
      })
    }
  }
}
