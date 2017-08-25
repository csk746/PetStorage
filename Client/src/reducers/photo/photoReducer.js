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
import InitialState from './photoInitialState'

import { getHost } from '../../lib/utils';

/**
 * Device actions to test
 */
const {
  GET_PHOTOLIST,
  UPLOAD_PHOTO,
  SAVE_PHOTO,
  TAKE_PHOTO
} = require('../../lib/constants').default

const initialState = new InitialState()

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function photoReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case GET_PHOTOLIST: {

      let actionList = action.urlList;
      for (let i = 0; i < actionList.length; i++) {
        state.urlList.push(actionList[i]);
      }
      return state.setIn(['syncIdx'], state.syncIdx + 1)

    }
    case TAKE_PHOTO: {
      state.photoList.push(action.url);
      return state;
    }

    case UPLOAD_PHOTO: {
      return state;
    }
    case SAVE_PHOTO: {
      return state;
    }
  }
  return state;

}