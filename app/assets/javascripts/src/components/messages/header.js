import React from 'react'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <div className='header-left'>
            <div className= 'header-logo'>
              <a href='/' className='header-logo-link'>Chat App</a>
            </div>
          </div>
          <div className='header-right'>
            <ul className='nav navbar-nav'>
              <li className='serch-user-btn'><a href='#'>ユーザーを探す</a></li>
              <li className='dropdown header-dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>ログイン中のユーザー名<span className='caret'></span></a>
                <ul className='dropdown-menu user-menu'>
                  <li className='user-menu-list'><a href='#'>ログインユーザーのマイページ</a></li>
                  <li className='user-menu-list'><a href='/users/sign_out' data-method='delete'>ログアウト</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </header>
      )
  }
}

export default Header
