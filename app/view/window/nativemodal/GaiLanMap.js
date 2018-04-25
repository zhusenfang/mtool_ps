import React, { Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView,
    AppState,
    ScrollView,
    Button,
    requireNativeComponent,
    NativeModules,
    findNodeHandle,
    Platform
} from 'react-native';
const MapView = requireNativeComponent('RNOrderPrevView',GaiLanMap);
export default class GaiLanMap extends Component{
    render(){
        return(<MapView style={{flex:1}}/>)
    }
    setData(json){
        if(Platform.OS==='android'){
        NativeModules.OrderPrivModule.setData(findNodeHandle(this),json);
        }else {
            NativeModules.OrderListManager.setData(findNodeHandle(this),json)
        }
    }

}