/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * Router
 */
import { Actions } from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */

/**
 * The components needed from React
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput
}
  from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')
const BackendFactory = require('../lib/BackendFactory').default
/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
    // marginTop:520
  },
  picture: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 40,
    marginRight: 40,
    // position:'absolute',
    marginTop: 520
    // marginBottom:10
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
class Login extends Component {

  componentWillMount() {
    BackendFactory().test()
  }

  handlePress() {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }
  takePicture() {
    Actions.TakePicture({
      title: 'TakePicture'
      // you can add additional props to be passed to Subview here...
    })
  }
  goToMain() {
    Actions.Main({
      // title: 'Main'
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>로그인화면</Text>
        {/* <Button></Button> */}
        <Text>ID</Text><TextInput></TextInput>
        <Text>PW</Text><TextInput></TextInput>
        <Button onPress={this.goToMain}>로그인</Button>

        <View>

          {/* <Button style={styles.button} onPress={this.handlePress.bind(this)}>
            {I18n.t('Main.navigate')}
          </Button> */}

        </View>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login)
