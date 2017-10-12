/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 *
 * InitialState
 */
import InitialState from './storyInitialState'

import { getHost } from '../../lib/utils';

/**
 * Device actions to test
 */
const {
 ILIKE_STORY, 
 ADD_COMMENT,
 GET_STORY
} = require('../../lib/constants').default

const initialState = new InitialState()


/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function storyReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  let host = getHost() + '/storage/image/';

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case ADD_COMMENT :{
      let storyId = action.storyId;
      let comment = action.comment;
      return state.setIn(['syncIdx'], state.syncIdx + 1)

    }
    case GET_STORY: {

      if ( action.data != null){
        let storyList = action.data ; 

          let storageList = state.storys;

          for (let i = 0; i < storyList.length; i++) {
            let story = storyList[i];
            for (let i = 0; i < story.urlList.length; i++) {
              story.urlList[i] = host + story.urlList[i];
              story.pet.profileUrl = host + story.pet.profileUrl;
              console.log ( "storyId : " + story.id + " petUrl  : " + story.pet.profileUrl)
            }
            state.storys.push(story);
        }

        state.setIn(['refresh'], false)
        return state.setIn(['syncIdx'], state.syncIdx + 1)
      }

    }
  }
  return state;

}