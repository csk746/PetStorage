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

    }
    case GET_STORY: {

      if ( action.data != null){
        let storyList = action.data ; 

          let storageList = state.storys;

          for ( let i =0 ;i < storyList.length ; i ++){
          let story = storyList[i];
          let storyObj = {};
          let photoList = [];
          for ( let i =0 ;i < story.urlList.length; i ++){
            photoList.push(host + story.urlList[i]);
          }

          storyObj.urlList = photoList;
          storyObj.id = story.id;
          storyObj.text = story.text;
          storyObj.title = story.title ; 
          storyObj.userId = story.user.id;
          storyObj.photoList = photoList ; 
          if (story.pet != null) {
            storyObj.petId = story.pet.id;
          }

          storyObj.comments = story.comments;

          storageList.push(storyObj);
        }

        state.setIn(['storys'], storageList)
        state.setIn(['refresh'], false)
        return state.setIn(['syncIdx'], state.syncIdx + 1)
      }

      /**
       * 
const Commnet = Record({
  id:0, 
  userId:0,
  text:'',
})

const Storys = Record({
  petId:0,
  iliked:false,
  comments: [],
  photoList : []
})

       */

    }
  }
  return state;

}