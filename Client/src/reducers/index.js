
'use strict'
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  device,
  global,
})

export default rootReducer
