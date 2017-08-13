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

/**
 * Device actions to test
 */
const {
  UPLOAD_PHOTO,
  SAVE_PHOTO
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
    case UPLOAD_PHOTO: {
    }
    case SAVE_PHOTO: {
      console.log("savePhoto")
      console.log(state.photoList)
      console.log(action.payload)
      let photoList = state.photoList;
      photoList.push(action.payload)

      state.set('photoList', photoList)
    }

  }

  return state
}
