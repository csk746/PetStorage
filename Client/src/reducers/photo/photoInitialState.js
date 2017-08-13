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

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  petId:1,
  photoList:[]
})

export default InitialState
