'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'

import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Image
}
  from 'react-native'

import NavBar from './common/NavBar'
import BottomBar from './common/BottomBar'


const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  image: {
    height: 283,
    width: 283
  },

  takeButton: {
    height:100,
    width:100,
    bottom:0
  },
  mainButton: {
    height:100,
    width:100
  },
  icon: {
    height:40,
    width:40
  },
  profileImage : {
    height:70,
    width:70
  },

  wPadding100:{
    width:100
  },
  wPadding:{
    width:10
  },
  hPadding:{
    height:10
  },
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: 200,
    height: 80,
  },
  storyMain :{
    flex:1,
    alignItems:'center',
    //paddingTop:30
  },
  input: {
    alignItems: 'center',
    textAlign: 'center',
    width:530,
    height:50,
  },
  scrollViewStyle:{
    flex:1,
    height:600
  },
  mainBottom:{
    height:100,
    marginLeft:410,
    alignItems: 'flex-start',
  },
  storyHeaderView: {
    width: 600,
    height: 80,
    alignItems: 'flex-start',
  },
  storyBottomView: {
    width: 600,
    height: 100,
    alignItems: 'flex-start',
  },
  commentText:{
    fontSize:12,
  },
  bottomRow :{
    flexDirection:'row',
    height:100,
    alignItems:'flex-start',
    //flex:1,
    //flexWrap:'nowrap',
    //padding:30
  },


  row :{
    flexDirection:'row',
    height:70,
    alignItems:'flex-start',
    //flex:1,
    //flexWrap:'nowrap',
    //padding:30
  },

  petName : {
    fontSize:25,
  },

  petIntroduce: {
    fontSize:15,
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  bottomOverlayGray: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

class Main extends Component {
  constructor() {
    super();

    this.gallary = this.gallary.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.renderStoryItem = this.renderStoryItem.bind(this);
  }

  gallary() {
    Actions.PetPhotoBrowser({
    })
  }
  takePicture() {
    Actions.TakePicture({
    })
  }
  profile() {
    Actions.Login({
    })
  }

  renderStoryItem(idx){
    return (
      <View style={styles.storyMain}>

        <View style={styles.storyHeaderView}>
          <View style={styles.row}>
            <Image style={styles.profileImage} source={require('../images/miho/miho_profile.jpg')} />
            <View style={styles.wPadding} />
            <View >
              <Text style={styles.petName} >미호</Text>
              <Text style={styles.petIntroduce} >세상에서 가장 사랑스러운 강아지 </Text>
            </View>
          </View>
        </View>

        <View style={styles.hPadding}/>
        <View style={styles.hPadding}/>
        <Image  source = {require('../images/miho/miho_1.png')}/>

        <View style={styles.hPadding} />
        <View style={styles.storyBottomView}>
          <View style={styles.row}>
            <Image style={styles.icon} source={require('../images/like_button.png')} />
            <TextInput style={styles.input}
              placeholder="미호 귀엽다" />
            <Image style={styles.icon} source={require('../images/chat_send_button.png')} />
          </View>
        </View>
 
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewStyle}>
          {this.renderStoryItem(0)}
          {this.renderStoryItem(1)}
        </ScrollView>

        <View style={[styles.overlay, styles.bottomOverlayGray]}>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={this.gallary} >
            <Image style={styles.mainButton} source={require('../images/list_button.png')} />
            </TouchableOpacity>
            <View style={styles.wPadding100} />
            <View style={styles.wPadding} />
            <View style={styles.wPadding} />
            <TouchableOpacity onPress={this.takePicture} >
            <Image style={styles.takeButton} source={require('../images/picture_button.png')} />
            </TouchableOpacity>
            <View style={styles.wPadding100} />
            <View style={styles.wPadding} />
            <View style={styles.wPadding} />
            <TouchableOpacity onPress={this.profile} >
            <Image style={styles.mainButton} source={require('../images/profile_button.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
        story: {
          storys:state.story.storys
        },
        photo:{
            maxSize:state.photo.maxSize,
            order:state.photo.order,
            field:state.photo.field,
            page:state.photo.page,
            urlList:state.photo.urlList,
            photoList:state.photo.photoList
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions}, dispatch)
    }
}


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
