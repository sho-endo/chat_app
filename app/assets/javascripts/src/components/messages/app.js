import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import Header from '../shared/header'
import FriendshipsAction from '../../actions/friendships'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import MessagesStore from '../../stores/messages'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    UsersAction.getCurrentUser()
    UsersAction.getFriends()
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    let otherUserId
    if (!this.state || !this.state.otherUserId) {
      otherUserId = MessagesStore.getOtherUserId()
    } else {
      otherUserId = this.state.otherUserId
    }

    return {
      currentUser: UsersStore.getCurrentUser(),
      users: UsersStore.getFriends(),
      otherUserId,
    }
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.offChange.bind(this))
    MessagesStore.offChange(this.offChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(otherUserId) {
    this.setState({
      otherUserId,
    })
  }
  onClickDeleteButton(e, otherUserId) {
    if (confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      this.deleteFriendship(otherUserId)
    }
    e.stopPropagation()
  }
  deleteFriendship(otherUserId) {
    FriendshipsAction.deleteFriendship(otherUserId)
  }
  render() {
    return (
      <div className='app'>
        <Header { ...this.state.currentUser } />
        <UserList
          { ...this.state }
          onClickDeleteButton = { this.onClickDeleteButton.bind(this) }
          changeOpenChat = { this.changeOpenChat.bind(this) }
        />
        <MessagesBox { ...this.state } />
      </div>
    )
  }
}

export default App
