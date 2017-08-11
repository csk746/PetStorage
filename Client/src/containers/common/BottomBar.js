import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import {
    View,
    Button
}
    from 'react-native'

var I18n = require('react-native-i18n')
import Translations from '../../lib/Translations'
I18n.translations = Translations


class BottomBar extends Component {

    constructor(props){
        super(props);
        this.takePicture = this.takePicture.bind(this);
    }

    takePicture() {
        Actions.TakePicture({
            title: 'TakePicture'
            // you can add additional props to be passed to Subview here...
        })
    }

    render () {

        return (
            <View style={{height:60, backgroundColor:'#C5E1A5',flexDirection: 'column',
                justifyContent: 'flex-end'}}>
                <Button style={{
                        borderColor: '#FF3366',
                        marginLeft: 40,
                        marginRight: 40,
                        // position:'absolute',
                        marginTop: 520
                        // marginBottom:10
                    }}
                        onPress={this.takePicture}
                title="사진찍기 버튼">
                사진찍기 버튼
                </Button>
            </View>
        )
    }
}

export default BottomBar;