
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as photoActions from '../reducers/photo/photoActions'

import { Actions } from 'react-native-router-flux'

import React, { Component } from 'react';

import PhotoBrowser from 'react-native-photo-browser';
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

const PhotoList =
  {
    startOnGrid: true,
    displayActionButton: true,
  };

class PetPhotoBrowser extends Component {

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("frstRendering ok");
  }

  shouldComponentUpdate(nextProps, nextState){
    //console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    return true;
  }

  componentWillReceiveProps(nextProps) {
    //console.log("componentWillReceiveProps: " + JSON.stringify(nextProps));
  }
  constructor(props) {
    super(props);

    this.props = props ; 
    console.log("constructor Excuete");

    this._onSelectionChanged = this._onSelectionChanged.bind(this);
    this._onActionButton = this._onActionButton.bind(this);
    this._getPhotoList= this._getPhotoList.bind(this);


    this._getPhotoList();
  }
  
  _getPhotoList() {

    console.log ( "getPhotoList");
    console.log ( "petId : " + this.props.photo.petId);
    this.props.actions.getPhotoUrl( this.props.photo.petId, this.props.photo.page, this.props.photo.maxSize, this.props.photo.field, this.props.photo.order);
    console.log ( "getPhotoListEnd");
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
        mediaList={this.props.photo.urlList}
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
            petId :state.photo.petId,
            maxSize:state.photo.maxSize,
            order:state.photo.order,
            field:state.photo.field,
            page:state.photo.page,
            urlList:state.photo.urlList,
            update:state.photo.update,
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


