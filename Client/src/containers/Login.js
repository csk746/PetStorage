'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Platform
}
  from 'react-native'

const Button = require('apsl-react-native-button')


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image : {
    marginBottom:10,
    flex:1.6,
    height:80,
    width:160
  },
  empty1 : {
    flex:1
  },
  empty05 : {
    flex:0.5
  },
  wrapperId_ios : {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width:200,
    height: 40,
  },
  wrapperPassword_ios : {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width:200,
    height: 40,
    marginTop:30
  },
  wrapperId_and : {
    // borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width:200,
    height: 40,
  },
  wrapperPassword_and : {
    // borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width:200,
    height: 40,
    marginTop:30
  },
  input : {
    // borderBottomWidth: 10,
    alignItems: 'center',
    textAlign: 'center',
    flex:0.5
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth:1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    // flex:1
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginLeft: 10,
    marginRight: 10,
    // flex:1
  }
})

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class Login extends Component {
  constructor(args) {
    console.log('constructor..')
    super(args);
    this.login = this.login.bind(this);

    this.state = {
      loginId : '',
      password : ''
    };
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {

      if(this.props != nextProps){
          console.log(nextProps);
          console.log(this.props);

          if(nextProps.auth.form.isFetching){
              Actions.Main();
          }
      }
      return true;
  }

  login() {
    console.log(this.state);
    this.props.actions.login(this.state.id, this.state.password);
  }

  render() {
    return (
      
      <View style={styles.container}>
        <View style={styles.empty05}/>
        <View style={styles.empty05}/>
        <Image style={styles.image} source = {require('../images/main.png')}/>
         <View style={styles.empty05}/>
          <View style={{
            borderBottomWidth: this.props.device.platform === 'ios' ? 1:0,
            borderBottomColor: 'gray',
            width:200,
            height: 40,
          }}> 
        <TextInput
          placeholder="ID"
          style={styles.input}
          onChangeText={(text) => this.setState({ id: text })}
          value={this.state.id}
        />
         </View> 
         <View style={{
            borderBottomWidth: this.props.device.platform === 'ios' ? 1:0,
            borderBottomColor: 'gray',
            width:200,
            height: 40,
         }}> 
        <TextInput
          placeholder="PASSWORD"
          style={styles.input}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
          secureTextEntry={true}
        />
        </View>
        <View style={{flex:0.2}}/>
        <Button style={styles.signInButton}
          onPress={this.login}
        >Sign In</Button>
        <Button style={styles.signUpButton}
          onPress={this.login}
        >Sign Up</Button>
        <View style={styles.empty1}/>
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
    },
    device: {
      platform: state.device.platform
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
