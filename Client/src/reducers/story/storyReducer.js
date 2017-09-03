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

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case GET_STORY: {

    }
  }
  return state;

}