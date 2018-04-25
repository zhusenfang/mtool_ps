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
    ActivityIndicator,
    DeviceEventEmitter,
    Platform,
    BackHandler
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
import Location from '../nativemodal/LoactionModal'
export default class OrderFinalDetail extends Component {
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
            score:'',
            appraise:'',
            latitude:'',
            longitude:'',
            index:true,
            indexto:true,
            kehugeo:''
        }
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);
        }
    }
    componentWillMount(){
        const list=this.props.navigation.state.params.data;
        // alert(JSON.stringify(list))
        postFetch(API.OrderDetail,{expressageOrder:{id:list}},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data.goodsList),
                    time:result.data.orderCreateTime,

                    name:result.data.userName,
                    phone:result.data.userPhone,
                    adress:result.data.userAddr,
                    shang:result.data.restaurantName,
                    shangphone:result.data.hotline,
                    shangAdd:result.data.restaurantAddr,

                    totalprice:result.data.money,
                    shouyi:result.data.pushMoney,
                    orderid:result.data.foodOrderId,
                    score:result.data.score,
                    appraise:result.data.appraiseContent,
                    latitude:result.data.restaurantLatitude,
                    longitude:result.data.restaurantLongitude,
                    kehugeo:result.data.userDeliveryGeo,
                })

            }
        },(error)=>{
            alert(error)
        })

    }
    componentWillUnmount(){
        if(Platform.OS==='android'){
        DeviceEventEmitter.addListener('locate',this.onResult).remove()
        DeviceEventEmitter.addListener('locate',this.onkuResult).remove()
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
        }
        this.setState({
            animating:false
        })
    }


    render(){
     
        const list=this.props.navigation.state.params.data;
        return(
            <View style={styles.contain}>

                <ScrollView style={{width:Contants.Screen.width}} >

                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/order/bluelijips.png')} style={comstyle.maleft}/>
                            <Text style={[styles.dao,{marginLeft:10}]}>服务信息</Text>
                            {/*<Text style={styles.dao}>{this.state.deliveryType==0?'立即配送':'定时'}</Text>*/}
                        </View>

                    </View>
                    {/*合计*/}
                    <View style={comstyle.heng}/>
                    <View style={styles.beizhu}>
                        <Text style={[comstyle.maleft,comstyle.text]}>{"预计收益："+this.state.shouyi+'元'}</Text>

                    </View>
                    <View style={comstyle.heng}/>
                    <View style={styles.kehu}>
                        <Text style={[comstyle.text,{marginLeft:20,marginTop:10}]}>客户： {this.state.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[comstyle.text,{marginLeft:20,marginTop:10}]}>电话： </Text>
                            <Text style={{fontSize:14,color:'#459CF4',marginTop:10}}>{this.state.phone}</Text>
                        </View>
                        <View style={styles.dizhis}>
                        <Text style={[comstyle.text,{marginLeft:20,marginTop:10,marginBottom:10,width:Contants.Screen.width-80}]} ellipsizeMode='tail' numberOfLines={1}>地址： {this.state.adress}</Text>
                            <TouchableOpacity onPress={this.kehuadd.bind(this)}>
                                <Image source={require('../../../img/page/location.png')} style={styles.toast}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={comstyle.heng}/>
                    <View style={styles.kehu}>
                        <Text style={[comstyle.text,{marginLeft:20,marginTop:10}]}>商家： {this.state.shang}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[comstyle.text,{marginLeft:20,marginTop:10}]}>电话： </Text>
                            <Text style={{fontSize:14,color:'#459CF4',marginTop:10}}>{this.state.shangphone}</Text>
                        </View>
                        <View style={styles.dizhis}>
                        <Text style={[comstyle.text,{marginLeft:20,marginTop:10,marginBottom:10,width:Contants.Screen.width-80}]} ellipsizeMode='tail' numberOfLines={1}>地址： {this.state.shangAdd}</Text>
                            <TouchableOpacity onPress={this.shanghuadd.bind(this)}>
                                <Image source={require('../../../img/page/location.png')} style={styles.toast}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={comstyle.heng}/>
                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/order/blueorder.png')}  style={comstyle.maleft}/>
                            <Text style={[comstyle.mesg,styles.dao]}>订单信息</Text>
                        </View>
                    </View>
                    <View style={comstyle.heng}/>
                    <View style={styles.ding}>
                        <Text style={[comstyle.maleft,comstyle.text]}>订单号码：</Text>
                        <Text style={comstyle.text}>{this.state.orderid}</Text>
                    </View>
                    <View style={comstyle.heng}/>
                    <View style={styles.ding}>
                        <Text  style={[comstyle.maleft,comstyle.text]}>订单时间：</Text>
                        <Text style={comstyle.text}>{new Date(this.state.time).getFullYear()+'.'}</Text>
                        <Text style={comstyle.text}>{new Date(this.state.time).getMonth()+1+'.'}</Text>
                        <Text style={comstyle.text}>{new Date(this.state.time).getDate()}</Text>
                        <Text style={[comstyle.text,{marginLeft:10}]}>{new Date(this.state.time).getHours()+':'}</Text>
                        <Text style={comstyle.text}>{new Date(this.state.time).getMinutes()}</Text>
                    </View>
                    {/*<View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>*/}
                    {/*<View style={styles.ding}>*/}
                    {/*<Text style={comstyle.maleft}>支付方式：</Text>*/}
                    {/*<Text>{this.state.orderPayType}</Text>*/}
                    {/*</View>*/}
                    <View style={comstyle.heng}/>

                    <View style={[comstyle.item]}>
                        <View style={comstyle.rightview}>
                            <Image source={require('../../../img/daisong/xiangqing.png')}  style={comstyle.maleft}/>
                            <Text style={[comstyle.mesg,styles.dao]}>商品详情</Text>
                        </View>
                    </View>
                    <View style={styles.beizhu}>
                        <Text style={[comstyle.maleft,comstyle.text]}>{"合计："+this.state.totalprice+'元'}</Text>

                    </View>
                    <ListView
                        style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow}
                    />
                    <View style={[comstyle.item,{marginTop:20}]}>
                        <View style={comstyle.rightview}>
                        <Image source={require('../../../img/goods/pingjia.png')} style={comstyle.maleft}/>
                        <Text style={[comstyle.mesg,{fontSize:14,
                            color:'#459CF4'}]}>订单评价</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('OrderPingJia',{data:this.state.score,da:this.state.appraise})}} style={{width:46,height:46,alignItems:'center'}}>
                        <Image source={require('../../../img/shezhi/jian.png')} style={{marginTop:20}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5',marginBottom:20}}></View>


                    <Toast ref={(e) => {
                        this._toast = e
                    }}
                           position='center'
                    />

                </ScrollView>
            </View>)
    }
    modal(){
        this.setState({
            isShowModal:true
        })
    }
    kehuadd(){
        var ss=this.state.kehugeo.split(',')
        let a=ss[0]
        let aa=ss[1]
        if(Platform.OS==='android'){
            if(this.state.indexto){
                DeviceEventEmitter.addListener('locate',this.onkuResult)
            }else {
                this.setState({
                    indexto:true
                })
            }

            this._toast.show('正在获取当前位置')
            Location.locate()
        }else {
            this.props.navigation.navigate('GpsIosLocation',{latitude:parseFloat(a),longitude:parseFloat(aa),adress:this.state.adress})
        }
    }
    onkuResult=(e)=>{
        var ss=this.state.kehugeo.split(',')
        let a=ss[0]
        let aa=ss[1]
        // alert(ss[0])
        if(e.code==0){
            if(this.state.indexto){
                this.setState({
                    indexto:false
                })
                Location.toNaviActivity(this.state.adress,parseFloat(aa),parseFloat(a))
            }
        }
    }
    shanghuadd(){
        if(Platform.OS==='android'){
            if(this.state.index){
                DeviceEventEmitter.addListener('locate',this.onResult)
            }else {
                this.setState({
                    index:true
                })
            }

            this._toast.show('正在获取当前位置')
            Location.locate()
        }else {
            this.props.navigation.navigate('GpsIosLocation',{latitude:this.state.latitude,longitude:this.state.longitude,adress:this.state.shangAdd})
        }
    }
    onResult=(e)=>{
        this.setState({
            animating:true
        })
        // alert(e.code)
        if(e.code==0){
            if(this.state.index){
                this.setState({
                    // animating:false
                    index:false
                })
                Location.toNaviActivity(this.state.shangAdd,this.state.latitude,this.state.longitude)
            }

        }
    }
    _renderRow=(rowData)=>{
        return(
            <View>
                <View style={comstyle.heng}/>
                <View style={{justifyContent:'space-between',flexDirection:'row',height:46,alignItems:'center'}}>
                    <Text style={[comstyle.maleft,comstyle.text]}>{rowData.goodsName}</Text>
                    <Text style={[comstyle.textright,comstyle.text]}>{" x  "+rowData.quantity}{"  /  "+rowData.price+'元'}</Text>

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
        width:Contants.Screen.width,
        marginTop:25,
        justifyContent:'space-between'
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
    },
    dizhis:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    toast:{
        marginRight:20
    }
})