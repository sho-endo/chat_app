import React from 'react'

class UserProfile extends React.Component {
  render() {
    const userName = document.getElementById('user-name').getAttribute('data')
    const userEmail = document.getElementById('user-email').getAttribute('data')
    return (
      <div className='row user-profile-wrapper'>
        <div className='col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3'>
          <div className='jumbotron'>
            <div className='profile-contents-wrapper'>
              <p>{userName}</p>
              <p>{userEmail}</p>
              <a href='/users/edit' className='btn btn-info'>プロフィール編集</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
