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
 ILIKE_STORY, 
 GET_STORY
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';


export function iLikeStory(storyId) {
  return dispatch => {

    console.log ("like request id : " + storyId)
    BackendFactory().iLikeStroy({
      storyId:storyId
    })

  }
}

export function getStory(petId, page, maxSize, field, order) {

  return dispatch => {
  }
}


