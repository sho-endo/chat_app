import React from 'react'
import classNames from 'classNames'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReplyBox from '../../components/messages/replyBox'
// import Utils from '../../utils'

function MessagesBox(props) {
  const { currentUser, otherUserId, messages } = props
  const shouldSkipRender = !(currentUser && otherUserId) // messagesの条件必要か
  if (shouldSkipRender) {
    return (<h1>チャット相手を選択してください</h1>)
  }
  // const messagesLength = this.state.messages.length
  const currentUserID = currentUser.id
  const sortedMessages = _.orderBy(
    messages.message, ['created_at'], ['asc']
  )
  const messagesList = sortedMessages.map((message, index) => {
    const messageClasses = classNames({
      'message-box__item': true,
      'message-box__item--from-current': message.from_user_id === currentUserID,
      'clear': true,
    })

    return (
        <li key={ message.timestamp + '-' + message.from_user_id } className={ messageClasses }>
          <div className='message-box__item__contents'>
            { message.picture.url ? <img src={message.picture.url} /> : message.contents }
          </div>
        </li>
      )
  })

  // 現時点ではstateにlastAccessは存在しないためコメントアウト
  //
  // const lastMessage = this.state.messages[messagesLength - 1]
  //
  // if (lastMessage.from === currentUserID) {
  //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
  //     const date = Utils.getShortDate(lastMessage.timestamp)
  //     messages.push(
  //         <li key='read' className='message-box__item message-box__item--read'>
  //           <div className='message-box__item__contents'>
  //             Read { date }
  //           </div>
  //         </li>
  //       )
  //   }
  // }
  return (
    <div className='message-box'>
      <ul className='message-box__list'>
        { messagesList }
      </ul>
      <ReplyBox { ...props } />,
    </div>
  )
}

MessagesBox.propTypes = {
  currentUser: PropTypes.object,
  otherUserId: PropTypes.number,
  messages: PropTypes.object,
}

export default MessagesBox
