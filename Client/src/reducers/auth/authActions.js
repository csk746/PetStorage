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

const _ = require('underscore')

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

export function saveSessionToken(json) {
  return appAuthToken.storeSessionToken(json)
}

export function login(id, password) {
  return dispatch => {
    dispatch({type : LOGIN_REQUEST});

    BackendFactory()
        .login({
            loginId:id,
            password:password
        })
        .then(response => {
            console.log(response)
            dispatch({type : LOGIN_SUCCESS});
        });


    // _fetch(getHost() + '/user/login', {
    //   method: "POST",
    //   headers: { 'Asscept': 'application/json', 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     loginId: id,
    //     password: password
    //   })
    // }).then((response) => response.json()).then(responseData => {
    //   console.log(responseData)
    //   if (responseData.token != null) {
    //     Actions.Main();
    //   }
    // })


    // return saveSessionToken({ id: id, password: password }).then(function () {
    //   dispatch(loginSuccess({ success: true }));
    //   Actions.Main();
    //
    // })
  }
}

