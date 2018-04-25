/**
 * Created by morgana on 2018/1/3.
 */
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
const MapView = requireNativeComponent('RCTGPSNaviDriveView',LocationIosView);
export default class LocationIosView extends Component{
    render(){
        return(<MapView style={{flex:1}}/>)
    }
    toNaviActivity(latitude,longitude,address){

            NativeModules.MapModual.toNaviActivity(latitude,longitude,address)

    }

}