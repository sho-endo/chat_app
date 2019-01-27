import React from 'react'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'

class Header extends React.Component {
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
}

export default Header
