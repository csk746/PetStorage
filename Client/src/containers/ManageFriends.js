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
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      page: 0,
      petList: null,
    }
  },
  componentWillMount() {
  },

  renderMyPets(pet) {
    return (
      <View>

      </View>
    )
  },

  render() {
    var petListOdd = []
    var petListEven = []

    var odd = ds.cloneWithRows(petListOdd);
    var even = ds.cloneWithRows(petListEven);
    return (
      <View >
        <NavigationBar
          leftButton={<NavBarBack isNegative={true} />} />
      </View >
    );
  }
}))