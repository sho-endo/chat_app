import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import UserProfile from '../components/users/userProfile'
import UserSerch from '../components/users/userSerch'

export default class UserRouter extends BaseRouter {
  register() {
    // とりあえず正常には動くけど、もっといい方法ありそう
    // 最後に時間の余裕あったら修正したい
    if (document.getElementById('user-profile-id')) {
      const userId = document.getElementById('user-profile-id').getAttribute('data')
      this.route('/users/' + userId, this.decorateUserProfile)
    }
    this.route('/users/serch', this.decorateUserSerch)
  }

  decorateUserProfile(ctx, next) {
    (new ReactDecorator()).decorate('react-profile', UserProfile)
    next()
  }

  decorateUserSerch(ctx, next) {
    (new ReactDecorator()).decorate('react-user-serch', UserSerch)
    next()
  }
}
