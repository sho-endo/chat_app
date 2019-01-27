import React from 'react'
import PropTypes from 'prop-types'

function Header(currentUser) {
  return (
    <header className='header'>
      <div className='header-left'>
        <div className= 'header-logo'>
          <a href='/' className='header-logo-link'>ChatApp</a>
        </div>
      </div>
      <div className='header-right'>
        <ul className='nav navbar-nav'>
          <li className='serch-user-btn'><a href='/users/serch'>ユーザーを探す</a></li>
          <li className='dropdown header-dropdown'>
            <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>{currentUser.name}<span className='caret'></span></a>
            <ul className='dropdown-menu user-menu'>
              <li className='user-menu-list'><a href={'/users/' + currentUser.id}>マイページ</a></li>
              <li className='user-menu-list'><a href='/users/sign_out' data-method='delete'>ログアウト</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  )
}

Header.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
}

export default Header
