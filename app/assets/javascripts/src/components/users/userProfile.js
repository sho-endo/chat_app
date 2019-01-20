import React from 'react'

class UserProfile extends React.Component {
  render() {
    const currentUserId = document.getElementById('current_user-id').getAttribute('data')
    const userId = document.getElementById('user-profile-id').getAttribute('data')
    const userName = document.getElementById('user-profile-name').getAttribute('data')
    const userEmail = document.getElementById('user-profile-email').getAttribute('data')
    return (
      <div className='row user-profile-wrapper'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3'>
          <div className='jumbotron'>
            <div className='profile-contents-wrapper'>
              <p>{userName}</p>
              <p>{userEmail}</p>
              { userId === currentUserId
                ? <a href='/users/edit' className='btn btn-info'>プロフィール編集</a>
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
