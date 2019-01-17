import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Header from '../components/shared/header'

export default class HeaderRouter extends BaseRouter {
  register() {
    this.route(this.decorateHeader)
  }

  decorateHeader(ctx, next) {
    (new ReactDecorator()).decorate('react-header', Header)
    next()
  }
}
