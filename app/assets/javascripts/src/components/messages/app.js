import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import Header from '../shared/header'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'

class App extends React.Component {
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
    return (
        <div className='app'>
          <Header { ...this.state.currentUser } />
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default App
