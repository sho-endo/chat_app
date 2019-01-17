import 'babel-polyfill'
import $ from './vendor/jquery'
import page from 'page'
import MessageRouter from './router/message'
import HeaderRouter from './router/header'
import UserRouter from './router/user'

$(() => {
  const messageRouter = new MessageRouter()
  messageRouter.register()

  const headerRouter = new HeaderRouter()
  headerRouter.register()

  const userRouter = new UserRouter()
  userRouter.register()

  page({click: false})
})
