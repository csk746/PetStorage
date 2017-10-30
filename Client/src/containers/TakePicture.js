import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Camera from 'react-native-camera';
import { bindActionCreators } from 'redux'

import * as photoActions from '../reducers/photo/photoActions'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


import {Actions} from 'react-native-router-flux'

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    myInfo:state.auth.myInfo,
    photo: {
      petId:state.photo.petId,
      photoList:state.photo.photoList
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...photoActions }, dispatch)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  hidden: {
    width: 0,
    height: 0
  }
});


export class TakePicture extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photoList:props.photo.photoList,
      myInfo:props.myInfo,
      petId:props.myInfo.defaultPetId,

      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        captureQuality: Camera.constants.CaptureQuality["720p"],
        //captureQuality: 'photo',
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        AndroidPlaySoundOnCapture:false,
      },
      gestureName:'none',
      isRecording: false
    };

    this.takePicture = this.takePicture.bind(this)
    this.savePhoto = this.savePhoto.bind(this)
    this.switchType = this.switchType.bind(this)
    this.onSwipe = this.onSwipe.bind(this)
    this.photoViewer = this.photoViewer.bind(this);
  }

  photoViewer() {
    Actions.PetPhotoBrowser({
    })
  }

  savePhoto(data) {
    this.props.actions.takePhoto(this.state.petId,data);
    this.props.actions.savePhoto(this.state.petId,data);
    console.log ( "prop Photo List: " + this.state.photoList);
  }

  switchType(){
    console.log ( " this type : " + this.state.camera.type)
    if ( this.state.camera.type == Camera.constants.Type.back ) {
      console.log ( " camera type is back ")
      this.setState( { camera: { ...this.state.camera, type:Camera.constants.Type.front}});
    } 
    else{
      console.log ( " camera type is front")
      this.setState( { camera: { ...this.state.camera, type:Camera.constants.Type.back}});
    }
  }

  takePicture() {
    console.log("camera : " + this.camera)
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          console.log(data)
          console.log(data.path)
          this.savePhoto(data.path)
        }
        )
        .catch(err => console.error(err));
    }
  }

   onSwipe(gestureName, gestureState) {
     console.log ( "gesutueName " + gestureName)
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
      case SWIPE_DOWN:
      this.switchType();
        break;
      case SWIPE_LEFT:
      case SWIPE_RIGHT:
        this.photoViewer();
        break;
    }
  }

  render() {
    
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
       <GestureRecognizer style = {styles.container}
         onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}>
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          captureQuality={this.state.camera.captureQuality}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          defaultTouchToFocus
          mirrorImage={false}

        />

        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={this.takePicture}
          >
            <Image
              source={require('../../assets/ic_photo_camera_36pt.png')}
            />
          </TouchableOpacity>
        </View> 
      </View>
      </GestureRecognizer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture)