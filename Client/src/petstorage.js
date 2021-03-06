'use strict'
/**
 *  # petstorage
 *  Snowflake ![petstorage](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
  Router,
  Scene,
  Actions,
  ActionConst,
  Modal
} from 'react-native-router-flux'

import {
  Provider
} from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
var I18n = require('react-native-i18n')
I18n.fallbacks = true
import Translations from './lib/Translations'
I18n.translations = Translations
import App from './containers/App'
import TakePicture from './containers/TakePicture'
import Main from './containers/Main'
import Login from './containers/Login'
import PetPhotos from './containers/PetPhotos'
import Profile from './containers/Profile'
import FriendPets from './containers/FriendPets'
import ManageFriends from './containers/ManageFriends'
import Tabbar from './containers/Tabbar'
import Subview from './containers/Subview'
import PetPhotoBrowser from './containers/PetPhotoBrowser'
import PostingPhoto from './containers/PostingPhoto'

import Reducers from './reducers'
import Icon from 'react-native-vector-icons/FontAwesome'
import { setPlatform, setVersion } from './reducers/device/deviceActions'
import { setStore } from './reducers/global/globalActions'
import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import PhotoInitialState from './reducers/photo/photoInitialState'
import StoryInitialState from './reducers/story/storyInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import UserInitialState from './reducers/user/userInitialState'
import PetInitialState from './reducers/pet/petInitialState'

import pack from '../package'
var VERSION = pack.version

export default function (platform) {

  const states = {
    auth: new AuthInitialState(),
    photo: new PhotoInitialState(),
    story: new StoryInitialState(),
    user: new UserInitialState(),
    pet: new PetInitialState(),
    device: new DeviceInitialState().set('platform', platform).set('version', pack.version),
  }

  const store = createStore(Reducers, states, applyMiddleware(ReduxThunk))

  const scenes = Actions.create(
    <Scene key='root' hideNavBar>

      <Scene key='Login'
        component={Login}
        type={ActionConst.RESET}
        initial
      />
      <Scene key='Tabbar'
        component={Tabbar}
      />
      <Scene key='Main'
        component={Main}
      />
      <Scene key='PetPhotos'
        component={PetPhotos}
      />
      <Scene key='Profile'
        component={Profile}
      />

      <Scene key='FriendPets'
        component={FriendPets}
      />
      <Scene key='ManageFriends'
        component={ManageFriends}
      />

      <Scene key='Subview'
        component={Subview} />

      <Scene key='TakePicture'
        title={'TakePicture'}
        component={TakePicture} />

      <Scene key='PetPhotoBrowser'
        title={'PetPhotoBrowser'}
        component={PetPhotoBrowser} />


      <Scene key='PostingPhoto'
        component={PostingPhoto} />

    </Scene>
  )

  let PetStorage = React.createClass({
    render() {
      return (

        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }} scenes={scenes}>
          </Router>
        </Provider>
      )
    }
  })

  AppRegistry.registerComponent('petstorage', () => PetStorage)

  return PetStorage
}
