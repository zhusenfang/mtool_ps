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
    AppState
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import EndOrderFirst from './EndOrderFirst'
import EndOrderSecond from './EndOrderSecond'
import {Container, Tab, Tabs,TabHeading} from 'native-base';
import MyTimer from '../../../common/MyTimer'
var TimerMixin=require('react-timer-mixin');
var navigation=null
export default class EndOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:'',
            msgtow:''
        }
        navigation=this.props.navigation
    }
    componentWillMount(){
        postFetch(API.Order,{expressageOrder:{type:0,phase:2},pageNum:1,numPerPage:10},(result)=>{
            this.setState({
                msg:result.page.totalCount
            })
        },(error)=>{
            this.setState({
                isRefreshing:false
            })
        })

        postFetch(API.Order,{expressageOrder:{type:1,phase:2},pageNum:1,numPerPage:10},(result)=>{
            this.setState({
                msgtow:result.page.totalCount
            })
        },(error)=>{
            this.setState({
                isRefreshing:false
            })
        })
    }
    render(){
        return(<View style={{flex:1,marginTop:20,backgroundColor:'#f9f9f9'}}>
            <Tabs
                initialPage={0}


                tabBarUnderlineStyle={{backgroundColor:"#459CF4",justifyContent:"center",width:130,alignSelf:'center',marginLeft:25}}

            >
                <Tab
                    heading={<TabHeading style={{backgroundColor:"white",alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                        <Text style={{fontSize:14,color:'#282828'}}>平台订单</Text><Image source={require('../../../img/order/bluequ.png')} style={{alignItems:'center',justifyContent:'center',marginLeft:5}}>
                        <Text style={{color:"white",backgroundColor:'#459CF4',fontSize:10}}>{this.state.msg}</Text></Image></TabHeading>}
                    activeTextStyle={{color:"#000000"}}
                    textStyle={{color:"#000000"}}
                    tabStyle={{backgroundColor:"white"}}
                    activeTabStyle={{backgroundColor:"white"}}

                >
                    <EndOrderFirst navigation={navigation}/>

                </Tab>
                <Tab   heading={<TabHeading style={{backgroundColor:"white",alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:14,color:'#282828'}}>代送跑腿</Text><Image source={require('../../../img/order/greenqu.png')} style={{alignItems:'center',justifyContent:'center',marginLeft:5}}>
                    <Text style={{color:"white",backgroundColor:'#33BAB2',fontSize:10}}>{this.state.msgtow}</Text></Image></TabHeading>}
                       activeTextStyle={{color:"#000000"}}
                       textStyle={{color:"#000000"}}
                       tabStyle={{backgroundColor:"white"}}
                       activeTabStyle={{backgroundColor:"white"}}
                    // tabBarUnderlineStyle={{backgroundColor:'red'}}
                >
                    <EndOrderSecond navigation={navigation}/>

                </Tab>
            </Tabs>
        </View>)
    }
}