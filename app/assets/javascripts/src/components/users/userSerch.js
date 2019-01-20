import React from 'react'

class UserSerch extends React.Component {
  render() {
    return (
      <div className ='user-serch-wrapper'>
        <div className='chatapp-logo-wrapper'>
          <span className='chatapp logo-C'>C</span>
          <span className='chatapp logo-h'>h</span>
          <span className='chatapp logo-a'>a</span>
          <span className='chatapp logo-t'>t</span>
          <span className='chatapp logo-A'>A</span>
          <span className='chatapp logo-p'>p</span>
          <span className='chatapp logo-p2'>p</span>
        </div>
        <input
          className='serch-form'
          placeholder='ユーザー名で検索しよう'
        />
      </div>
    )
  }
}

export default UserSerch
