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

var styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // height:60
  },
  imageCircle: {
    flex: 1,
    // width:100,
    // height:133
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

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions, ...storyActions, ...petActions }, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.createClass({
  getInitialState() {
    return {
      // refresh: this.props.story.refresh,
      page: 0,
      petList: null
    }
  },
  componentWillMount() {
    this.setState({ petList: this.props.actions.getMyPetList() })
  },
  render() {
    return (
      <View style={styles.column}>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}>
          <View style={styles.flex1} />
          <Image style={styles.imageCircle} source={require('../images/default_image.png')} />
          <View style={styles.flex1} />
        </View>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}><View style={styles.flex1} /></View>
        <View style={styles.row}><View style={styles.flex1} /></View>
      </View>
    );
  }
}))