import React from 'react'
import classNames from 'classNames'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReplyBox from '../../components/messages/replyBox'
import Utils from '../../utils'

class MessagesBox extends React.Component {
  componentDidUpdate() {
    const messageList = document.getElementsByClassName('scroll-target')[0]
    messageList.scrollTop = messageList.scrollHeight // 常に一番下にスクロールして表示する
  }
  render() {
    const { currentUser, otherUserId, messages } = this.props
    const isNotEmpty = (obj) => {
      return Object.keys(obj).length
    }
    const shouldSkipRender = !(currentUser && otherUserId && isNotEmpty(messages))
    if (shouldSkipRender) {
      return (
        <div className='message-box__list skip-render-box scroll-target'>
          <h3 className='skip-render-box__text'>
            チャット相手を選択してください
          </h3>
        </div>
      )
    }
    const lastAccessOfRecipient = messages.lastAccess.recipient
    const sortedMessages = _.orderBy(
      messages.message, ['created_at'], ['asc']
    )
    const messagesList = sortedMessages.map((message, index) => {
      const messageFromCurrentUser = message.from_user_id === currentUser.id
      const date = Utils.getShortDate(message.timestamp)
      const read = (lastAccessOfRecipient > message.timestamp) && messageFromCurrentUser
              ? '既読'
              : null
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': messageFromCurrentUser,
        'clear': true,
      })
      return (
        <li key={ message.timestamp + '-' + message.from_user_id } className={ messageClasses }>
          <div className='message-box__item__contents'>
            { message.picture.url ? <img src={message.picture.url} /> : message.contents }
          </div>
          <div className='message-box__item__status'>
            <div className='message-box__item__read'>
              { read }
            </div>
            <div className='message-box__item__date'>
              { date }
            </div>
          </div>
        </li>
      )
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list scroll-target'>
          { messagesList }
        </ul>
        <ReplyBox { ...this.props } />,
      </div>
    )
  }
}
MessagesBox.propTypes = {
  currentUser: PropTypes.object,
  otherUserId: PropTypes.number,
  messages: PropTypes.object,
}

export default MessagesBox
