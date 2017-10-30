/**
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict'

const BackendFactory = require('../../lib/BackendFactory').default

/**
 * ## Imports
 *
 * The actions supported
 */
const {
 ALREAY_REQUEST_ANOTHER_USER_INFO,
 GET_ANOTHER_USER_INFO
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

export function getAnotherUserInfo(userId) {

var requestUsers=[0,];

for (let i = 0; i < requestUsers.length; i++) {
    if (requestUsers[i] == userId) {
      return {
        type: ALREAY_REQUEST_ANOTHER_USER_INFO
      }
    }
  }

  console.log("[action]getUser : " + userId)

  requestUsers.push(userId);

  return dispatch => {
    BackendFactory().getUser({
      userId: userId
    }).then(res => {
      console.log(res)
      dispatch({ type: GET_ANOTHER_USER_INFO, data: res });
    })
  }
}
