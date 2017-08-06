'use strict'

import store from 'react-native-simple-store'
import { TOKEN_KEY } from './config'

//리덕스를 쓰지 않고 간편하게 중앙 store을 쓸 수 있는 simple store입니다. key value 형식으로 저장하고 가져올 수 있습니다.
export class Token {
  constructor(KEY) {
    this.TOKEN_KEY = KEY;
  }

  storeToken(token) {
    return store.save(this.TOKEN_KEY, token)
  }

  getToken() {
    return store.get(this.TOKEN_KEY)
  }

  deleteToken() {
    return store.delete(this.TOKEN_KEY)
  }
}

export let MyToken = new Token(TOKEN_KEY)

var TUTORIAL_KEY = 'TUTORIAL_KEY'
var SURVEY_KEY = 'SURVEY_KEY'
var INSTALL_TIME_KEY = 'INSTALL_TIME_KEY'

export class SimpleStore {
  saveTutorialDone() {
    return store.save(TUTORIAL_KEY, true)
  }

  getIsTutorialDone() {
    return store.get(TUTORIAL_KEY)
  }

  saveSurveyDone() {
    return store.save(SURVEY_KEY, true)
  }

  getIsSurveyDone() {
    return store.get(SURVEY_KEY)
  }

  saveInstallTime() {
    return store.save(INSTALL_TIME_KEY, new Date())
  }

  getInstallTime() {
    return store.get(INSTALL_TIME_KEY)
  }
}

export let MySimpleStore = new SimpleStore()
