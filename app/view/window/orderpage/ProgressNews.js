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
    StatusBar,
    DeviceEventEmitter,
    BackHandler,
    Platform
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import SearchPage from '../../SearchPage'
import OrderPage from '../../OrderPage'
import {Container, Tab, Tabs,TabHeading} from 'native-base';
import MyTimer from '../../../common/MyTimer'
import Modal from 'react-native-modal'
import ChatView from '../../window/news/ChatView'
import Storage from '../../../common/GGAsyncStorage'
var navigation=null
import comstyle from '../../../common/CommonStyle';
import ChatIosView from '../../window/news/ChatIosView'
export default class ProgressNews extends Component {
    constructor(props){
        super(props)
        this.state={
            hxid:'',
            message:'',
            cell:true,
            tags:'',
            chat:true,
            json:''
        }
    }
    componentWillMount(){

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
            const list=this.props.navigation.state.params.data;
            postFetch(API.OrderDetail,{expressageOrder:{id:list}},(result)=>{
                if(result.status==1){
                    alert(JSON.stringify(result.data.hxGroupId))
                 this.fetchdata(result.data.hxGroupId)
                    // this._MapView.initChatView(result.data.hxGroupId.toString(),2)
                }
            },(error)=>{
                alert(error)
            })
            // this.listener=DeviceEventEmitter.addListener('userDetail',this.onresultios)
        }
        postFetch(API.TotalHuifu,null,(result)=>{
            this.setState({
                json:JSON.stringify(result).toString()
            })
        })
        Storage.get("userId").then((tagss)=>{

            this.setState({
                tags:tagss
            })
        })


    }
    onresultios=(e)=>{

    }
    fetchdata(id){``
        postFetch(API.TotalHuifu,null,(result)=>{
            // this.setState({
            //     json:JSON.stringify(result).toString()
            // })
            this._MapViews.initChatView(JSON.stringify(id),1,JSON.stringify(result).toString())
        })
    }
    onResult=(e)=>{

        if(e.action === "LOADED"){
            // const list=this.props.navigation.state.params.data;
            // alert("hxId:"+list);
            // this._MapView.initChatView(list,1)
            if(this.state.cell){
                this.setState({
                    cell:false
                })
                const list=this.props.navigation.state.params.data;
                postFetch(API.OrderDetail,{expressageOrder:{id:list}},(result)=>{
                    if(result.status==1){
                        // alert(JSON.stringify(result.data.hxGroupId))
                        this.setState({
                            hxid:result.data.hxGroupId
                        })
                        this._MapView.initChatView(result.data.hxGroupId.toString(),2)
                    }
                },(error)=>{
                    alert(error)
                })


            }
        }else  if(e.action==='QUICK_REPLY'){
            if(this.state.chat){
                this.setState({
                    chat:false
                })
                this._MapView.setQuickReply(this.state.json)
            }
        }

    }
    componentWillUnmount(){

        if(Platform.OS==='android'){
            this.subscription.remove();
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
        }
    }
    render(){

        return(<View style={comstyle.con}>
                {Platform.OS==='android'?
                <ChatView style={{width:Contants.Screen.width,height:Contants.Screen.height}}
                          ref={ component => this._MapView = component }
                /> :
                    <View style={{width:Contants.Screen.width,height:Contants.Screen.height-60}}>
                    <ChatIosView style={{width:Contants.Screen.width,height:Contants.Screen.height}} ref={ component => this._MapViews = component }/>
                    </View>
                }
        </View>)

    }

}
