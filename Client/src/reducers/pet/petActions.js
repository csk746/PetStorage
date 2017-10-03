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
  REQUESTED_GET_MY_PET_LIST,
  RESPONSE_GET_MY_PET_LIST
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

export function actionRequestGetMyPetList() {
  return {
    type: REQUESTED_GET_MY_PET_LIST
  }
}

export function actionResponseGetMyPetList(data) {
  return {
    type: RESPONSE_GET_MY_PET_LIST,
    data
  }
}

export function getMyPetList() {
  return dispatch => {
    dispatch(actionRequestGetMyPetList())
    BackendFactory().getMyPetList().then(res => {
      console.log('Action : ' + res)
      dispatch(actionResponseGetMyPetList(res))
    })
  }
}
