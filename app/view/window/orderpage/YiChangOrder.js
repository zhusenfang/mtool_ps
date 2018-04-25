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
    FlatList,
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
import comstyle from '../../../common/CommonStyle'
var TimerMixin=require('react-timer-mixin');

// var comdtime=600;
var uptime=1;
var theTime = 0;//秒
var theTime1 = 0;//分
var theTime2 = 0;//时
var navigation=null
export default class YiChangOrder extends Component {
    constructor(props){
        super(props)
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            title:'',
        }
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentDidMount(){
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);}
        postFetch(API.YiChangs,{expressageOrder:{status:1}},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        title:'当前没有异常订单记录',
                    })
                }else {


                this.setState({
               dataSource:this.state.dataSource.cloneWithRows(result.data)
                })
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
        return(<View style={[comstyle.contain,{backgroundColor:'#f9f9f9'}]}>
            <View style={yichangstyle.texts}>
                <Text>{this.state.title}</Text>

            </View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}

            />
        </View>)
    }
    _renderRow=(rowData)=>{
        return(<View style={yichangstyle.item}>
            <View style={comstyle.rightview}>
                <View style={yichangstyle.items}>
                    <Text>{rowData.restaurantName}</Text>
                    <Text>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
                </View>

            </View>

            <View style={yichangstyle.timeview}>
                <Text style={yichangstyle.apptime}>{new Date(rowData.orderCreateTime).getFullYear()+'-'}</Text>
                <Text style={yichangstyle.apptime}>{new Date(rowData.orderCreateTime).getMonth()+1+'-'}</Text>
                <Text style={yichangstyle.apptime}>{new Date(rowData.orderCreateTime).getDate()}</Text>
            </View>
        </View>)
    }
}
const yichangstyle=StyleSheet.create({
    item:{
        flexDirection:'row',
        width:Contants.Screen.width,
        justifyContent:'space-between',
        backgroundColor:'white',
        height:60,
        // alignItems:'center',
        marginTop:10

    },
    tao:{
        flexDirection:'column',
        justifyContent:'flex-start'

    },
    text:{
        marginLeft:10,
        marginRight:10
    },

    items:{
        flexDirection:'column',
        // alignItems:"center",
        marginLeft:20
    },
    timeview:{
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:20,
        marginTop:10,

    },
    apptime:{
        fontSize:10,
        color:'#B2B2B2',
        // marginRight:20

        letterSpacing:0.01,
        lineHeight:10
    },
    texts:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        position:'absolute',
        marginLeft:100
    },
})