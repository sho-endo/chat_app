import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function SerchedUserList(props) {
  const { serchedUsers, currentUserId, onClickUserListItem } = props
  return (
    <ul className='serch_user_list'>
      {
        _.map(serchedUsers, function(user) {
          if (user.id !== currentUserId) {
            return (
              <li key={user.id} className='serch_user_list_item'>
                <div
                  className='serch_user_list_result'
                  onClick={(e) => onClickUserListItem(user.id)}
                >
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
  onClickUserListItem: PropTypes.func,
}

export default SerchedUserList
