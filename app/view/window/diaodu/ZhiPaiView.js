import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
    ListView,
    ScrollView
} from 'react-native';
import commstyle from '../../../common/CommonStyle'
import MyTimer from '../../../common/MyTimer'
var TimerMixin=require('react-timer-mixin');
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import Contants from '../../../common/Contants'
import comstyle from '../../../common/CommonStyle'
export default class ZhiPaiView extends Component{
    constructor(props){
        super(props)
        this.state={
            time:0,//订单时间
            //listview的
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            name:'',//客户姓名
            phone:'',
            adress:'',//地址
            totalprice:0,//合计
            type:0,//订单类型
            isShowModal:false,
            changeTime:'',
            isChangeName:false,
            deliveryMethod:0,
            deliveryType:0,
            appointtime:'',
            deliverFee:'',
            orderid:'',
            orderPayType:'',
            animating:true,
            shang:'',
            shangphone:'',
            shangAdd:'',
            shouyi:"",
            refusereaon:''
        }
    }
    componentWillMount(){
        const list=this.props.navigation.state.params.data;
        // alert(JSON.stringify(list))
        postFetch(API.DingDan,{expressageOrder:{id:list}},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data.goodsList),
                    time:result.data.orderCreateTime,

                    name:result.data.userName,
                    phone:result.data.phone,
                    adress:result.data.restaurantAddr,
                    shang:result.data.restaurantName,
                    shangphone:result.data.hotline,
                    shangAdd:result.data.restaurantAddr,

                    totalprice:result.data.money,
                    shouyi:result.data.pushMoney,
                    orderid:result.data.foodOrderId,
                    refusereaon:result.data.reason
                })

            }
        },(error)=>{
            alert(error)
        })

    }
    render(){
        const list=this.props.navigation.state.params.data;

        return(
            <View style={styles.contain}>
                {/*<ActivityIndicator*/}
                {/*// animating={this.state.animating}*/}
                {/*size="small"*/}
                {/*style={{alignItems:'center',justifyContent:'center',padding:8}}*/}
                {/*/>*/}
                <ScrollView style={{width:Contants.Screen.width}} >
                    <TouchableOpacity style={styles.top} onPress={()=>{this.props.navigation.navigate('ZhiPaiWho',{data:list})}}>
                        {/*<Text style={styles.text} onPress={()=>{*/}
                        {/*this.props.navigation.navigate('RefuseOrder',{data:list})*/}
                        {/*}}>申请拒单</Text>*/}
                        <Image source={require('../../../img/daisong/jiedan.png')} style={{alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:14,color:"#FF305E"}}>指定派送</Text>
                        </Image>
                        {/*<TouchableOpacity style={styles.da} onPress={this.refuse.bind(this)}>*/}
                            {/*<Image style={[styles.da,{marginLeft:10}]} source={require('../../../img/window/ashanchu.png')}>*/}
                                {/*<Text style={styles.text}>拒 绝</Text>*/}
                            {/*</Image>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<TouchableOpacity style={styles.da} onPress={this.songda.bind(this)}>*/}
                            {/*<Image style={[styles.da,{marginRight:10}]} source={require('../../../img/window/baocun.png')}>*/}
                                {/*<Text style={styles.text}>同 意</Text>*/}
                            {/*</Image>*/}
                        {/*</TouchableOpacity>*/}
                    </TouchableOpacity>
                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                            <Image style={comstyle.maleft} source={require('../../../img/diaodu/reason.png')}/>
                            <Text style={[styles.dao,{marginLeft:10}]}>申请理由</Text>
                        </View>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={comstyle.item}>
                        <Text style={comstyle.maleft}>{this.state.refusereaon}</Text>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/order/bluelijips.png')} style={comstyle.maleft}/>
                            <Text style={[styles.dao,{marginLeft:10}]}>服务信息</Text>
                            {/*<Text style={styles.dao}>{this.state.deliveryType==0?'立即配送':'定时'}</Text>*/}
                        </View>

                    </View>
                    {/*合计*/}
                    {/*<View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>*/}
                    {/*<View style={styles.beizhu}>*/}
                        {/*<Text style={comstyle.maleft}>{"配送员："+this.state.shouyi+'元'}</Text>*/}

                    {/*</View>*/}
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={styles.kehu}>
                        <Text style={{marginLeft:20,marginTop:10}}>客户： {this.state.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:20,marginTop:10}}>电话： </Text>
                            <Text style={{fontSize:14,color:'#459CF4',marginTop:10}}>{this.state.phone}</Text>
                        </View>
                        <Text style={{marginLeft:20,marginTop:10,marginBottom:10}}>地址： {this.state.adress}</Text>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={styles.kehu}>
                        <Text style={{marginLeft:20,marginTop:10}}>商家： {this.state.shang}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginLeft:20,marginTop:10}}>电话： </Text>
                            <Text style={{fontSize:14,color:'#459CF4',marginTop:10}}>{this.state.shangphone}</Text>
                        </View>
                        <Text style={{marginLeft:20,marginTop:10,marginBottom:10}}>地址： {this.state.shangAdd}</Text>
                    </View>

                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/order/blueorder.png')}  style={comstyle.maleft}/>
                            <Text style={comstyle.mesg}>订单信息</Text>
                        </View>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={styles.ding}>
                        <Text style={comstyle.maleft}>订单号码：</Text>
                        <Text>{this.state.orderid}</Text>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                    <View style={styles.ding}>
                        <Text  style={comstyle.maleft}>订单时间：</Text>
                        <Text >{new Date(this.state.time).getFullYear()+'.'}</Text>
                        <Text >{new Date(this.state.time).getMonth()+1+'.'}</Text>
                        <Text>{new Date(this.state.time).getDate()}</Text>
                        <Text style={[,{marginLeft:10}]}>{new Date(this.state.time).getHours()+':'}</Text>
                        <Text>{new Date(this.state.time).getMinutes()}</Text>
                    </View>
                    {/*<View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>*/}
                    {/*<View style={styles.ding}>*/}
                    {/*<Text style={comstyle.maleft}>支付方式：</Text>*/}
                    {/*<Text>{this.state.orderPayType}</Text>*/}
                    {/*</View>*/}
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>

                    <View style={[comstyle.item]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/daisong/xiangqing.png')}  style={comstyle.maleft}/>
                            <Text style={comstyle.mesg}>商品详情</Text>
                        </View>
                    </View>
                    <View style={styles.beizhu}>
                        <Text style={comstyle.maleft}>{"合计："+this.state.totalprice+'元'}</Text>

                    </View>
                    <ListView
                        style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                    />
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5',marginBottom:20}}></View>


                    <Toast ref={(e) => {
                        this._toast = e
                    }}
                           position='center'
                    />

                </ScrollView>
            </View>)
    }


    songda(){
        const id=this.props.navigation.state.params.id;
        postFetch(API.DiaoDuAgree,{id:id,checkStatus:1},(result)=>{
            if(result.status==1){
                this._toast.show(result.msg)
            }
        },(error)=>{
            alert(error)
        })

    }
    refuse(){
        const id=this.props.navigation.state.params.id;
        postFetch(API.DiaoDuAgree,{id:id,checkStatus:2},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this._toast.show(result.msg)
            }
        },(error)=>{
            alert(error)
        })
    }
    _renderRow=(rowData)=>{
        return(
            <View>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <View style={{justifyContent:'space-between',flexDirection:'row',height:46,alignItems:'center'}}>
                    <Text style={comstyle.maleft}>{rowData.goodsName}</Text>
                    <Text style={comstyle.textright}>{" x  "+rowData.quantity}{"  /  "+rowData.price+'元'}</Text>

                </View>
            </View>)
    }
}
const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#f9f9f9'
    },
    top:{
        flexDirection:'row',
        // width:Contants.Screen.width,
        marginTop:25,
        justifyContent:'center',
        alignItems:"center",
    },
    text:{
        // width:40,
        // height:20,
        fontSize:14,
        // marginLeft:30,30
        // backgroundColor:'white',
        // marginRight:30,
        color:'#FF305E'

    },
    heng:{
        width:Contants.Screen.width,
        height:1,
        backgroundColor:"#C0C0C0"
    },
    zhican:{
        flexDirection:'row',
        width:Contants.Screen.width,
        marginTop:20,
        justifyContent:'space-between',
        backgroundColor:'white',

    },
    white:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white'
    },
    img:{
        width:20,
        height:20,
        marginRight:10
    },
    textc:{
        marginRight:20
    },
    beizhu:{
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'#FFFFFF',
        height:46,
        alignItems:'center'
    },
    list:{
        width:Contants.Screen.width,
        // height:100,
        backgroundColor:"white"
    },
    kehu:{
        flexDirection:'column',

    },
    mesg:{
        marginBottom:10,
        marginLeft:10
    },
    vies:{
        width:Contants.Screen.width,
        // height:100,
        backgroundColor:'white',
        marginTop:20
    },
    da:{
        justifyContent:'center',
        alignItems:'center',

    },
    dao:{
        fontSize:14,
        color:'#459CF4'
    },
    apptime:{
        fontSize:14,
        color:'#B2B2B2',
        // marginRight:20
    },
    ding:{
        flexDirection:'row',
        alignItems:'center',
        height:46,
        backgroundColor:'#FFFFFF'
    }
})