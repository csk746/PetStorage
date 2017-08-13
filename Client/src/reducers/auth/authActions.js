'use strict'

const {
    SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE

} = require('../../lib/constants').default

/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default
import { appAuthToken } from '../../lib/AppAuthToken'
import { Actions } from 'react-native-router-flux'

import $ from 'jquery';

import { getHost } from '../../lib/utils';

const _ = require('underscore')

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}
export function saveSessionToken(json) {
  return appAuthToken.storeSessionToken(json)
}
/**
 * ## Login
 * @param {string} id - user's id
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */

export function login(id, password) {
  return dispatch => {
    console.log('actions..')
    dispatch(loginRequest())
    console.log('api host 주소 : ', getHost());
     return $.ajax({
         contentType: 'application/json',
         type: 'POST',
         url: getHost() + '/user/login',
         data: JSON.stringify({
             loginId : id,
             password : password
         }),
         success: function() {
         }
     });

    return saveSessionToken({ id: id, password: password }).then(function () {
      dispatch(loginSuccess({ success: true }));
      Actions.Main();

    })
  }
}

