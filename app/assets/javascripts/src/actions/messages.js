import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes, APIEndpoints, CSRFToken } from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  // sendMessage(userID, message) {
  //   Dispatcher.handleViewAction({
  //     type: ActionTypes.SEND_MESSAGE,
  //     userID: userID,
  //     message: message,
  //     timestamp: +new Date(),
  //   })
  // },
  sendMessage(contents) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        contents,
        from: 1, // ユーザー機能を実装したら修正
        timestamp: +new Date(),
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
