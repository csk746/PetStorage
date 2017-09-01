
'use strict'
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import photo from './photo/photoReducer'
import story from './story/storyReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  device,
  global,
  photo,
  story,
})

export default rootReducer
