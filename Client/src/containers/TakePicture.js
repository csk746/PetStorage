import React, { Component } from 'react';
import { Screen } from '@shoutem/ui';
import Camera from 'react-native-camera';
import { Surface } from "gl-react-native";

import Saturate from '../components/Saturate';

import { Shaders, Node, GLSL } from "gl-react";

import {
  StyleSheet,
} from 'react-native';


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


export default class TakePicture extends Component {

  state = {
    width: null,
    height: null,
    path: null
  }


  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.camera = null;

    this.start();

    this.setState({
      width, height
    });
  }

  refreshPicture = () => {
    if (this.camera) {
      console.log("camera : " + this.camera)
      this.camera.capture()
        .then((data) => {
          console.log(data)
          console.log(data.path)
          this.setState({ path: data.path })
        }
        )
        .catch(err => console.error(err));
    }

  }

  start() {
    this.timer = setInterval(() => this.refreshPicture(), 5000)
  }

  onComponentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { width, height } = this.state;

    console.log(" width : " + width + " height  : " + height)

    const filter = {
      contrast: 1,
      saturation: 1,
      brightness: 1
    }

    if (width && height) {
      return (
        <Screen onLayout={this.onLayout} >
          <Camera style={{ flex: 1 }}
            ref={cam => this.camera = cam}
            captureQuality={Camera.constants.CaptureQuality["720p"]}
            captureTarget={Camera.constants.captureTarget.temp}
            aspect={Camera.constants.Aspect.fill}>

            <Surface style={{ width, height }}>
              <Saturate { ...filter }>
                {{ uri: "https://i.imgur.com/uTP9Xfr.jpg" }}
              </Saturate>
            </Surface>
          </Camera>
        </Screen>
      );
    }
    else {
      return (
        <Screen onLayout={this.onLayout} />
      );
    }
  }
}
