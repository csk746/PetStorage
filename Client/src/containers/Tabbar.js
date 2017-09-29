'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as storyActions from '../reducers/story/storyActions'
import petActions from '../reducers/pet/petActions'
import Dimensions from 'Dimensions';
import Main from './Main'
import ManagePets from './ManagePets'

import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ListView,
  RefreshControl,
  Image
}
  from 'react-native'



const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 10,
    marginTop: 15,
    marginBottom: 15
  },
  Bottom: {
    flexDirection: 'column',
    flex: 10,
  },
  image: {
    flex: 1,
    width: 300,
    height: 300

  },

  takeButton: {
    width: 100,
    height: 100,
    bottom: 0
  },
  mainButton: {
    width: 70,
    height: 70
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  wPadding100: {
    height: 100,
  },
  wPadding: {
    width: 10
  },
  hPadding: {
    height: 10
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  storyImage: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  storyMain: {
    flex: 1,
    alignItems: 'flex-start',
  },
  input: {
    // flex:0.7,
    alignItems: 'center',
    textAlign: 'center',
  },
  scrollViewStyle: {
    flex: 1,
  },
  mainBottom: {
    marginLeft: 410,
    alignItems: 'flex-start',
  },
  storyHeaderView: {
    alignItems: 'flex-start',
    marginLeft: 50
  },
  storyBottomView: {
    alignItems: 'flex-start',
  },
  commentText: {
    fontSize: 12,
  },
  bottomRow: {
    position: 'absolute',
    // top: 30,
    backgroundColor: 'gray',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // height: 60

  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  petName: {
    fontSize: 25,
  },
  nameTitle: {
    marginLeft: 30
  },

  petIntroduce: {
    fontSize: 15,
  },
  overlay: {
    alignItems: 'center',
  },
  bottomOverlayGray: {
    // position: 'absolute',
    top: Dimensions.get('window').height - 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })

class Tabbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notTab: 'Main'
    };
    this.main = this.main.bind(this);
    this.managePets = this.managePets.bind(this);
  }
  componentWillMount() {
    this.setState({ nowTab: 'ManagePets' })
  }
  main() {
    this.setState({ nowTab: 'Main' })
  }
  managePets() {
    this.setState({ nowTab: 'ManagePets' })
  }

  render() {
    var content
    console.log(this.state.nowTab)
    if (this.state.nowTab == 'Main') {
      content = (<Main />)
    } else if (this.state.nowTab == 'ManagePets') {
      content = (<ManagePets />)
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4 }}>
          {content}
        </View>
        <View style={{ flex: 0.6, flexDirection: 'row', borderTopColor: 'rgba(0,0,0,1)', borderTopWidth: 1, justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity onPress={this.main} style={{ flex: 1, marginLeft: 10, alignItems: 'center' }}>
            <Image style={{ width: 60, height: 60 }} source={require('../images/list_button.png')} />
            <Text>타임라인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={{ flex: 1, marginLeft: 10, alignItems: 'center' }}>
            <Image style={{ width: 60, height: 60 }} source={require('../images/picture_button.png')} />
            <Text>카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.managePets} style={{ flex: 1, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 60, height: 60 }} source={require('../images/profile_button.png')} />
            <Text>프로필</Text>
          </TouchableOpacity>


        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Tabbar)
