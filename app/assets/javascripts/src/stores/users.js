import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import { ActionTypes } from '../constants/app'

class UserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getSerchedUsers() {
    if (!this.get('serchedUsers')) this.setSerchedUsers([])
    return this.get('serchedUsers')
  }
  getFriends() {
    if (!this.get('friends')) this.setFriends([])
    return this.get('friends')
  }
  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }
  setSerchedUsers(array) {
    this.set('serchedUsers', array)
  }
  setFriends(array) {
    this.set('friends', array)
  }
  setCurrentUser(array) {
    this.set('currentUser', array)
  }
}
const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SERCH_USER:
      UsersStore.setSerchedUsers(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.GET_FRIENDS:
      UsersStore.setFriends(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.CREATE_FRIENDSHIP:
      UsersStore.setFriends(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.DELETE_FRIENDSHIP:
      UsersStore.setFriends(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      UsersStore.setCurrentUser(action.json)
      UsersStore.emitChange()
      break
  }
})

export default UsersStore
