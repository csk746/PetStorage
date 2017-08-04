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
import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'
/**
 * The Header will display a Image and support Hot Loading
 */

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View,
  TouchableOpacity,
  Text
}
from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
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
function mapDispatchToProps (dispatch) {
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
    marginTop:520
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
class Main extends Component {

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }
  takePicture () {
    Actions.TakePicture({
      title: 'TakePicture'
      // you can add additional props to be passed to Subview here...
    })
  }

  render () {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }
    return (
      <View style={styles.container}>
        <View>
          <NavigationBar
          title={titleConfig}
          leftButton={
            <TouchableOpacity onPress = {()=>{Actions.pop()}}>
              <Text>뒤로가기</Text>
            </TouchableOpacity>
          } />
          <Text>마이페이지 영역</Text>
          {/* <Button style={styles.button} onPress={this.handlePress.bind(this)}>
            {I18n.t('Main.navigate')}
          </Button> */}
          {/* <Button style={styles.picture} onPress={this.takePicture.bind(this)}>
            사진찍기 버튼
          </Button> */}
        </View>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
