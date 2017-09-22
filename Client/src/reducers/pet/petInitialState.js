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

const Pets = Record({
  id:0,
  name:'',
  kind:'',
  birthDay:'',
  profileUrl:'',
  userId:0
})

var InitialState = Record({
  syncIdx:0,
  pets:Pets=[]
})

export default InitialState
