import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes, APIEndpoints, CSRFToken } from '../constants/app'

export default {
  createFriendship(currentUserId, toUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_FRIENDSHIP}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        from_user_id: currentUserId,
        to_user_id: toUserId,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.CREATE_FRIENDSHIP,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  deleteFriendship(otherUserId) {
    return new Promise((resolve, reject) => {
      request
      .delete(`${APIEndpoints.DELETE_FRIENDSHIP}` + otherUserId)
      .set('X-CSRF-Token', CSRFToken())
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.DELETE_FRIENDSHIP,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
