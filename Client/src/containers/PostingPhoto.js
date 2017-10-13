'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as storyActions from '../reducers/story/storyActions'
import * as petActions from '../reducers/pet/petActions'

import { getHost } from '../lib/utils';

const BackendFactory = require('../lib/BackendFactory').default

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
    flex: 1,
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
      myPetList :state.pet.myPetList,
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
      title:'',
      content:''
    }
  },

  componentWillMount() {
    console.log ( " start ")
  },

  posting(content){
    console.log ( " petId : " + this.props.pet_id)
    console.log ( " url : " + this.props.url)
    console.log (" content : " + content )
    BackendFactory().createPosting(this.props.pet_id, this.props.url, content).then((res) => { 
      Actions.Tabbar();
     })
  },

  getPet(id) {
    let pets = this.props.pet.pets;
    if (pets) {
      for (let i = 0; i < pets.length; i++) {
        if (pets[i].id == id) return pets[i];
      }
    }
    let myPetList = this.props.pet.myPetList;
    if (myPetList) {

      for (let i = 0; i < myPetList.length; i++) {
        if (myPetList[i].id == id) return myPetList[i];
      }
    }
    this.props.actions.getAnotherPetInfo(id);
  },

  render() {

    console.log(" photo : " + this.props.url)
    console.log(" petId : " + this.props.pet_id)

    let content = ''

    let pet = this.getPet(this.props.pet_id);
    let url = getHost() + this.props.url;
    console.log ( " url : "+ url)

    if ( !pet) return ( <View> </View>)

    console.log (" rendering start")
    console.log (pet)
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

        <View style={styles.storyImage}>
          <Image style={styles.image} source={{ uri: url }} ></Image>

          <View style={styles.storyBottomView}>

            <View style={styles.row}>
             <View style={{ width: 250 }}>
                <TextInput style={{
                  marginTop: this.props.platform === 'ios' ? 30 : 0,
                  alignItems: 'center',
                  textAlign: 'center',
                  height: this.props.platform === 'ios' ? 15 : 50
                }}
                  onChangeText={(text) => content= text}
                  placeholder="" />
              </View>
              <TouchableOpacity onPress={() => this.posting(content)} >
                <Image style={styles.icon} source={require('../images/chat_send_button.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    );
  }
}))

