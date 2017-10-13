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
  ALREAY_REQUEST_ANOTHER_PET_INFO,
 GET_ANOTHER_PET_INFO,
 SET_PET_PROFILE_PHOTO,
  REQUESTED_GET_MY_PET_LIST,
  RESPONSE_GET_MY_PET_LIST
} = require('../../lib/constants').default

const initialState = new InitialState()
import DataStore from '../../lib/DataStore'
/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function petReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  let host = getHost() ;

  switch (action.type) {
    /**
     * ### set the platform in the state
     */
    case ALREAY_REQUEST_ANOTHER_PET_INFO: {
      console.log ( " alreay request pet - reducer");
      return state ; 
    }
    case   SET_PET_PROFILE_PHOTO:{
      console.log ( " pet profile photo reducer ")
    }
    
    case GET_ANOTHER_PET_INFO: {
      console.log("reducer data : " + action.data);
      let pet = action.data;

      if ( pet.profile){
        console.log("pet-profile : " + pet.profile)
        pet.profileUrl = host + pet.profile.url;
        console.log("pet-profileUrl : " + pet.profile.url)
      }

      state.pets.push(pet);
      console.log("petReducer end");
      return state.setIn(['syncIdx'], state.syncIdx + 1)
    }
    case REQUESTED_GET_MY_PET_LIST:
      return state.setIn(['refresh'], true)
    case RESPONSE_GET_MY_PET_LIST: {
      console.log('list : ' + action.data)
      let pets = action.data;

      if (pets) {
        for (let i = 0; i > pets.length; i++) {
          if (pets[i].profile) {
            pets[i].profileUrl = host + pets[i].profile.url;
            console.log( " profile : " +  pets[i].profileUrl)
          }
        }
      }
      return state.setIn(['myPetList'], pets) .setIn(['refresh'], false)
    }
  }
  return state;

}