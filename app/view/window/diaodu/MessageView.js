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
    Platform,
    BackHandler
} from 'react-native';
import comstyle from '../../../common/CommonStyle';
import {API,postFetch} from '../../../common/GConst';
import TongXuView from '../../window/nativemodal/TongXuView'
import Contants from '../../../common/Contants'
var TimerMixin = require('react-timer-mixin');
export default class MessageView extends Component{
    constructor(props){
        super(props)
        this.state={
            message:'',
            cell:"",
            type:''
        }
        mixins: [TimerMixin]
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentDidMount() {
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);}
        this.subscription=  DeviceEventEmitter.addListener('event',this.onResult)
        // MyMap.toMapActivity();

    }
    onResult=(e)=>{
        // alert(e)

        // if(e.action==='TO_CHATVIEW'){
        //     this.setState({
        //         cell:e.HX_ID,
        //         type:e.chatType
        //     })
        //
        //     this.props.navigation.navigate('ChatViews',{data:e.HX_ID,type:e.chatType})
        // }else

        if(e.action==='REFRESH'){
            //  this.setState({
            //     message:e
            // })
        }else if(e.action==='TO_USER_DETAIL'){
            this.setState({
                cell:e.HX_ID
            })

        }
        // this.forceUpdate()
    }
    componentWillUnmount(){
        // DeviceEventEmitter.addListener('event',this.onResult).remove()
        // DeviceEventEmitter.removeAllListeners()
        this.subscription.remove();
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
        }
    }

    render(){
        return(<View style={{flex:1,backgroundColor:'#f9f9f9'}}>
            <View style={{width:Contants.Screen.width,height:Contants.Screen.height-60-StatusBar.currentHeight}}>
                <TongXuView style={{width:Contants.Screen.width,height:Contants.Screen.height}}/>
            </View>
        </View>)
    }
}