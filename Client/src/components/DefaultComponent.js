
'use strict'
/*
 * ## Imports
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
/**
 * Router
 */
import { Actions } from 'react-native-router-flux'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ListView,
  Image
}
  from 'react-native'

/**
 * Use device options so we can reference the Version
 *
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as petActions from '../reducers/pet/petActions'
import * as deviceActions from '../reducers/device/deviceActions'

function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(...authActions, ...globalActions, ...photoActions, ...petActions, dispatch)
  }
}

var styles = StyleSheet.create({
  popup: {
    width: 100,
    height: 100
  },
});
/**
 * ## Subview class
 */
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      id:0
    }
  },

  componentWillMount() {
    console.log("popup~~")
  },
  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );

  }
}))
