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
export default class NewsMessage extends Component{
    constructor(props){
        super(props)
        this.state={
            message:'',
            cell:"",
            type:'',
            index:true
        }
        mixins: [TimerMixin]
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentDidMount() {
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);
        this.subscription=  DeviceEventEmitter.addListener('event',this.onResult)
        }else {
            if(this.state.index){
                this.setState({
                    index:false
                })
                this.subsciption=DeviceEventEmitter.addListener('TO_USER_DETAIL',this.result)
            }
        }
        // MyMap.toMapActivity();

    }
    result=(e)=>{
        // alert(JSON.stringify(e))
        if(e){
            this.props.navigation.navigate('ChatViews',{data:e.hxChatId,type:e.hxChatType})
        }
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

        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
            this.subscription.remove();
        }else {
            this.subsciption.remove()
        }
    }

    render(){
        return(<View style={{flex:1,backgroundColor:'#f9f9f9'}}>
            <View style={{width:Contants.Screen.width,height:Contants.Screen.height-60-Platform.OS==='android'?StatusBar.currentHeight:20}}>
                <TongXuView style={{width:Contants.Screen.width,height:Contants.Screen.height}}/>
            </View>
        </View>)
    }
}