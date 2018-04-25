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
    Platform,
    DeviceEventEmitter
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import SearchPage from '../../SearchPage'
import OrderFirst from './OrderFirst';
import OrderSecond from './OrderSecond'
import {Container, Tab, Tabs,TabHeading} from 'native-base';
var navigation=null
export default class OutOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:'',
            msgtow:''
        }
        navigation=this.props.navigation
    }
    componentWillMount(){
       this.poststatus()
    }
    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener('HOMEPAGE',(e)=>{
            // alert(e)
            this.poststatus()
        })
    }
    componentWillUnmount(){
        this.listener.remove()
    }
    poststatus(){
        postFetch(API.FirstOrder,{expressageOrder:{type:0,phase:0},pageNum:1,numPerPage:10},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){


                this.setState({
                    msg:result.page.totalCount
                })
            }
        },(error)=>{
            // this.setState({
            //     isRefreshing:false
            // })
            alert(error)
        })

        postFetch(API.FirstOrder,{expressageOrder:{type:1,phase:0},pageNum:1,numPerPage:10},(result)=>{
            this.setState({
                msgtow:result.page.totalCount
            })
        },(error)=>{
            // this.setState({
            //     isRefreshing:false
            // })
            alert(error)
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
                        <Text style={{fontSize:14,color:'#282828'}}>平台订单</Text>
                        {Platform.OS == 'android' ?
                            <Image source={require('../../../img/order/bluequ.png')}
                                   style={{alignItems: 'center', justifyContent: 'center', marginLeft: 5}}>
                                <Text style={{color: "white"}}>{this.state.msg}</Text></Image> :
                            <Image source={require('../../../img/order/bluequ.png')}
                                   style={{alignItems: 'center', justifyContent: 'center', marginLeft: 5}}>
                                <Text style={{color: "white",backgroundColor:'#459CF4',fontSize:10}}>{this.state.msg}</Text></Image>
                        }
                    </TabHeading>}
                    activeTextStyle={{color:"#000000"}}
                    textStyle={{color:"#000000"}}
                    tabStyle={{backgroundColor:"white"}}
                    activeTabStyle={{backgroundColor:"white"}}

                >
            <OrderFirst navigation={navigation}/>

            </Tab>

                <Tab   heading={<TabHeading style={{backgroundColor:"white",alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:14,color:'#282828'}}>代送跑腿</Text>
                    <Image source={require('../../../img/order/greenqu.png')} style={{alignItems:'center',justifyContent:'center',marginLeft:5}}>
                    <Text style={{color:"white",fontSize:10,backgroundColor:'#33BAB2'}}>{this.state.msgtow}</Text></Image>
                </TabHeading>}
                       activeTextStyle={{color:"#000000"}}
                       textStyle={{color:"#000000"}}
                       tabStyle={{backgroundColor:"white"}}
                       activeTabStyle={{backgroundColor:"white"}}
                    // tabBarUnderlineStyle={{backgroundColor:'red'}}
                >
            <OrderSecond navigation={navigation}/>

            </Tab>
            </Tabs>
        </View>)
    }
}