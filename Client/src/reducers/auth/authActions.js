'use strict'

const {
    SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  SET_DEFAULT_PET,
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

export function setDefaultPet(petId ) {
  console.log ( "action setDefaultPet  petId : " + petId )

  return dispatch => {
    BackendFactory().setDefaultPet(petId).then(res => {
      console.log(res)
      dispatch({ type: SET_DEFAULT_PET, data: res });
    })
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
             //var res = JSON.parse(response);
             console.log(response);
            if(response.token){
                dispatch({type : LOGIN_SUCCESS, userInfo : response});
                // saveSessionToken({ authToken : response.token });
            }else{
                dispatch({type : LOGIN_FAILURE});
            }
        });
  }
}

