/**
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  GET_PHOTOLIST,
  SAVE_PHOTO,
  UPLOAD_PHOTO
} = require('../../lib/constants').default

export function getPhotoUrl(){
  return {
    type: GET_PHOTOLIST,
    payload:null
  }
}
export function setPhoto(photo){
  return {
    type: SAVE_PHOTO,
    payload:photo 
  }
}

