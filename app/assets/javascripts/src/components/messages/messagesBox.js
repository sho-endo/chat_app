import React from 'react'
import classNames from 'classNames'
import PropTypes from 'prop-types'
import _ from 'lodash'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import ReplyBox from '../../components/messages/replyBox'
// import Utils from '../../utils'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())
    // stateは1つのobjectにする必要がある
    return { messages: MessagesStore.getMessages() }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.offChange.bind(this))
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.otherUserId !== nextProps.otherUserId) {
      MessagesAction.getMessages(nextProps.otherUserId)
    }
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    // const messagesLength = this.state.messages.length
    const currentUserID = this.props.currentUser.id
    const sortedMessages = _.orderBy(
      this.state.messages, ['created_at'], ['asc']
    )
    const messages = sortedMessages.map((message, index) => {
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
            { messages }
          </ul>
          <ReplyBox { ...this.props } />,
        </div>
      )
  }
}

MessagesBox.propTypes = {
  currentUser: PropTypes.object,
  otherUserId: PropTypes.number,
}

export default MessagesBox
