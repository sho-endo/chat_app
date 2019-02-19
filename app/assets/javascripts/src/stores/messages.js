import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersStore from '../stores/users'
import { ActionTypes } from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOtherUserId() {
    let otherUserId = null
    const friends = UsersStore.getFriends()
    if (friends.length !== 0) {
      otherUserId = friends[0].id
    }
    return otherUserId
  }
  getMessages() {
    if (!this.get('messages')) this.setMessages({})
    return this.get('messages')
  }
  setMessages(object) {
    this.set('messages', object)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_LAST_ACCESS:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
