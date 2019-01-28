import React from 'react'
import FriendshipsAction from '../../actions/friendships'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import SerchedUserList from './serchedUserList'
import Header from '../shared/header'

class UserSerch extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    UsersAction.getCurrentUser()
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      serchedUsers: UsersStore.getSerchedUsers(),
      currentUser: UsersStore.getCurrentUser(),
    }
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.offChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  handleInputWord(e) {
    UsersAction.serchUser(e.target.value)
  }
  onClickUserListItem(otherUserId) {
    const { currentUser } = this.state
    FriendshipsAction.createFriendship(currentUser.id, otherUserId)
    window.location.href = '/'
  }
  render() {
    return (
      <div>
        <Header { ...this.state.currentUser } />
        <div className ='user-serch-wrapper'>
          <div className='chatapp-logo-wrapper'>
            <span className='chatapp logo-C'>C</span>
            <span className='chatapp logo-h'>h</span>
            <span className='chatapp logo-a'>a</span>
            <span className='chatapp logo-t'>t</span>
            <span className='chatapp logo-A'>A</span>
            <span className='chatapp logo-p'>p</span>
            <span className='chatapp logo-p2'>p</span>
          </div>
          <input
            className='serch-form'
            placeholder='ユーザー名で検索しよう'
            onChange={ this.handleInputWord.bind(this) }
          />
          <SerchedUserList
            {...this.state }
            currentUserId = { this.state.currentUser.id }
            onClickUserListItem = { this.onClickUserListItem.bind(this) }
          />
        </div>
      </div>
    )
  }
}

export default UserSerch
