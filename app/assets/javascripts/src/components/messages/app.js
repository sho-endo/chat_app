import React from 'react'
import _ from 'lodash'
import UserList from './userList'
import MessagesBox from './messagesBox'
import FriendshipsAction from '../../actions/friendships'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class App extends React.Component {
  constructor(props) {
    super(props)
    UsersAction.getCurrentUser()
    UsersAction.getFriends()
  }
  getStateFromStore() {
    // setStateでotherUserIdが指定された場合はその値を保持する
    const isOtherUserIdPresent = this.state && this.state.otherUserId
    const otherUserId = isOtherUserIdPresent ? this.state.otherUserId : null
    return {
      currentUser: UsersStore.getCurrentUser(),
      friends: UsersStore.getFriends(),
      otherUserId,
      messages: MessagesStore.getMessages(),
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
  shouldComponentUpdate(nextProps, nextState) {
    const stateDiff = _.isEqual(nextState, this.state)
    return !stateDiff
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(otherUserId) {
    this.setState({ otherUserId })
    MessagesAction.getMessages(otherUserId)
    FriendshipsAction.updateLatsAccess(otherUserId)
  }
  onClickDeleteButton(e, otherUserId) {
    if (confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      this.deleteFriendship(otherUserId)
    }
    e.stopPropagation()
  }
  deleteFriendship(otherUserId) {
    FriendshipsAction.deleteFriendship(otherUserId)
    if (otherUserId === this.state.otherUserId) {
      this.setState({ otherUserId: null })
      MessagesAction.getMessages(null)
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className='app'>
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
