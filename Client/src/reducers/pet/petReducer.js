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
import InitialState from './petInitialState'

import { getHost } from '../../lib/utils';

/**
 * Device actions to test
 */
const {
 GET_ANOTHER_PET_INFO
} = require('../../lib/constants').default

const initialState = new InitialState()

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function petReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  let host = getHost() + '/storage/image/';

  switch (action.type) {
    /**
     * ### set the platform in the state
     *
     */
    case GET_ANOTHER_PET_INFO:{
      console.log ( "reducer data : " + action.data);
      let resPet = action.data;
      let pet = {};
      pet.id = resPet.id;
      pet.name = resPet.name;
      pet.kind = resPet.kind;
      pet.birthDay = resPet.birthDay;
      pet.profileUrl= host + resPet.profileUrl;
      pet.userId = resPet.userId;
      state.pets.push(pet);
      return state.setIn(['syncIdx'], state.syncIdx + 1)
    }
  }
  return state;

}