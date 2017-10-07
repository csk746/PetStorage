'use strict'

import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
const BackendFactory = require('../lib/BackendFactory').default

import { Actions } from 'react-native-router-flux'

export default React.createClass({
  render() {
    var iconSource = require('../images/back_button.png')
    return (
      <View
        style={{
          flexDirection: 'row'
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
          onPress={
            () => {
              if (this.props.onPressBack) {
                this.props.onPressBack()
              }
              Actions.pop()
            }
          }>
          <Image
            style={{
              width: 17,
              height: 16,
            }}
            source={iconSource}
          /><Text>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    )
  }
})