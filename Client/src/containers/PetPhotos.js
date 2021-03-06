/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
const BackendFactory = require('../lib/BackendFactory').default
/**
 * Router
 */
import { Actions } from 'react-native-router-flux'
import NavBarBack from '../components/NavBarBack'
/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

import { getHost } from '../lib/utils';

/**
 * The necessary components from React
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  ListView,
  Image
}
  from 'react-native'

import _ from 'underscore'
/**
 * Use device options so we can reference the Version
 *
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'
import * as petActions from '../reducers/pet/petActions'
import * as deviceActions from '../reducers/device/deviceActions'

import PopupDialog from 'react-native-popup-dialog';
/**
* ## Redux boilerplate
*/

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
    deviceVersion: state.device.version,
    selectPet: state.pet.selectPet
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(...authActions, ...globalActions, ...photoActions, ...petActions, dispatch)
  }
}

var styles = StyleSheet.create({

  list: {
    //justifyContent: 'center',
    //flexDirection: 'row',
    flexWrap: 'wrap'
  },
  popupButton: {
    height: 100,
    width: 100,
  },
  container: {
    flex: 1
  },
  item: {
    backgroundColor: 'red',
    margin: 10,
    width: 100,
    height: 100
  },
  image: {
    alignSelf: 'center',
    width: 250,
    height: 250,
    margin: 10
  }
});
/**
 * ## Subview class
 */
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      // refresh: this.props.story.refresh,
      petList: [],
      selectUrl: '',
      selectPet:{}
    }
  },

  componentWillMount() {
    console.log(this.props.pet_id)
    console.log(this.props.selectPet)
    BackendFactory().getUrlList(this.props.pet_id).then((res) => { this.setState({ petList: res.storageModels }) })

  },
  renderRow(model) {

    console.log(" url :  " + model.url);
    console.log(" isPet :  " + model.pet);
    let host = getHost();
    return (
      <TouchableOpacity onPress={() => {
        this.setState({ selectUrl: model.url });
        this.setState({ selectPet: model});
        if (model.pet) {
          this.popupDialog.show()
        } else {
          this.isPetPopup.show()
        }
      }} >
        <Image
          style={styles.image}
          source={{ uri: host + model.url }}
        />
      </TouchableOpacity>
    )
  },
  setProfilePhoto() {
    console.log("selectUrl : " + this.state.selectUrl)

    BackendFactory().setPetProfile(this.props.pet_id, this.state.selectUrl).then((res) => { })
    if (this.popupDialog)
      this.popupDialog.dismiss();

  },
  postingPhoto() {
    console.log("selectUrl : " + this.state.selectUrl)
    console.log("petId : " + this.props.pet_id)

    Actions.PostingPhoto({
      pet_id: this.props.pet_id,
      pet_obj: this.state.selectPet,
      url: this.state.selectUrl
    })

    if (this.popupDialog)
      this.popupDialog.dismiss();

  },
  render() {
    var data = ds.cloneWithRows(this.state.petList)
    return (
      <View style={styles.container}>
        <NavigationBar
          leftButton={<NavBarBack isNegative={true} />} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ListView contentContainerStyle={styles.list}
            dataSource={data}
            enableEmptySections={true}
            renderRow={this.renderRow}
          />
          <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            width={200}
            height={70}
          >
            <Button
              onPress={this.setProfilePhoto}
              title="프로필로 지정하기"
              color="darkviolet"
            />
            <Button
              onPress={this.postingPhoto}
              color="dodgerblue"
              title="포스팅"
            />
          </PopupDialog>
          <PopupDialog
            ref={(isPetPopup) => { this.isPetPopup = isPetPopup; }}
            width={200}
            height={33}
          >
            <Button
              onPress={() => this.isPetPopup.dismiss}
              title="반려동물이 아닙니다."
              color="darkviolet"
            />
          </PopupDialog>
        </View>
      </View>
    );

  }
}))
