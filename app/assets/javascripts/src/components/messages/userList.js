import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Gravatar from 'react-gravatar'
import Utils from '../../utils'

function UserList(props) {
  const {
    friends,
    otherUserId,
    onClickDeleteButton,
    changeOpenChat,
  } = props

  const shouldSkipRender = !(friends && friends.length > 0)
  if (shouldSkipRender) {
    return (
    <div className='user-list skip-render-list'>
      <p className='skip-render-list__text'>
        <a href='/users/serch'>検索ページ</a>からチャット相手を見つけましょう
      </p>
    </div>
    )
  }

  const friendsList = friends.map((friend, index) => {
    const { lastMessage } = friend
    const date = lastMessage.contents === null ? null : Utils.getNiceDate(lastMessage.timestamp)
    let statusIcon
    if (lastMessage.contents === null) {
      statusIcon = 'no message'
    } else if (lastMessage.toUserId === friend.id) {
      statusIcon = (
        <i className='fa fa-reply user-list__item__icon' />
      )
    } else {
      statusIcon = (
        <i className='fa fa-envelope-o user-list__item__icon' />
      )
    }
    let isNewFriend = lastMessage.contents === null
    const itemClasses = classNames({
      'user-list__item': true,
      'clear': true,
      'user-list__item--new': isNewFriend,
      'user-list__item--active': otherUserId === friend.id,
    })
    return (
      <li
        onClick={(e) => changeOpenChat(friend.id)}
        className={ itemClasses }
        key={ friend.id }
      >
        <div className='user-list__item__details'>
          <div className='user-list__item__picture'>
            <a href={`/users/${friend.id}`}><Gravatar email={ friend.email } /></a>
          </div>
          <h4 href={`/users/${friend.id}`} className='user-list__item__name'>
            { friend.name }
          </h4>
          <span className='user-list__item__message'>
            { statusIcon } { lastMessage.contents }
          </span>
        </div>
        <i
          onClick={(e) => onClickDeleteButton(e, friend.id) }
          className='fa fa-times-circle user-list__item__delete-btn'
        >
        </i>
        <abbr className='user-list__item__timestamp'>
          { date }
        </abbr>
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
