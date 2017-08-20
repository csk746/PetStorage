
'use strict'


import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  ActionSheetIOS,
  CameraRoll,
  ListView,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import PhotoBrowser from 'react-native-photo-browser';

import { Actions } from 'react-native-router-flux'
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'


const PhotoList =
  {
    startOnGrid: true,
    displayActionButton: true,
  };

export  class PetPhotoBrowser extends Component {

  constructor(props) {
    super(props);

    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onActionButton = this._onActionButton.bind(this);
    this._getPhotoList= this._getPhotoList.bind(this);
  

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this._getPhotoList();

    this.state = {
      dataSource: dataSource.cloneWithRows(PhotoList),
      photoList: this.props.photo.urlList
    };
  }
  
  _getPhotoList() {

    console.log ( "getPhotoList");
    this.props.actions.getPhotoUrl();
  }

  _onSelectionChanged(media, index, selected) {
    alert(`${media.photo} selection status: ${selected}`);
  }

  _onActionButton(media, index) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: media.photo,
        message: media.caption,
      },
      () => {},
      () => {});
    } else {
      alert(`handle sharing on android for ${media.photo}, index: ${index}`);
    }
  }

  render() {
    return (
      <PhotoBrowser
        mediaList={this.state.photoList}
        initialIndex={0}
        useCircleProgress
        startOnGrid={PhotoList.startOnGrid}
        displayActionButton={PhotoList.displayActionButton}
        onSelectionChanged={this._onSelectionChanged}
        onActionButton={this._onActionButton}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 16,
  },
  row: {
    flex: 1,
    padding: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  rowTitle: {
    fontSize: 14,
  },
  rowDescription: {
    fontSize: 12,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(PetPhotoBrowser)


