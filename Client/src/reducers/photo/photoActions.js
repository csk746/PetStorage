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
  GET_PHOTOLIST,
  TAKE_PHOTO,
  SAVE_PHOTO,
  UPLOAD_PHOTO
} = require('../../lib/constants').default

import { getHost } from '../../lib/utils';


export function getPhotoUrl(petId, page, maxSize, field, order) {

  return dispatch => {
    console.log(" action getPhotoUrl ()")
    let param = 'page=' + page + '&size=' + maxSize + '&field=' + field + '&order=' + order;

    let host = getHost();

    BackendFactory().getUrlList({
      petId: petId,
      param: param
    }).then(res => {
      let urls = res.urlList;
      if (urls != null) {
      let tmpUrlList =[];
        for (let i = 0; i < urls.length; i++) {
          tmpUrlList.push({ photo: host + urls[i] });
        }
        dispatch({ type: GET_PHOTOLIST, urlList: tmpUrlList});
      }
    });
 }
}

export function takePhoto(petId, photo) {

  return dispatch => {
    console.log(" action takePhoto()")
      dispatch({ type: TAKE_PHOTO, url: photo });
  }
}


export function savePhoto(petId, photo) {

  return dispatch => {
    console.log(" action savePhoto()")
    BackendFactory().uploadPhoto({
      petId: petId,
      url: photo
    }).then(res => {
      dispatch({ type: SAVE_PHOTO, url: photo });
    });
  }
}

