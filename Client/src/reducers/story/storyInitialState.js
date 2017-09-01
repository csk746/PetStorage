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
const Pet = Record({
  id:0,
  name:'',
  profileUrl:''
})

const Storys = Record({
  pet: new Pet(),
  photoList : []
})


/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  storys:Storys=[]
})

export default InitialState
