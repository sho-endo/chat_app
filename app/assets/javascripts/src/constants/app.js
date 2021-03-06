import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  SERCH_USER: null,
  GET_FRIENDS: null,
  CREATE_FRIENDSHIP: null,
  DELETE_FRIENDSHIP: null,
  GET_CURRENT_USER: null,
  UPDATE_LAST_ACCESS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  GET_MESSAGES: APIRoot + '/messages',
  CREATE_MESSAGE: APIRoot + '/messages',
  GET_SERCH_USERS: APIRoot + '/users/serch',
  GET_FRIENDS: APIRoot + '/users/friends',
  GET_CURRENT_USER: APIRoot + '/users/return_current_user',
  CREATE_FRIENDSHIP: APIRoot + '/friendships',
  DELETE_FRIENDSHIP: APIRoot + '/friendships/',
  UPDATE_LAST_ACCESS: APIRoot + '/friendships/update_last_access',
}
