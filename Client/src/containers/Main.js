'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as storyActions from '../reducers/story/storyActions'
import * as petActions from '../reducers/pet/petActions'

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

import NavBar from './common/NavBar'
import BottomBar from './common/BottomBar'


const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 10
  },
  image: {
    flex:1,
    width:500,
    height:500
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
    width:50,
    height:50
  },
  profileImage : {
    width:50,
    height:50
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
    //paddingTop:30
  },
  storyMain :{
    flex:1,
    alignItems:'flex-start',
    //alignItems:'center',
    //paddingTop:30
  },
  input: {
    flex:0.8,
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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })

class Main extends Component {

  constructor() {
    super();

    this.state = {
      refreshing: false,
      page:0,
    };

    this.gallary = this.gallary.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.renderStoryItem = this.renderStoryItem.bind(this);
    this.likeStory = this.likeStory.bind(this);
    this.getStoryList = this.getStoryList.bind(this);
    this.getPet = this.getPet.bind(this);
  }

  _onRefresh() {
    console.log ( " refresh~~~~~~")
    this.setState({refreshing: true});
    this.setState({page: (this.state.page+1)});

    this.getStoryList(this.state.page);

  }

  componentWillMount() {
    this.getStoryList(this.state.page);
  }

  getStoryList(page) {
    this.props.actions.getStory(page, 10, 'createdAt', 'desc' ) ;
  }
  gallary() {
    //Actions.PetPhotoBrowser({
    //})
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

  getPet(id){
    console.log ( "getPet id : " + id)
    let pets = this.props.pet.pets ; 
    if ( pets != null){ 
      for ( let i =0 ;i < pets.length; i ++){
        if ( pets[i].id == id) return pets[i];
      }
    }
    console.log ( " getAnotherPetInfo : "  + id)
    this.props.actions.getAnotherPetInfo(id);
    return null ; 
  }

  renderStoryItem(story){

    if ( story == null) return ; 

    console.log ( "image url : " + story.photoList[0])

    let pet = null;
    if (story.petId != null) {
      pet = this.getPet(story.petId);
    }

    if  ( pet == null) return ; 

    return (
      <View style={styles.container}>
      <View style={styles.storyMain}>

        <View style={styles.storyHeaderView}>
          <View style={styles.row}>
          <Image style={styles.profileImage} source={{uri:pet.profileUrl}} ></Image>
            <View style={styles.wPadding} />
            <View >
              <Text style={styles.petName} >{pet.name}</Text>
              <Text style={styles.petIntroduce} >{pet.kind} </Text>
            </View>
          </View>
        </View>

      </View>
        <View style={styles.hPadding}/>
        <View style={styles.hPadding}/>

        <View style={styles.storyImage}>
          <Image style={styles.image} source={{uri:story.photoList[0]}} ></Image>

          <View style={styles.hPadding} />
          <View style={styles.storyBottomView}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.likeStory(story.id)} >
                <Image style={styles.icon} source={require('../images/like_button.png')} />
              </TouchableOpacity>
              <TextInput style={styles.input}
                placeholder="미호 귀엽다" />
              <TouchableOpacity onPress={() => this.addComment(story.id, "댓글 테스트")} >
              <Image style={styles.icon} source={require('../images/chat_send_button.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
 
    );
  }


  render() {

    var data  = ds.cloneWithRows(this.props.story.storys);

    return (
      <View style={styles.container}>

<ScrollView style={styles.scrollViewStyle}>
     <ListView
        dataSource={data}
        renderRow={this.renderStoryItem}>
        refreshControl={
          <RefreshControl
            style={{backgroundColor:'black'}}
            colors={["#159688"]}
            progressBackgroundColor="transparent"
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}>
            </RefreshControl>
        }
        
      </ListView>
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
       pet: {
          pets:state.pet.pets
        },
       user: {
          users:state.user.users
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
        actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions}, dispatch)
    }
}


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
