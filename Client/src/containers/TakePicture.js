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

import {Actions} from 'react-native-router-flux'
/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    photo: {
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
});

export class TakePicture extends React.Component{


   constructor(props) {
    super(props);

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        captureQuality:'photo',
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    };


    this.takePicture = this.takePicture.bind(this)
    this.savePhoto = this.savePhoto.bind(this)
  }
 get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../../assets/ic_camera_front_white.png');
    }

    return icon;
  }
  
  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  savePhoto(data) {
    this.props.actions.setPhoto(data);
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

  render() {
    return (
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
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture)