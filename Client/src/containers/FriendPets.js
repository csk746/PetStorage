'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as storyActions from '../reducers/story/storyActions'
import * as petActions from '../reducers/pet/petActions'
import NavigationBar from 'react-native-navbar'
import NavBar from './common/NavBar'
import NavBarBack from '../components/NavBarBack'

import { getHost } from '../lib/utils';
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
  Image,
  Button
}
  from 'react-native'
import _ from 'underscore'

var styles = StyleSheet.create({
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 180
  },
  row: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkBorder: {
    //borderColor: 'black',
    //borderWidth: 1,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height:60
  },
  image: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  userProfile: {
    borderWidth: 1, borderColor: 'white', borderRadius: 60, width: 120, height: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
  },
  flex1: {
    flex: 1
  },
  flex05: {
    flex: 0.5
  },
  flex08: {
    flex: 0.8
  },
  petName: {
    fontSize: 25,
    marginLeft: 20
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 35
  },
  box: {
    borderRadius: 15, borderWidth: 1, borderColor: 'black', width: 300, height: 80, marginBottom: 10
  },
})
function mapStateToProps(state) {
  return {
    myInfo: state.auth.myInfo,
    platform: state.device.platform,
    refreshIdx: state.global.refreshIdx,
  }
}
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}

const BackendFactory = require('../lib/BackendFactory').default

export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({

  getInitialState() {
    return {
      user: null,
      petList: [],
    }
  },
  componentWillMount() {
    BackendFactory().getFriendPets(this.props.user_id).then((res) => {
      console.log(res);
      if (!this.state.user && res.user) {
        this.setState({ user: res.user })
        this.setState({ petList: res.pets })
      }
    })
  },
  plusPet() {

  },
  selectPet(pet, opt) {

    if (pet.status == 'SUCCESS') {
      Actions.PetPhotos(_.extend({
        pet_id: pet.id
      }, opt))
    }
    else if (pet.status == 'READY') {
    }
    else {
      BackendFactory().requestFriendPet(pet.id).then((res) => {
        console.log(res)
        pet.status = 'READY';
        this.props.actions.refresh();
      })
    }
  },
  renderMyPets(pet) {
    console.log("petId : " + pet.id)
    console.log("petStatus : " + pet.status)
    if (pet.profile) {
      pet.profileUrl = getHost() + pet.profile.url;
    }
    else {
      pet.profileUrl = ''
    }

    console.log(" profileUrl : " + pet.profileUrl)
    return (
      <View>
        <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50 }, styles.box]}>

          <TouchableOpacity
            key={pet.id}
            style={[{ borderRadius: 50, width: 280, height: 100, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }]}
            onPress={() => this.selectPet(pet)}
          >
            <Image style={{
              width: 70,
              height: 70,
              marginLeft: 15,
              borderRadius: this.props.platform === 'ios' ? 20 : 25,
            }} source={{ uri: pet.profileUrl }} ></Image>

            <View style={styles.iconRow}>
              <Text style={styles.petName}> {pet.name} </Text>
              <Image style={styles.icon} source={pet.status == 'SUCCESS' ? require('../images/done.png') :
                pet.status == 'READY' ? require('../images/wait.png') : require('../images/notaccess.png')} />
            </View>

          </TouchableOpacity>
        </View>
      </View >



    )
  },

  render() {
    var petList = []
    if (!this.state.user) return (<View></View>);

    if (this.state.user.profile) {
      this.state.user.profileUrl = getHost() + this.state.user.profile.url;
    }

    if (this.state.petList) {
      this.state.petList.forEach((element) => {
        petList.push(element)
      });
    }
    var data = ds.cloneWithRows(petList);

    console.log(" user profile : " + this.state.user.profileUrl)
    return (
      <View style={styles.column}>
        <NavigationBar
          leftButton={<NavBarBack isNegative={true} />} />
        <View style={styles.row}>
          <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 60, width: 120, height: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={styles.userProfile} source={{ uri: this.state.user.profileUrl }} />
          </View>
          <Text style={styles.petName}> {this.state.user.name} </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ListView
            enableEmptySections={true}
            dataSource={data}
            renderRow={this.renderMyPets}
          >
          </ListView>
        </View>
      </View >
    );
  }
}))