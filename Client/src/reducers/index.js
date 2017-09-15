
'use strict'
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import photo from './photo/photoReducer'
import story from './story/storyReducer'
import user from './user/userReducer'
import pet from './pet/petReducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  device,
  global,
  photo,
  story,
  user,
  pet,
})

export default rootReducer
