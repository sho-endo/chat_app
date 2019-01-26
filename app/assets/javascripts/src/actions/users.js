import request from 'superagent'
import Dispatcher from '../dispatcher'
import { ActionTypes, APIEndpoints } from '../constants/app'

export default {
  serchUser(serchWord) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_SERCH_USERS}`)
      .query({serch_word: serchWord})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SERCH_USER,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  getFriends() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.GET_FRIENDS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
