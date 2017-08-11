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
    justifyContent: 'center',
    flex: 1
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
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
  constructor(args) {
    console.log('constructor..')
    super(args);
    this.login = this.login.bind(this);

    this.state = {
      id: '',
      password: ''
    };
  }
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
  login() {
    console.log(this.state);
    this.props.actions.login(this.state.id, this.state.password);
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="아이디"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10
          }}
          onChangeText={(text) => this.setState({ id: text })}
          value={this.state.id}

        />
        <TextInput
          placeholder="패스워드"
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10
          }}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />
        <Button style={styles.button}
          onPress={this.login}
        >로그인</Button>
      </View>
    )
  }
}
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
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login)
