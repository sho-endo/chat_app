import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import { ActionTypes } from '../constants/app'

// const users = {
//   user: {
//     id: 1,
//     name: 'John Doek',
//     profilePicture: 'https://avatars1.githubusercontent.com/u/8901351?v=3&s=200',
//   },
// }

class UserStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }
  setUsers(array) {
    this.set('users', array)
  }
}
const UsersStore = new UserStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SERCH_USER:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.GET_FRIENDS:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break

    case ActionTypes.CREATE_FRIEND:
      UsersStore.setUsers(action.json)
      UsersStore.emitChange()
      break
  }
})

export default UsersStore
