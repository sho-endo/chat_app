import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function SerchedUserList(props) {
  const serchedUsers = props.serchedUsers
  const currentUserId = props.currentUserId
  return (
    <ul className='serch_user_list'>
      {
        _.map(serchedUsers, function(user) {
          if (user.id !== currentUserId) {
            return (
              <li key={user.id} className='serch_user_list_item'>
                <div className='serch_user_list_result' onClick={props.onClick} value={user.id}>
                  <span>{user.name}</span>
                </div>
              </li>
            )
          }
        })
      }
    </ul>
  )
}

SerchedUserList.propTypes = {
  serchedUsers: PropTypes.array,
  currentUserId: PropTypes.number,
  onClick: PropTypes.func,
}

export default SerchedUserList
