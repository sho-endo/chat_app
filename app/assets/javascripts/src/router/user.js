import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import UserProfile from '../components/users/userProfile'

export default class UserRouter extends BaseRouter {
  register() {
    const userId = document.getElementById('user-id').getAttribute('data')
    this.route('/users/' + userId, this.decorateUserProfile)
  }

  decorateUserProfile(ctx, next) {
    (new ReactDecorator()).decorate('react-profile', UserProfile)
    next()
  }
}
