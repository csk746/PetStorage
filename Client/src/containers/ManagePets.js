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
    fontSize: 15,
  },
})
function mapStateToProps(state) {
  return {
    myInfo: state.auth.myInfo,
    platform: state.device.platform,
    petList: state.pet.myPetList,
    refresh: state.pet.refresh,
  }
}
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      page: 0,
      petList: null,
    }
  },
  componentWillMount() {
    this.props.actions.getMyPetList()
  },
  plusPet(){

  },
  selectPet(pet, opt) {
    if (pet.id < 0) this.plusPet();
    else {

      Actions.PetPhotos(_.extend({
        pet_id: pet.id
      }, opt))
  }
  },
  renderMyPets(pet) {
    console.log("petId : " + pet.id)
    if (pet.profile) {
      pet.profileUrl = getHost() + pet.profile.url;
    }
    else {
      pet.profileUrl = ''
    }

    console.log(" profileUrl : " + pet.profileUrl)

    if (pet.id < 0) {
      return (

        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50, marginLeft: pet.id % 2 == 0 ? 40 : 0, marginRight: pet.id % 2 == 1 ? 40 : 0 }}>

            <TouchableOpacity
              key={pet.id}
              style={[styles.checkBorder, { borderRadius: 50, width: 100, height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }]}
              onPress={() => this.selectPet(pet)}
            >
              <Image style={{
                width: 60,
                height: 60,
                borderRadius: this.props.platform === 'ios' ? 20 : 25,
              }}
                source={require('../images/plus.png')} />

              <Text style={styles.petName}> {pet.name} </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      return (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50, marginLeft: pet.id % 2 == 0 ? 40 : 0, marginRight: pet.id % 2 == 1 ? 40 : 0 }}>

            <TouchableOpacity
              key={pet.id}
              style={[ { borderRadius: 50, width: 100, height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }]}
              onPress={() => this.selectPet(pet)}
            >
              <Image style={{
                width: 80,
                height: 80,
                borderRadius: this.props.platform === 'ios' ? 20 : 25,
              }} source={{ uri: pet.profileUrl }} ></Image>

              <Text style={styles.petName}> {pet.name} </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  },

  render() {
    var petListOdd = []
    var petListEven = []
    this.props.petList.forEach((element) => {
      if (element.id % 2 == 0) {
        petListEven.push(element)
      } else {
        petListOdd.push(element)
        var pet = new Object
        pet.name = ''
        pet.id = -1
        petListOdd.push(pet)
      }
    });
    var odd = ds.cloneWithRows(petListOdd);
    var even = ds.cloneWithRows(petListEven);

    console.log ( " user profile : " + this.props.myInfo.profileUrl)
    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 60, width: 120, height: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image
             style={styles.userProfile} source={{uri:this.props.myInfo.profileUrl}} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <ListView
            enableEmptySections={true}
            dataSource={even}
            renderRow={this.renderMyPets}
          >
          </ListView>
          <ListView
            enableEmptySections={true}
            dataSource={odd}
            renderRow={this.renderMyPets}
          >
          </ListView>
        </View>
      </View >
    );
  }
}))