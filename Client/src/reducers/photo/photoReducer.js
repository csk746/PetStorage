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

import { getHost } from '../../lib/utils';

/**
 * Device actions to test
 */
const {
  GET_PHOTOLIST,
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
    case GET_PHOTOLIST:{

      let host = getHost();
      let requestUrl = host + '/storage/list/' +
        state.petId + '?page=' + state.page + '&size=' + state.maxSize + '&field=' + state.field + '&order=' + state.order;

      fetch(requestUrl, {
        method: "GET",
      }).then((response) => response.json()).
        then(responseData => {
          let urls = responseData.urlList;
          if ( urls !=null ){
            let urlList = state.urlList;
            for ( let i = 0; i < urls.length; i ++){
              urlList.push({ photo: host + urls[i] });
            }
            state.set('urlList', urlList);
            console.log ( state.urlList)
          }
        })
        .catch(err => {
          console.log(err)
        })  
      }

    case UPLOAD_PHOTO: {
    }
    case SAVE_PHOTO: {

      let photoList = state.photoList;
      photoList.push(action.payload)
      state.set('photoList', photoList)

      let petId = state.petId;
      console.log ( "petId : " + petId);

      let requestUrl = getHost() + '/storage/image/' + petId;
      let formData = new FormData();
      let imageUrl = action.payload  ;

      formData.append('image', {uri: imageUrl, type:'image/jpg', name:'1.jpg'})

      fetch(requestUrl, {
        method: "POST",
        headers: { "Accept": "multipart/form-data", "Content-Type": "multipart/form-data" },
        body: formData
      }).then((response) => response).
        then(responseData => {
          console.log(responseData)
        })
        .catch(err => {
          console.log(err)
        })  
      }

    }

  return state
}
