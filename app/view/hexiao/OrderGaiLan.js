import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    ListView,
    KeyboardAvoidingView,
    TextInput,
    Animated,
    Platform,
    Easing,
    SectionList,
    FlatList,
    BackHandler,
} from 'react-native';
import comstyle from '../../common/CommonStyle';
import {API,postFetch} from '../../common/GConst';

import dismissKeyboard from 'dismissKeyboard'
var TimerMixin = require('react-timer-mixin');
import Toast, {DURATION}  from 'react-native-easy-toast';
import Contants from '../../common/Contants';
import Modal from 'react-native-modal'
import CommonTextInput from '../CommonPage/CommonTextInput'
import GaiLanMap from '../window/nativemodal/GaiLanMap'
export default class OrderGaiLan extends Component{
    constructor(props){
        super(props)
        this.state={
            inde:''
        }
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentDidMount(){
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);}
       postFetch(API.DingDanGaiLan,null,(result)=>{
           // alert(JSON.stringify(result).toString())
           if(result.status==1){
               // this._MapView.setData(JSON.stringify(result).toString())
               this.setState({
                   inde:JSON.stringify(result).toString()
               })
           }else {
               if(result.status==0){
                   this._toast.show('服务器跑了！！！')
               }
           }
       })

    }
    componentWillUnmount(){
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
        }
    }
    render(){
        console.log(JSON.stringify(this.state.inde))
        return(<View style={styles.cons}>

            <GaiLanMap style={styles.map}
                       ref={ component => this._MapView = component }
            />
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />

        </View>)
    }
    // componentWillReceiveProps(nextProps){
    //     // alert(nextProps)
    //
    // }
    componentDidUpdate(){
        // alert('sssss')
        this._MapView.setData(this.state.inde)
    }
}
const styles=StyleSheet.create({
    map:{
        width:Contants.Screen.width,
        height:Contants.Screen.height,

    },
    cons:{
        flex:1
    }
})