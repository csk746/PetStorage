'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridView from 'react-native-gridview';
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'

import { Actions } from 'react-native-router-flux'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ListView,
  Image
}
  from 'react-native'

import NavBar from './common/NavBar'
import BottomBar from './common/BottomBar'


const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
    // marginTop:520
  },
  camera: {
    marginTop: 20,
    marginBottom: 20
  },
  dataRow: {
    marginTop: 10,
    marginBottom: 10

  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
const itemsPerRow = 4;

// Use data from an array... 
const data = Array(20)
  .fill(null)
  .map((item, index) => index + 1);

// ...or create your own data source. 
// This will randomly allocate 1-3 items per row, and will be used 
// if the `randomizeRows` prop is `true`. 
const randomData = [];
const picture = []
for (let i = 0; i < data.length; i) {
  const endIndex = Math.max(Math.round(Math.random() * itemsPerRow), 1) + i;
  randomData.push('사진');
  i = endIndex;
}
const dataSource = new GridView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
}).cloneWithRows(randomData);

class Main extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(['사진', '사진', '사진', '사진', '사진', '사진', '사진', '사진', '사진']),
    };

    this.getPhotoList= this.getPhotoList.bind(this)

  }

  handlePress() {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }
  getPhotoList() {

    console.log ( "getPhotoList");

    this.props.actions.getPhotoUrl();
    let currentPage = this.props.photo.page + 1;
    console.log ( "page : " + currentPage);

  }
  goToDetailView() {
    Actions.DetailView({
      // title: 'Main'
      // you can add additional props to be passed to Subview here...
    })
  }

  render() {
    this.getPhotoList();
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }
    return (
      <View style={styles.container}>
          <NavBar />
          <GridView
            data={data}
            dataSource={null}
            itemsPerRow={itemsPerRow}
            renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
              return (
                <View style={{ flex: 1, borderWidth: 1 }}>
                  {/* <Text>{`${item} (${sectionID}-${rowID}-${itemIndex}-${itemID})`}</Text> */}
                  <Text>강아지 사진</Text>
                  <TouchableOpacity onPress={() => this.goToDetailView()}>
                    <Image style={{ height: 80, width: 80 }} source={require('../images/corgi.png')} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <BottomBar/>
      </View>
    )
  }
}


function mapStateToProps(state) {
    return {
        auth: {
            form: {
                isFetching: state.auth.form.isFetching
            }
        },
        global: {
            currentState: state.global.currentState,
            showState: state.global.showState
        },
        photo:{
            maxSize:state.photo.maxSize,
            order:state.photo.order,
            field:state.photo.field,
            page:state.photo.page,
            urlList:state.photo.urlList,
            photoList:state.photo.photoList
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...authActions, ...globalActions, ...photoActions}, dispatch)
    }
}


/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
