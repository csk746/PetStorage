'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as storyActions from '../reducers/story/storyActions'

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
    flex: 10,
    marginTop:15,
    marginBottom:15
  },
  Bottom: {
    flexDirection: 'column',
    flex: 10,
  },
  image: {
    flex:1,
    width:300,
    height:300
  },

  takeButton: {
    width:50, 
    height:50,
    bottom:0
  },
  mainButton: {
    width:50, 
    height:50
  },
  icon: {
    width:22,
    height:22
  },
  profileImage : {
    width:40,
    height:40,
    borderRadius: 25,
  },

  wPadding100:{
    height:100,
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
  },
  storyImage: {
    flex: 1,
    alignItems: 'center',
    marginLeft:30,
    marginRight:30
    //paddingTop:30
  },
  storyMain :{
    flex:1,
    alignItems:'flex-start',
    //alignItems:'center',
    //paddingTop:30
  },
  input: {
    flex:0.7,
    alignItems: 'center',
    textAlign: 'center',
  },
  scrollViewStyle:{
    flex:1,
  },
  mainBottom:{
    marginLeft:410,
    alignItems: 'flex-start',
  },
  storyHeaderView: {
    alignItems: 'flex-start',
    marginLeft: 50
  },
  storyBottomView: {
    alignItems: 'flex-start',
  },
  commentText:{
    fontSize:12,
  },
  bottomRow :{
    flexDirection:'row',
    alignItems:'flex-start',
    height:60
    //flex:1,
    //flexWrap:'nowrap',
    //padding:30
  },

  row :{
    flexDirection:'row',
    alignItems:'flex-start',
    //flexWrap:'nowrap',
    //padding:30
  },

  petName : {
    fontSize:25,
  },
  nameTitle : {
    marginLeft:30
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
    this.likeStory = this.likeStory.bind(this);
    this.getStoryList = this.getStoryList.bind(this);
  }

  getStoryList(page) {
    this.props.actions.getStory(page, 10, 'createdAt', 'desc' ) ;
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
  addComment(id, comment){
    this.props.actions.addComment(id, comment ) ;
  }
  likeStory(id){
    this.props.actions.iLikeStory(id);
  }

  renderStoryItem(idx){
    return (
      <View style={styles.container}>
      <View style={styles.storyMain}>

        <View style={styles.storyHeaderView}>
          <View style={styles.row}>
            <Image style={styles.profileImage} source={require('../images/miho/miho_profile.jpg')} />
            <View style={styles.wPadding} />
            <View>
              <Text style={styles.petName} >미호</Text>
              <Text style={styles.petIntroduce} >세상에서 가장 사랑스러운 강아지 </Text>
            </View>
          </View>
        </View>

      </View>
        <View style={styles.hPadding}/>
        <View style={styles.hPadding}/>

        <View style={styles.storyImage}>
          <Image style={styles.image} source={require('../images/miho/miho_1.png')} />

          <View style={styles.hPadding} />
          <View style={styles.storyBottomView}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.likeStory(idx)} >
                <Image style={styles.icon} source={require('../images/like_button.png')} />
              </TouchableOpacity>
              <TextInput style={styles.input}
                placeholder="미호 귀엽다" />
              <TouchableOpacity onPress={() => this.addComment(idx, "댓글 테스트")} >
              <Image style={styles.icon} source={require('../images/chat_send_button.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
 
    );
  }

  render() {
    this.getStoryList(0);

    return (
      <View style={styles.Bottom}>
        <ScrollView style={styles.scrollViewStyle}>
          {this.renderStoryItem(0)}
          {this.renderStoryItem(1)}
          {this.renderStoryItem(2)}
          {this.renderStoryItem(3)}
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
        platform: state.device.platform,
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
        actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions}, dispatch)
    }
}


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
