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
  SET_PET_PROFILE_PHOTO,
  ALREAY_REQUEST_ANOTHER_PET_INFO,
  GET_ANOTHER_PET_INFO,
  REQUESTED_GET_MY_PET_LIST,
  RESPONSE_GET_MY_PET_LIST
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';

var requestPets = [0,];


export function setPetProfile(petId, url) {
  console.log ( "action  petId : " + petId + " url : " + url)
  BackendFactory().setPetProfile(petId, url).then(res => {
    console.log(res)
    dispatch({ type: SET_PET_PROFILE_PHOTO, data: res });
  })

}

export function getAnotherPetInfo(petId) {

  for (let i = 0; i < requestPets.length; i++) {
    if (requestPets[i] == petId) {
      return {
        type: ALREAY_REQUEST_ANOTHER_PET_INFO
      }
    }
  }

  console.log("[action]getPet : " + petId)

  requestPets.push(petId);

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

export function actionRequestGetPetPhotoList() {
  return {
    type: REQUESTED_GET_PET_PHOTO_LIST
  }
}

export function actionResponseGetPetPhotoList(data) {
  return {
    type: RESPONSE_GET_PET_PHOTO_LIST,
    data
  }
}

export function getMyPetList() {
  return dispatch => {
    dispatch(actionRequestGetMyPetList())
    BackendFactory().getMyPetList().then(res => {
      dispatch(actionResponseGetMyPetList(res))
    })
  }
}

export function getPetPhotoList(petID) {
  return dispatch => {
    dispatch(actionRequestGetPetPhotoList())
    BackendFactory().getUrlList(petId).then(res => {
      dispatch(actionResponseGetPetPhotoList(res))
    })
  }
}
