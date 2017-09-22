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

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refresh:this.props.story.refresh,
      page:0
    };

    this.gallary = this.gallary.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.renderStoryItem = this.renderStoryItem.bind(this);
    this.likeStory = this.likeStory.bind(this);
    this.getStoryList = this.getStoryList.bind(this);
    this.getPet = this.getPet.bind(this);
    this.getNextStorys = this.getNextStorys.bind(this);
  }
  getNextStorys() {
    console.log("refresh : " + this.state.refresh)
    console.log( "getNextStorys ~ page : " + this.state.page)
    this.setState({refresh: true});
    this.getStoryList(this.state.page);
    //this.setState({page: (this.state.page+1)});
  }

  componentDidMount() {
    this.setState({refresh: false});
  }

  componentWillMount() {
    this.getStoryList(this.state.page);
  }
  shouldComponentUpdate(nextProps, nextState) {
    //console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true ; 
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
              <Image style={<styles className="icon"></styles>} source={require('../images/like_button.png')} />
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
    console.log ( "render function : (refresh ) " + this.state.refresh)
    return (
      <View style={styles.Bottom}>

        <ScrollView style={styles.scrollViewStyle}>
          <ListView
            dataSource={data}
            renderRow={this.renderStoryItem}
            refreshControl={
              <RefreshControl
                tintColor="transparent"
                colors={['transparent']}
                style={{ backgroundColor: 'transparent' }}
                refreshing={this.state.refresh}
                onRefresh={() =>
                  this.getNextStorys()
                }>
              </RefreshControl>
            }
            >

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
       pet: {
          pets:state.pet.pets
        },
       user: {
          users:state.user.users
        },
        story: {
          storys:state.story.storys,
          refresh:state.story.refresh
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
