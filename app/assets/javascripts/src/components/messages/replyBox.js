import React from 'react'
import PropTypes from 'prop-types'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }
  handleKeyDown(e) {
    if (e.target.value && e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.sendMessage(this.state.value, this.props.otherUserId)
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  render() {
    // console.log(this.props.otherUserId)
    return (
      <div className='reply-box'>
        <input
          value = { this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

ReplyBox.propTypes = {
  otherUserId: PropTypes.number,
}

export default ReplyBox
