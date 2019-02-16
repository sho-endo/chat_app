import React from 'react'
import PropTypes from 'prop-types'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'

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
      MessagesAction.sendMessage(this.state.value, this.props.otherUserId)
      UsersAction.getFriends()
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
  sendImage(e) {
    const file = e.target.files[0]
    const fileSizeinMB = file.size / 1024 / 1024
    if (this.checkFileSize(fileSizeinMB)) {
      MessagesAction.sendPicture(file, this.props.otherUserId)
      e.target.value = ''
    }
  }
  checkFileSize(fileSizeinMB) {
    if (fileSizeinMB > 5) {
      alert('5MB以上の画像はアップロードできません')
      return false
    }
    return true
  }
  render() {
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
        <input
          type='file'
          accept='image/jpeg,image/gif,image/png'
          className='reply-box__image'
          onChange={ this.sendImage.bind(this) }
        />
      </div>
    )
  }
}

ReplyBox.propTypes = {
  otherUserId: PropTypes.number,
}

export default ReplyBox
