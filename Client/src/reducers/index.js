
'use strict'
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import photo from './photo/photoReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  device,
  global,
  photo,
})

export default rootReducer
