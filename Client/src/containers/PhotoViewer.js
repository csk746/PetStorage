import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Image,
    CheckBox,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';

import { bindActionCreators } from 'redux'
import * as photoActions from '../reducers/photo/photoActions'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Actions } from 'react-native-router-flux'
import ImageViewer from 'ImageViewer';

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
    return {
        photo: {
            photoList: state.photo.photoList
        }
    }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...photoActions }, dispatch)
    }
}


const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        flexWrap: 'wrap',
        marginTop: 20
    },

    img:{
        height:200,
        width :200,
        marginLeft:10
    }
});



export class PhotoViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photoList: props.photo.photoList,
            curIndex:0,
            shown:false,
            gestureName: 'none'
        };

        this.takePicture = this.takePicture.bind(this);
    }


    takePicture() {
        Actions.TakePicture({
        })
    }

    render() {
        return (
               <View style={styles.container}>
                {
                    this.state.photoList.map((url,index)=>{
                        return <TouchableOpacity key={index}
                                                 activeOpacity={1} >

                            <CheckBox style={{paddingLeft: 10, paddingRight:10}} ></CheckBox>
                                <Image

                                    source={{uri: url}}
                                    style={styles.img}>

                                    </Image>
                            </TouchableOpacity>
                    })
                }
               
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewer)