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
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 10
  },
  box: {
    borderRadius: 15, borderWidth: 1, borderColor: 'black', width: 300, height: 65, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10
  }
})
function mapStateToProps(state) {
  return {
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
      requests: []
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
  renderRowFollow(data) {
    console.log(data.url)
    return (
      <View style={styles.box}>
        <Image
          style={styles.image}
          source={{ uri: host + data.url }}
        />
        <Text>{data.name}</Text>
      </View>
    )
  },
  renderRowRequests(data) {
    return (
      <View style={styles.box}>
        <Text>aa</Text>
        <Image style={{ width: 25, height: 25 }} source={require('../images/right-arrow.png')} />
        <Text>bb</Text>
        <TouchableOpacity>
          <Image style={{ width: 30, height: 30 }} source={require('../images/done.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={{ width: 30, height: 30 }} source={require('../images/notaccess.png')} />
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
          leftButton={<NavBarBack isNegative={true} />} />
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ListView
            enableEmptySections={true}
            dataSource={followPetListData}
            renderRow={this.renderRowFollow}>
          </ListView>

          <ListView
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