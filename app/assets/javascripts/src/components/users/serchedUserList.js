import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function SerchedUserList(props) {
  const serchedUsers = props.serchedUsers
  return (
    <ul className='serch_user_list'>
      {
        _.map(serchedUsers, function(user) {
          return (
          <li key={user.id} className='serch_user_list_item'>
            <div className='serch_user_list_result'>
              <span>{user.name}</span>
            </div>
          </li>
          )
        })
      }
    </ul>
  )
}

SerchedUserList.propTypes = {
  serchedUsers: PropTypes.array,
}

export default SerchedUserList
