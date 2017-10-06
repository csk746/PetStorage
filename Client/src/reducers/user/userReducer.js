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
import InitialState from './userInitialState'

import { getHost } from '../../lib/utils';

/**
 * Device actions to test
 */
const {
 GET_ANOTHER_USER_INFO
} = require('../../lib/constants').default

const initialState = new InitialState()

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function userReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case GET_ANOTHER_USER_INFO:{
      console.log ( "reducer data : " + action.data);
    }
  }
  return state;

}