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

  let host = getHost() ;

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case ILIKE_STORY:{
      return state.setIn(['syncIdx'], state.syncIdx + 1)
    }
    case ADD_COMMENT :{
      let story= action.story;
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
              console.log ( story.pet)
              if (story.pet.profile) {
                console.log ( story.pet.profile.url)
                console.log ( story.pet.profile.fakeName)
                story.pet.profileUrl = host + story.pet.profile.url;
              }
              else{
                story.pet.profileUrl = ''
              }
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