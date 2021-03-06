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
import NavBarBack from '../components/NavBarBack'

import CheckBox from 'react-native-checkbox';

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
  Image,
  Button
}
  from 'react-native'
import _ from 'underscore'
import { getHost } from '../lib/utils';
var styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 10
  },
  box: {
    borderRadius: 15, borderWidth: 1, borderColor: 'black', width: 300, height: 65, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  },
  permission: {
    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  },
  checkBoxLabel: {
    fontSize: 10,
  },
  checkBox: {
    width: 10,
    height: 10
  },
  smallFont: {
    fontSize: 10,
    marginLeft: 15,
    marginRight: 15
  },
  font: {
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15
  },
  button: {
    marginLeft: 5,
    marginRight: 15,
    width: 30, height: 30
  }
})
function mapStateToProps(state) {
  return {
    myInfo: state.auth.myInfo,
  }
}
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id })
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}
let host = getHost();
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      followPetList: [],
      requests: [],
      refreshIdx: 0
    }
  },
  componentWillMount() {
    this.getFollowingList()
    this.getRequestList()
  },
  getFollowingList() {
    BackendFactory().findFollowPets().then(pl => this.setState({ followPetList: pl }))
  },
  getRequestList() {
    BackendFactory().getReceiveRequests().then(rl => this.setState({ requests: rl }))
  },
  approveRequest(data) {
    BackendFactory().approveFriend(data.pet.id, data.user.id).then(() => {
      var index = this.state.requests.indexOf(data)
      var arr = this.state.requests
      arr.splice(index, 1)
      this.setState({ requests: arr })
    })
  },
  rejectRequest(data) {
    BackendFactory().rejectFriend(data.pet.id, data.user.id).then(() => {
      var index = this.state.requests.indexOf(data)
      var arr = this.state.requests
      arr.splice(index, 1)
      this.setState({ requests: arr })
    })
  },

  permissionChange(isread, data, check) {
    console.log("permission change isread : " + isread)
    console.log(data)
    console.log("boolean : " + check)
    let toStatus = !check;

    let bit = 4;
    if (isread) bit = 2;

    if (toStatus) {
      data.petUserMap.accessControl = data.petUserMap.accessControl | (bit);
    }
    else {
      data.petUserMap.accessControl = data.petUserMap.accessControl & (~bit);
    }

    BackendFactory().setAccessControl(data.petUserMap.id, data.petUserMap.accessControl).then((res) => {
      console.log(res);
    })

    console.log(data.petUserMap.accessControl)
    this.setState({ refreshIdx: this.state.refreshIdx + 1 })
  },
  renderRowFollow(data) {
    let pet = data.pet;
    let user = data.user;

    let accessControl = data.petUserMap.accessControl;
    console.log(" accessControl : " + accessControl);

    let read = (accessControl & 2) > 0;
    console.log("read permission :  " + read)

    let write = (accessControl & 4) > 0;
    console.log("write permission :  " + write)

    console.log(pet.url)
    if (pet.user.id == this.props.myInfo.id) {


      return (
        <View style={styles.box}>
          <Image
            style={styles.image}
            source={{ uri: host + user.url }}
          />
          <Text style={styles.font}>{user.name}</Text>
          <Image style={{ width: 25, height: 25 }} source={require('../images/right-arrow.png')} />
          <Text style={styles.font}>{pet.name}</Text>
          <View style={styles.permission}>
            <CheckBox
              label='READ'
              labelStyle={styles.checkBoxLabel}
              checkboxStyle={styles.checkBox}
              checked={read}
              onChange={(checked) => this.permissionChange(true, data, checked)}
            ></CheckBox>

            <CheckBox
              label='WRITE'
              labelStyle={styles.checkBoxLabel}
              checkboxStyle={styles.checkBox}
              checked={write}
              onChange={(checked) => this.permissionChange(false, data, checked)}
            ></CheckBox>

          </View>
        </View>
      )
    }
    return (
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{ uri: host + pet.url }}
        />
        <View style={styles.permission}>
          <Text style={styles.font}>{pet.name}</Text>
          <Text style={styles.smallFont}>({pet.user.name})</Text>
        </View>

        <View style={styles.permission}>
          <CheckBox
            label='READ'
            labelStyle={styles.checkBoxLabel}
            checkboxStyle={styles.checkBox}
            checked={read}
            disabled={true}
          ></CheckBox>

          <CheckBox
            label='WRITE'
            labelStyle={styles.checkBoxLabel}
            checkboxStyle={styles.checkBox}
            checked={write}
          ></CheckBox>

        </View>

      </View>
    )
  },
  renderRowRequests(data) {
    let pet = data;

    return (
      <View style={styles.box}>
        <Text style={styles.font}>{pet.user.name}</Text>
        <Image style={{ width: 25, height: 25 }} source={require('../images/right-arrow.png')} />
        <Text style={styles.font}>{pet.pet.name}</Text>
        <TouchableOpacity onPress={() => this.approveRequest(pet)}>
          <Image style={styles.button} source={require('../images/done.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.rejectRequest(pet)}>
          <Image style={styles.button} source={require('../images/notaccess.png')} />
        </TouchableOpacity>
      </View>
    )
  },
  render() {

    var followPetListData = ds.cloneWithRows(this.state.followPetList);
    var requestsData = ds.cloneWithRows(this.state.requests);
    return (
      <View >
        <NavigationBar
          title={{
            title: '친구관리',
            style: [{ fontSize: 22 }]
          }}
          leftButton={<NavBarBack isNegative={true} />} />
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ListView
            style={{ height: 250, marginTop: 30 }}
            enableEmptySections={true}
            dataSource={followPetListData}
            renderRow={this.renderRowFollow}>
          </ListView>
          <View style={{ height: 25, width: 300, borderBottomWidth: 2, borderBottomColor: 'gray' }} />
          <View style={{ height: 25 }} />
          <ListView
            style={{ height: 250 }}
            enableEmptySections={true}
            dataSource={requestsData}
            renderRow={this.renderRowRequests}
          >
          </ListView>
        </View>
      </View >
    );
  }
}))