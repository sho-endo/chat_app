import React from 'react'
// import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    UsersAction.getFriends()
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // const allMessages = MessagesStore.getAllChats()

    // const messageList = []
    // _.each(allMessages, (message) => {
    //   const messagesLength = message.messages.length
    //   messageList.push({
    //     lastMessage: message.messages[messagesLength - 1],
    //     lastAccess: message.lastAccess,
    //     user: message.user,
    //   })
    // })
    return {
      openChatID: MessagesStore.getOpenChatUserID(),
      users: UsersStore.getUsers(),
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  render() {
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })

    // const messages = this.state.messageList.map((message, index) => {
    //   const date = Utils.getNiceDate(message.lastMessage.timestamp)

    //   var statusIcon
    //   if (message.lastMessage.from !== message.user.id) {
    //     statusIcon = (
    //       <i className='fa fa-reply user-list__item__icon' />
    //     )
    //   }
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     statusIcon = (
    //       <i className='fa fa-circle user-list__item__icon' />
    //     )
    //   }

    //   var isNewMessage = false
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     isNewMessage = message.lastMessage.from !== users.user.id
    //   }

    //   const itemClasses = classNames({
    //     'user-list__item': true,
    //     'clear': true,
    //     'user-list__item--new': isNewMessage,
    //     'user-list__item--active': this.state.openChatID === message.user.id,
    //   })

    //   return (
    //     <li
    //       onClick= { this.changeOpenChat.bind(this, message.user.id) }
    //       className={ itemClasses }
    //       key={ message.user.id }
    //     >
    //       <div className='user-list__item__picture'>
    //         <img src={ message.user.profilePicture } />
    //       </div>
    //       <div className='user-list__item__details'>
    //         <h4 className='user-list__item__name'>
    //           { message.user.name }
    //           <abbr className='user-list__item__timestamp'>
    //             { date }
    //           </abbr>
    //         </h4>
    //         <span className='user-list__item__message'>
    //           { statusIcon } { message.lastMessage.contents }
    //         </span>
    //       </div>
    //     </li>
    //   )
    // }, this)
    const users = this.state.users.map((user, index) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        // 'user-list__item--new': isNewMessage,
        // 'user-list__item--active': this.state.openChatID === message.user.id,
      })

      return (
        <li
          onClick={ this.changeOpenChat.bind(this, user.id) }
          className={ itemClasses }
          key={ user.id }
        >
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { user.name }
            </h4>
          </div>
        </li>
      )
    }, this)

    console.log(document.getElementById('current_user-id').getAttribute('data'))
    console.log(this.state)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {/* { this.state.users[0].name } */}
          { users }
        </ul>
      </div>
    )
  }
}

export default UserList
