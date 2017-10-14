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
    borderColor: 'black',
    borderWidth: 1,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // height:60
  },
  flex1: {
    flex: 1
  },
  flex05: {
    flex: 0.5
  },
  flex08: {
    flex: 0.8
  }

})
function mapStateToProps(state) {
  return {
    platform: state.device.platform,
    petList: state.pet.myPetList,
    refresh: state.pet.refresh
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
  selectPet(petId, opt) {
    Actions.PetPhotos(_.extend({
      pet_id: petId,
    }, opt))
  },
  renderMyPets(pet) {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50, marginLeft: pet.id % 2 == 0 ? 40 : 0, marginRight: pet.id % 2 == 1 ? 40 : 0 }}>
        <TouchableOpacity
          key={pet.id}
          style={[styles.checkBorder, { borderRadius: 50, width: 100, height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }]}
          onPress={() => this.selectPet(pet.id)}
        ><Text style={{ textAlign: 'center' }}>{pet.name}</Text></TouchableOpacity>
      </View>
    )
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
        pet.name = '추가'
        pet.id = 3
        petListOdd.push(pet)
      }
    });
    var odd = ds.cloneWithRows(petListOdd);
    var even = ds.cloneWithRows(petListEven);
    return (
      <View style={styles.column}>
        <TouchableOpacity>
          <Image source={require('../images/list.png')} />
        </TouchableOpacity>
        <View style={styles.row}>
          <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 60, width: 120, height: 120, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/default_image.png')} />
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