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

const Commnet = Record({
  id:0, 
  userId:0,
  text:'',
})

const Storys = Record({
  petId:0,
  text:'',
  title:'',
  iliked:false,
  comments: [],
  photoList : []
})

var InitialState = Record({
  storys:Storys=[],
  refresh:false,
  syncIdx:0
})

export default InitialState
