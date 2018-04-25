import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    StatusBar,
    DeviceEventEmitter,
    requireNativeComponent,
    NativeModules
} from 'react-native';
const ChatViews=requireNativeComponent('RCTChatTable',ChatIosView)
export default class ChatIosView extends Component{
    render(){
        return(<ChatViews style={{flex:1}}/>)
    }
    initChatView(hxId,chatType,json){
        NativeModules.ChatModule.initChatView(hxId,chatType,json)
    }
    // removeChatViewNotification(){
    //
    // }
}
