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
    const users = UsersStore.getFriends()
    if (users.length !== 0) {
      otherUserId = users[0].id
    }
    return otherUserId
  }
  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }
  setMessages(array) {
    this.set('messages', array)
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
  }

  return true
})

export default MessagesStore
