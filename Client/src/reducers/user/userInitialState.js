/**
 * # deviceInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import immutable record
 */
  import {Record} from 'immutable'


var InitialState = Record({
  users:[],
  syncIdx: 0,
  myInfo:{}
})

export default InitialState
