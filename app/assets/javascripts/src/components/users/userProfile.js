import React from 'react'
import Gravatar from 'react-gravatar'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    UsersAction.getCurrentUser()
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return { currentUser: UsersStore.getCurrentUser() }
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
  render() {
    const { currentUser } = this.state
    const userId = Number(document.getElementById('user-profile-id').getAttribute('data'))
    const userName = document.getElementById('user-profile-name').getAttribute('data')
    const userEmail = document.getElementById('user-profile-email').getAttribute('data')
    return (
      <div>
        <div className='row user-profile-wrapper'>
          <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3'>
            <div className='jumbotron'>
              <div className='profile-picture'>
                <Gravatar email={ userEmail } size={100} className='img-thumbnail' />
              </div>
              <div className='profile-contents-wrapper'>
                <p>{userName}</p>
                <p>{userEmail}</p>
                { userId === currentUser.id
                  ? <a href='/users/edit' className='btn btn-info'>プロフィール編集</a>
                  : null }
              </div>
            </div>
          </div>
      </div>
      </div>
    )
  }
}

export default UserProfile
