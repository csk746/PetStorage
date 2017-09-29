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
 ADD_COMMENT,
 GET_STORY
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

export function addComment(storyId, comment) {

  return dispatch => {

    console.log ("storyId  : " + storyId + " comment : " + comment)
    BackendFactory().addComment({
      storyId:storyId,
      comment:comment
    }).then(response => {
      dispatch({ type: ADD_COMMENT, storyId:storyId , comment:comment });
    });

  }
}

export function iLikeStory(storyId) {
  return dispatch => {
    console.log("like request id : " + storyId)
    BackendFactory().iLikeStroy({
      storyId: storyId
    })

  }
}

export function getStory(page, offset, field, order) {

  return dispatch => {
    BackendFactory().getStoryList({
      page:page , 
      offset:offset,
      field:field,
      order:order
    }).then(res=> {
      dispatch({ type: GET_STORY, data:res  });
    })
  }
}


