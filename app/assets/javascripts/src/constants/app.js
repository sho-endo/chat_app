import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  SERCH_USER: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  GET_MESSAGES: APIRoot + '/messages',
  CREATE_MESSAGE: APIRoot + '/messages',
  GET_SERCH_USERS: APIRoot + '/users',
}
