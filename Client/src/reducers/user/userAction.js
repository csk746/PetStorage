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
 GET_ANOTHER_USER_INFO
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

export function getAnotherUserInfo(userId) {
  return dispatch => {
    }
}
