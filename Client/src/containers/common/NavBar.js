import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

var I18n = require('react-native-i18n')
import Translations from '../../lib/Translations'
I18n.translations = Translations


class NavBar extends Component {
    render () {
        let titleConfig = {
                title: I18n.t('Subview.subview')
            },
            leftButtonConfig = {
                title: I18n.t('Subview.back'),
                handler: Actions.pop
            }
        return (
            <NavigationBar
                title={titleConfig}
                leftButton={leftButtonConfig} />

        )
    }
}

export default NavBar;