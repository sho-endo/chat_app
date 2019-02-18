import React from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import classNames from 'classnames'
import Gravatar from 'react-gravatar'
// import Utils from '../../utils'

function UserList(props) {
  const {
    friends,
    otherUserId,
    onClickDeleteButton,
    changeOpenChat,
  } = props
  const shouldSkipRender = !friends
  if (shouldSkipRender) {
    return (<div className='user-list'></div>)
  }
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
  const friendsList = friends.map((user, index) => {
    const itemClasses = classNames({
      'user-list__item': true,
      'clear': true,
      // 'user-list__item--new': isNewMessage,
      'user-list__item--active': otherUserId === user.id,
    })
    return (
      <li
        onClick={(e) => changeOpenChat(user.id)}
        className={ itemClasses }
        key={ user.id }
      >
        <div className='user-list__item__details'>
          <div className='user-list__item__picture'>
            <Gravatar email={ user.email } />
          </div>
          <a href={`/users/${user.id}`} className='user-list__item__name'>
            { user.name }
          </a>
        </div>
        <i
        onClick={(e) => onClickDeleteButton(e, user.id) }
        className='fa fa-times-circle user-list__item__delete-btn'
        >
        </i>
      </li>
    )
  }, this)

  return (
    <div className='user-list'>
      <ul className='user-list__list'>
        { friendsList }
      </ul>
    </div>
  )
}

UserList.propTypes = {
  friends: PropTypes.array,
  otherUserId: PropTypes.number,
  onClickDeleteButton: PropTypes.func,
  changeOpenChat: PropTypes.func,
}

export default UserList
