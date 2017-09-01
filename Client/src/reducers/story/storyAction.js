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
 GET_STORY
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

export function getStory(petId, page, maxSize, field, order) {

  return dispatch => {
  }
}


