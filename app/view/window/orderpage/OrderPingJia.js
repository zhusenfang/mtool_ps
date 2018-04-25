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
    ActivityIndicator
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
// var TimerMixin=require('react-timer-mixin');
import Modal from 'react-native-modal'
// var comdtime=600;
import comstyle from '../../../common/CommonStyle'
// var tim=new Date()
var pagelists=[]
export default class OrderPingJia extends Component {
constructor(props){
    super(props)
    this.state={
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        xing:"",

    }
}
    componentWillMount(){

        //开始预约计时rowan

        // postFetch(API.Order,{expressageOrder:{type:0,phase:4}},(result)=>{
        //     // alert(JSON.stringify(result))
        //     if(result.status==1){
        //         if(result.data==[] || result.data.length==0){
        //
        //             this.setState({
        //                 // title:'当前没有历史订单记录',
        //             })
        //         }else {
        //             this.setState({
        //                 // dataSource:this.state.dataSource.cloneWithRows(result.data),
        //                 id:result.data,
        //
        //             })
        //
        //         }
        //
        //     }
        // },(error)=>{
        //     alert(error)
        // })
        // AppState.addEventListener('change',this.handleAppState.bind(this));


    }
    render(){
        const list=this.props.navigation.state.params.data;
        // const list=3
        var view=null;

        if(list==0&&list==undefined){

            view=(<View></View>)
        }
        if(list==1){
            view=(<Image source={require('../../../img/dian/wujiaox.png')}/>)
        }
        if(list==2){
            view=(
                <View style={{flexDirection:'row',marginLeft:20}}><Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                </View>)
        }
        if(list==3){
            view=(
                <View style={{flexDirection:'row',marginLeft:20}}><Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                </View>)
        }
        if(list==4){
            view=(
                <View style={{flexDirection:'row',marginLeft:20}}><Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                </View>)
        }
        if(list==5){
            view=(
                <View style={{flexDirection:'row',marginLeft:20}}><Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                    <Image source={require('../../../img/dian/wujiaox.png')}/>
                </View>)
        }
        const ad =this.props.navigation.state.params.da;
        var str=new Array();
        if(ad!=undefined){
            str=ad.split(',')
            for(i=0;i<str.length;i++){
                pagelists.push(<View  style={{flexDirection:'row',marginLeft:20,borderRadius:5,backgroundColor:"#FF305E",height:30,alignItems:'center'}}><Text key={i} style={{marginLeft: 10, marginRight: 10,
                    color:'#FFFFFF',fontSize:12
                }}>{str[i]}</Text></View>)
            }
        }


        return(<View style={{flex:1,backgroundColor:'#f9f9f9'}}>
            {/*<Text>sss</Text>*/}
            <View style={{flexDirection:'column',backgroundColor:'white',marginTop:20}}>
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <Text style={{marginLeft:20}}>服务质量</Text>
                    {view}
                </View>
                <View style={{flexDirection:'row',marginBottom:10,flexWrap:'wrap'}}>
                    {/*<ListView*/}
                    {pagelists}
                    {/*/>*/}
                </View>
            </View>
        </View>)
    }
}