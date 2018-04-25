import React, { Component } from 'react';
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
    DeviceEventEmitter,
    ToastAndroid
} from 'react-native';
export default class OrderLocation extends Component{
    componentDidMount() {
        DeviceEventEmitter.addListener('onScanningResult',this.onScanningResult)
    }
    onScanningResult = (e)=> {
        console.log( '从Activity中传输过来的数据为'+e.result);
        ToastAndroid.show('从Activity中传输过来的数据为:'+e,ToastAndroid.SHORT);
        this.setState({
            scanningResult: e.result,
        });
        // DeviceEventEmitter.removeListener('onScanningResult',this.onScanningResult);//移除扫描监听
    }
    render(){
        return(<View>

        </View>)
    }
}