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

export function addComment(story, comment) {

  return dispatch => {

    console.log ("storyId  : " + story.id+ " comment : " + comment)
    BackendFactory().addComment({
      storyId:story.id,
      comment:comment
    }).then(response => {
      dispatch({ type: ADD_COMMENT, story:story, comment:comment });
    });

  }
}

export function iLikeStory(storyId) {
  return dispatch => {
    console.log("like request id : " + storyId)
    BackendFactory().iLikeStroy({
      storyId: storyId
    }).then(response => {
      dispatch({ type : ILIKE_STORY   });
    });

  }
}

export function getStory(petId, page, offset, field, order) {

  return dispatch => {
    BackendFactory().getStoryList({
      petId:petId,
      page:page , 
      offset:offset,
      field:field,
      order:order
    }).then(res=> {
      dispatch({ type: GET_STORY, data:res  });
    })
  }
}


