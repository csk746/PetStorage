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
  GET_ANOTHER_PET_INFO,
  GET_MY_PET_LIST
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

export function getAnotherPetInfo(petId) {
  console.log("[action]getPet : " + petId)

  return dispatch => {
    BackendFactory().getPet({
      petId: petId
    }).then(res => {
      console.log(res)
      dispatch({ type: GET_ANOTHER_PET_INFO, data: res });
    })
  }
}
export function getMyPetList() {

  return dispatch => {
    BackendFactory().getMyPetList({

    }).then(res => {
      dispatch({ type: GET_MY_PET_LIST, data: res })
    })
  }
}
