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
    width: 50,
    height: 50,
    bottom: 0
  },
  mainButton: {
    width: 50,
    height: 50
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
  // commentText: {
  //   fontSize: 12,
  // },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 60
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  commentUser: {
    fontSize: 10,
  },
  commentText: {
    width: 265,
    fontSize: 10,
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

function mapStateToProps(state) {
  return {
    platform: state.device.platform,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      },
      myInfo:state.auth.myInfo
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    },
    pet: {
      pets: state.pet.pets,
      requestPets: state.pet.requestPets
    },
    user: {
      users: state.user.users
    },
    story: {
      page: state.story.page,
      initStorys: state.story.initStorys,
      storys: state.story.storys,
      refresh: state.story.refresh
    },
    photo: {
      maxSize: state.photo.maxSize,
      order: state.photo.order,
      field: state.photo.field,
      page: state.photo.page,
      urlList: state.photo.urlList,
      photoList: state.photo.photoList
    },
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}


const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })



export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({

  getInitialState() {
    return {
      // refresh: this.props.story.refresh,
      storys: this.props.story.storys,
      refresh: this.props.story.refresh,
      page: this.props.story.page,
      comment: ''
    }
  },

  getNextStorys() {

    if (this.state.refresh) return;

    this.setState({ page: this.state.page + 1 });
    this.getStoryList(this.state.page);
  },

  componentDidMount() {
    this.setState({ refresh: false });
  },

  componentWillMount() {
    this.getStoryList(this.state.page);
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  },

  getStoryList(page) {
    this.props.actions.getStory(page, 10, 'createdAt', 'desc');
  },
  gallary() {
    //Actions.PetPhotoBrowser({
    //})
  },
  takePicture() {
    Actions.TakePicture({
    })
  },
  profile() {
    Actions.Login({
    })

  },
  addComment(story, comment) {
    story.comments.push({ userName: this.props.auth.myInfo.name , content: comment });
    this.props.actions.addComment(story, comment);
  },
  likeStory(story) {
    story.ilike = !story.ilike;
    this.props.actions.iLikeStory(story.id);
  },

  _onRefresh() {
    this.state.storys.splice(0, this.state.storys.length)

    this.setState({ refresh: true });
    this.setState({ page: 0 });
    this.getStoryList(0);
  },

  renderComment(comment) {
    if (!comment) return null;
    return (
      <View style={styles.row}>
        <Text style={styles.commentUser} >{comment.userName} : </Text>
        <Text style={styles.commentText} >{comment.content}</Text>
      </View>
    )

  },

  renderStoryItem(story) {

    console.log(" story : " + story)
    if (!story) return null;

    if (!story.comments) {
      story.comments = [];
      story.comments.push({ 'text': '' })
    }

    var commentSource = ds.cloneWithRows(story.comments);

    let pet = story.pet;
    let comment = '';
    console.log ( " ilike : " + story.ilike)
    console.log(" storyUrl :  " + story.urlList[0])

    return (
      <View style={styles.container}>
        <View style={styles.storyMain}>

          <View style={styles.storyHeaderView}>
            <View style={styles.row}>
              <Image style={{
                width: 40,
                height: 40,
                borderRadius: this.props.platform === 'ios' ? 20 : 25,
              }} source={{ uri: pet.profileUrl }} ></Image>
              <View style={styles.wPadding} />
              <View >
                <Text style={styles.petName} >{pet.name}</Text>
                <Text style={styles.petIntroduce} >{pet.kind} </Text>
              </View>
            </View>
          </View>

        </View>
        <View style={styles.hPadding} />
        <View style={styles.hPadding} />

        <View style={styles.storyImage}>
          <Image style={styles.image} source={{ uri: story.urlList[0] }} ></Image>

          <View style={styles.hPadding} />
          <View style={styles.hPadding} />

          <ListView
            enableEmptySections={true}
            dataSource={commentSource}
            renderRow={this.renderComment}
          ></ListView>

          <View style={styles.storyBottomView}>

            <View style={styles.row}>

              <TouchableOpacity onPress={() => this.likeStory(story)} >
                <Image style={styles.icon} source={story.ilike ? require( '../images/heart_fill.png' ) : require( '../images/heart_notfill.png' )} />
              </TouchableOpacity>
              <View style={{ width: 250 }}>
                <TextInput style={{
                  marginTop: this.props.platform === 'ios' ? 30 : 0,
                  alignItems: 'center',
                  textAlign: 'center',
                  height: this.props.platform === 'ios' ? 15 : 50
                }}
                  onChangeText={(text) => comment = text}
                  placeholder="" />
              </View>
              <TouchableOpacity onPress={() => this.addComment(story, comment)} >
                <Image style={styles.icon} source={require('../images/chat_send_button.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    );
  },


  render() {
    console.log ( this.props.auth.myInfo)
    console.log ( " myInfo name : " + this.props.auth.myInfo.id)

    var data = ds.cloneWithRows(this.state.storys);
    return (
      // <View style={styles.Bottom}>

      <ListView
        enableEmptySections={true}
        dataSource={data}
        renderRow={this.renderStoryItem}
        refreshControl={
          <RefreshControl
            tintColor="transparent"
            colors={['transparent']}
            style={{ backgroundColor: 'transparent' }}
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
          >
          </RefreshControl>
        }
        onEndReached={() => {
          this.getNextStorys();
        }}
      >

      </ListView>

    );
  }
}))

