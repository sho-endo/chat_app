import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes, APIEndpoints, CSRFToken } from '../constants/app'

export default {
  createFriendship(toUserId) {
    const currentUserId = document.getElementById('current_user-id').getAttribute('data')
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_FRIEND}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        from_user_id: currentUserId,
        to_user_id: toUserId,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.CREATE_FRIEND,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
