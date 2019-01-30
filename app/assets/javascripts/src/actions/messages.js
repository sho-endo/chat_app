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
  sendMessage(contents, otherUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        contents,
        to_user_id: otherUserId,
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
  sendPicture(file, otherUserId) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.CREATE_MESSAGE}`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('picture', file, file.name)
      .field('to_user_id', otherUserId)
      .field('timestamp', +new Date())
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  getMessages(otherUserId) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_MESSAGES}`) // 取得したいjsonがあるURLを指定する
      .query({other_user_id: otherUserId})
      .end((error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_MESSAGES,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
