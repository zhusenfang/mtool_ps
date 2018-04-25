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
    DeviceEventEmitter,
    BackHandler,
    ToastAndroid,
    NativeModules
} from 'react-native';
import {Container, Tab, Tabs,TabHeading} from 'native-base';
import NewsPage from './view/NewsPgae';
import OrderPage from './view/OrderPage'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from './common/DfyTabBar'
import SearchPage from './view/SearchPage'
import Modal from 'react-native-modal';
import Contants from './common/Contants';
import Login from './view/Login';
import {API,postFetch} from './common/GConst'
import {

    StackNavigator,
    DrawerNavigator,
    NavigationActions
} from "react-navigation"
import Storage from './common/GGAsyncStorage'
// import JPushModule from 'jpush-react-native';
import EndOrder from './view/window/orderpage/EndOrder'
import EndOrderFirst from './view/window/orderpage/EndOrderFirst'
import ProgressOrder from './view/window/orderpage/ProgressOrder'
import OutOrder from './view/window/orderpage/OutOrder'
import OrderFinally from './view/window/orderpage/OrderFinally';
import TotalDiaoDu from './view/window/diaodu/TotalDiaoDu'
import GGAsyncStorage from './common/GGAsyncStorage'
import comstyle from './common/CommonStyle'
import LoactionModal from './view/window/nativemodal/LoactionModal'
const tabTcon=[
    require('./img/order/orderfirunpress.png'),
    require('./img/order/ordersecunpress.png'),
    require('./img/order/orderthunpress.png'),
    require('./img/order/orderforunpress.png')
]
const tabTconsel=[
    require('./img/order/orderfirpress.png'),
    require('./img/order/ordersecpress.png'),
    require('./img/order/orderthpress.png'),
    require('./img/order/orderforpress.png')
]
var navigation=null
let isFirstL=''
let isLogin=''
let isFirstSave=''
export default class Project extends Component {
    constructor(props){
        super(props)
        this.state={
            isshowmodal:false,
            isSearch:false,

        }
        navigation=this.props.navigation
        // let aa=this
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    _androidBack = () => {

        if (this.lastBackPressed && (Date.now() - this.lastBackPressed ) < 2000) {
            BackHandler.exitApp();
        } else {
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按返回退出应用', ToastAndroid.SHORT);
        }

        return true;

    }
    componentDidMount() {

        if(Platform.OS==='android'){
       BackHandler.addEventListener('hardwareBackPress', this._androidBack);
        }
        postFetch(API.Personnal,null,(result)=>{
            if(result.status==1){
                if(result.data.goWork==1){
                    // alert(result.data.goWork)
                    // if(Platform.OS==='android'){
                        LoactionModal.startLocationUpload()
                    // }else {
                    //     NativeModules.MapModual.startLocationUpload()
                    // }
                }
            }

        })
        //android推送
        if(Platform.OS=='android'){
        }
       // this.fetchDetails('115220377235081')
        this.onlistener=DeviceEventEmitter.addListener('event',(e)=>{

            if(e.action==='TO_ORDER_DETAIL'){
                this.fetchDetails(e.orderId)
            }else if(e.action==='TO_LOGIN'){
                GGAsyncStorage.delete('isLogin');
                GGAsyncStorage.delete('phoneNumber');
                GGAsyncStorage.delete('pwd');
                GGAsyncStorage.delete('userId');
                GGAsyncStorage.delete('isFirstL');
                // Storage.delete('qrCode')
                this.props.navigation.navigate('Login');
            }
        })
        this.listener=DeviceEventEmitter.addListener('HOMEPAGE',()=> {
            // this.props.navigation.resetTo({
            //     screen:Index,
            // })
            NavigationActions.reset({
                index:1,
                actions:[NavigationActions.navigate({routeName:'Index'}),]
            })
        })

    }
    fetchDetails(id){
        postFetch(API.DingDan,{expressageOrder:{id:id}},(result)=>{
            // alert(JSON.stringify(result))
             if(result.status==1){
               if(result.data.type==0){
                   this.props.navigation.navigate('OrderDetails',{data:id})
               }else {
                   this.props.navigation.navigate('OrderSecondDetail',{data:id})
               }
             }else {
                 if(result.status==0){
                     this.fetchother(id)
                 }
             }
        })

    }
   fetchother(id){
       postFetch(API.OrderDetail,{expressageOrder:{id:id}},(result)=>{
           // alert(JSON.stringify(result))
           if(result.status==1){
               if(result.data.phase==1 || result.data.type==0){
                   this.props.navigation.navigate('DaoOrderDetail',{data:id})
               }else if(result.data.phase==1 || result.data.type==1){
                   this.props.navigation.navigate('ProgressDaoOrder',{data:id})
               }else if(result.data.phase==2 || result.data.type==0){
                   this.props.navigation.navigate('EndOrderFir',{data:id})
               }else if(result.data.phase==3 || result.data.type==0){
                   this.props.navigation.navigate('EndOrderFirYiCh',{data:id})
               }else if(result.data.phase==2 || result.data.type==1){
                   this.props.navigation.navigate('EndOrderDao',{data:id})
               }else if(result.data.phase==3 || result.data.type==1){
                   this.props.navigation.navigate('EndOrderYiChang',{data:id})
               }else if(result.data.phase==4 || result.data.type==0){
                   this.props.navigation.navigate('OrderFinalFir',{data:id})
               }else if(result.data.phase==4 || result.data.type==1){
                   this.props.navigation.navigate('OrderFinalSec',{data:id})
               }
           }
       },(error)=>{
           alert(error)
       })
   }
    componentWillUnmount(){
        if(Platform.OS==='android'){
        BackHandler.removeEventListener('hardwareBackPress', this._androidBack);}
       this.listener.remove()
        this.onlistener.remove()
        // JPushModule.removeReceiveCustomMsgListener();
        // JPushModule.removeReceiveNotificationListener();

    }

    // get(){
    //     GetisFirstL : async ()=>{
    //         try{
    //             isFirstL =await Storage.get('isFirstL')
    //             alert(isFirstL)
    //             // return isFirstL
    //             // Storage.save("isFirstL",true);
    //         }catch(erro){}
    //     }
    //     GetisLogin : async ()=>{
    //         try{
    //            isLogin =await Storage.get('isLogin')
    //             console.error(isLogin)
    //             // return isLogin
    //
    //         }catch(erro){}
    //     }
    //
    // }

    componentWillMount() {
        // async()=>{
        //     try{
        //     await (Storage.get('isFirstL').then((isLogin)=>{
        //          Storage.get('isLogin').then((userId)=>{
        //                      if(isLogin!==true||userId!==true){
        //
        //                          Storage.save("isFirstL",true);
        //                          this.props.navigation.navigate("Login")
        //                      }else {
        //                          // if(this.props.navigation.state.params.isShowActivity){
        //                          //
        //                          // }
        //                      }
        //
        //          })
        //      }))
        //     }catch (error){}
        // }
         // isFirstL.then((isLogins)=>{
         //     isLogin.then((userId)=>{
         //       if(isLogins!==true||userId!==true){
         //
         //       }
         //     })
         // })
        // this.setState({
        //     isshowmodal:true
        // })
       Storage.get("isFirstL").then((isLogin)=>{
           Storage.get('isLogin').then((userId)=>{

               if(isLogin!==true||userId!==true){

                   Storage.save("isFirstL",true);
                   this.props.navigation.navigate("Login")
               }else {
                   // BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
                   // if(this.props.navigation.state.params.isShowActivity){
                   //
                   // }
               }
           })
       })
       //  if(isFirstL!==true||isLogin!==true){
       //      // alert(isLogin)
       //      Storage.save("isFirstL",true);
       //      this.props.navigation.navigate("Login")
       //  }else {
       //
       //  }

    }

    render() {
        // alert(this.state.isSearch)
        // this.get()
        const page=this.props.navigation.state.params.data

        // let tabIconNames = this.state.tabIconNames;
        return (
            <View style={{flex:1,flexDirection:'column',zIndex:100}}>
                {this.renderHeader()}
                <StatusBar
                    translucent={true}
                    backgroundColor="#00000030"
                    //   backgroundColor='white'
                    barStyle="default"
                />
                <ScrollableTabView
                    initialPage={page}
                    style={{backgroundColor:'#f9f9f9'}}
                    tabBarPosition='top'
                    renderTabBar={() => <TabBar tabIconNames={tabTcon}
                    selectedTabIconNames={tabTconsel}
                    />}

                    onChangeTab={
                        (obj) => {
                            console.log('被选中的tab下标：' + obj.i);
                        }
                    }

                    onScroll={
                        (position) => {
                            console.log('滑动时的位置：' + position);
                        }
                    }
                >

                    <OutOrder navigation={navigation}/>
                    <ProgressOrder navigation={navigation}/>
                    <EndOrder navigation={navigation}/>
                    <OrderFinally navigation={navigation}/>
                </ScrollableTabView>

             <Modal
              isVisible={this.state.isshowmodal}
              hideOnBack={true}
              transparent={true}
              style={styles.modalstyles}
              //backdropColor='transferent'
              backdropOpacity={0.3}
              animationIn={'slideInRight'}
              animationOut={'slideOutRight'}
             >
                 {/*点击外框，键盘消失*/}
                 <TouchableOpacity
                     onPress={() => {
                         this.setState({isshowmodal: false});

                     }}
                     // style={{position: "absolute", top: 240, left: 0, right: 70, bottom: 0,zIndex:100}}
                 />

                     <Image source={require("./img/page/background.png")} style={{marginRight:2,marginTop:Platform.OS==='ios'?25:0}}>


                         <View style={{flexDirection:"row",alignItems:"center"}}>
                             <TouchableOpacity style={styles.gonggao} onPress={this.publicord.bind(this)}>
                                 <Image source={require("./img/order/diaodu.png")} />
                                 <Text style={comstyle.text}>调 度</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.sousuo} onPress={this.searchview.bind(this)}>
                                 <Image source={require("./img/order/shousuo.png")} />
                                 <Text style={comstyle.text}>搜 索</Text>
                             </TouchableOpacity>
                             {/*中心红色按钮*/}
                             <TouchableOpacity style={styles.btncons} onPress={()=>{
                                 this.setState({
                                     isshowmodal:false
                                 })
                             }}>

                                 <Image source={require("./img/page/buttonselt.png")} style={styles.btnimgs} />
                             </TouchableOpacity>
                         </View>
                         {/*<TouchableOpacity style={{backgroundColor:'green',width:170,height:26,zIndex:100}} onPress={()=>{this.setState({isshowmodal:false})}}/>*/}
                         {/*下面的订单等*/}
                         <Image source={require('./img/daisong/xiaokuang.png')} style={{marginRight:Contants.Screen.width/3,position:'absolute',alignItems:'center',justifyContent:'center',marginTop:Contants.Screen.height/8}}>
                             <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}} onPress={()=>{
                                 this.setState({
                                     isshowmodal:false
                                 })
                             }}>
                                 <Image source={require('./img/daisong/list.png')}/>
                                 <Text style={[comstyle.text,{marginLeft:20}]}>订单列表</Text>
                             </TouchableOpacity>
                         </Image>
                         {/*<TouchableOpacity style={{backgroundColor:'green',width:170,height:26,zIndex:100,marginTop:47}} onPress={()=>{this.setState({isshowmodal:false})}}/>*/}
                         <Image source={require('./img/daisong/xiaokuang.png')} style={{marginRight:Contants.Screen.width/3,position:'absolute',alignItems:'center',justifyContent:'center',marginTop:Contants.Screen.height/5+20}}>
                             <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}} onPress={()=>{
                                 this.props.navigation.navigate('OrderGaiLan')
                             this.setState({
                                 isshowmodal:false
                             })
                             }}>
                                 <Image source={require('./img/daisong/gailan.png')}/>
                                 <Text style={[comstyle.text,{marginLeft:20}]}>订单概览</Text>
                             </TouchableOpacity>
                         </Image>
                         {/*</TouchableOpacity>*/}
                         {/*<TouchableOpacity style={{backgroundColor:'green',width:170,height:200,zIndex:100,marginTop:48}} onPress={()=>{this.setState({isshowmodal:false})}}/>*/}
                         {/*下面的订单等*/}
                         <View style={{flexDirection:'column',justifyContent:"flex-end",alignSelf:'flex-end',marginRight:15}}>
                             <TouchableOpacity style={styles.dingdan} onPress={this.dingdan.bind(this)}>
                                 <Image source={require("./img/order/dingdan.png")} />
                                 <Text style={comstyle.text}>订 单</Text>
                             </TouchableOpacity>


                             <TouchableOpacity style={styles.xiaoxi} onPress={this.news.bind(this)}>
                                 <Image source={require("./img/order/message.png")} />
                                 <Text style={comstyle.text}>消 息</Text>
                             </TouchableOpacity>
                             {/*<TouchableOpacity style={styles.xiaoxi} onPress={this.gongju.bind(this)}>*/}
                                 {/*<Image source={require("./img/order/tools.png")} />*/}
                                 {/*<Text>工 具</Text>*/}
                             {/*</TouchableOpacity>*/}
                             <TouchableOpacity style={styles.xiaoxi} onPress={this.settingview.bind(this)}>
                                 <Image source={require("./img/order/mine.png")}/>
                                 <Text style={comstyle.text}>我 的</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={styles.xiaoxi} onPress={this.hexiao.bind(this)}>
                                 <Image source={require("./img/order/hexiao.png")}/>
                                 <Text style={comstyle.text}>扫 码</Text>
                             </TouchableOpacity>
                         </View>
                     </Image>
             </Modal>
            <Modal
                isVisible={this.state.isSearch}
                hideOnBack={true}
                transparent={true}
                style={styles.modalstyle}
                //backdropColor='transferent'
                backdropOpacity={0.3}
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
            >
                {/*点击外框，键盘消失*/}
                <TouchableOpacity
                    onPress={() => {
                        this.setState({isSearch: false});

                    }}
                    style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
                />
                {Platform.OS=='android'?
               <View style={{flexDirection:'column',width:Contants.Screen.width,height:150}}>
                  <TouchableOpacity style={styles.close} onPress={()=>{this.setState({isSearch:false})}}>
                      <Image source={require('./img/search/close.png')} style={styles.closeimg}/>
                  </TouchableOpacity>
                   <View style={styles.first}>
                    <Image source={require('./img/search/classify.png')} style={styles.news}>
                        <Text style={styles.totle}>消息/联系人</Text>
                    </Image>
                       <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchOrder')
                       this.setState({
                          isSearch:false
                       })
                       }}>
                       <Image source={require('./img/search/classify.png')} style={styles.news}>
                           <Text style={styles.totle}>订单</Text>
                       </Image>
                       </TouchableOpacity>
                   </View>
               </View>:
                    <View style={{flexDirection:'column',width:Contants.Screen.width,height:150}}>
                        <TouchableOpacity style={styles.close} onPress={()=>{this.setState({isSearch:false})}}>
                            <Image source={require('./img/search/close.png')} style={styles.closeimg}/>
                        </TouchableOpacity>
                        <View style={styles.first}>
                            <Image source={require('./img/search/classify.png')} style={styles.news}>
                                <Text style={styles.totle}>消息/联系人</Text>
                            </Image>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchOrder')
                                this.setState({
                                    isSearch:false
                                })
                            }}>
                                <Image source={require('./img/search/classify.png')} style={styles.news}>
                                    <Text style={styles.totle}>订单</Text>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Modal>
            </View>
        );
    }
    renderHeader(){
        return(

                <View style={styles.headercontainer}>
               <TouchableOpacity style={styles.btncon} onPress={()=>{
                   this.setState({
                       isshowmodal:true
                   })
               }}>

                <Image source={require("./img/page/button.png")} style={styles.btnimg}/>
                </TouchableOpacity>
                </View>

        )
    }
    publicord(){
        // this.props.navigation.navigate("TotalDiaoDu")
        this.setState({
            isshowmodal:false
        })
    }
    searchview(){
        // alert(this.state.isSearch)
        // this.props.navigation.navigate("SearchView")
        this.setState({
            isshowmodal:false,
            // isSearch:true
        },()=>{
            setTimeout(()=>{
                this.setState({
                    isSearch:true
                })
            },500)

        })
    }
    dingdan(){
      // this.props.navigation.navigate('TotalOrder')
        this.setState({
            isshowmodal:false
        })
    }
    settingview(){
        this.props.navigation.navigate('MineMessage')
        this.setState({
            isshowmodal:false
        })
    }
    news(){
        this.props.navigation.navigate('NewsMain')
        this.setState({
            isshowmodal:false
        })
    }
    hexiao(){
        // this.props.navigation.navigate('HeXiaoView')
        this.setState({
            isshowmodal:false
        })
    }
    // gongju(){
    //    this.props.navigation.navigate('ToolsTotal')
    //     this.setState({
    //         isshowmodal:false
    //     })
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    img:{
        // width:20,
        // height:20,
        // backgroundColor:"white"
        marginRight:20
    },
    btnimg:{
        width:60,
        height:60,
        marginRight:20
    },
    btncon:{
        marginTop:0,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30,
        zIndex:10
    },
    headercontainer:{
        zIndex:1000,
        // marginBottom:40,
        position:'absolute',
        // marginLeft:Contants.Screen.width/2+80,
        marginTop:30,
        alignSelf:'flex-end',
    },
    modalstyle:{
        backgroundColor:"transparent",
        margin:0,
         position:'absolute',
        // marginLeft:Contants.Screen.width/2+80,
        marginTop:20
    },
    modalstyles:{
        backgroundColor:"transparent",
        margin:0,
        position:'absolute',
        // marginLeft:Contants.Screen.width/2+80,
        marginTop:5,
        alignSelf:'flex-end'
    },
    btncons:{
        marginTop:5,
        alignItems:"center",
        justifyContent:"center",
        // marginBottom:30,
        // marginLeft:Contants.Screen.width/3+29
        marginLeft:30
    },


    gonggao:{
        flexDirection:'column',
        // position:'absolute',
        marginLeft:30,
        // marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    },

    sousuo:{
        flexDirection:'column',
        // position:'absolute',
        // marginTop:10,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:40,
    },
    dingdan:{
        flexDirection:'column',

        alignItems:'center',
        justifyContent:'center',
        // marginLeft:Contants.Screen.width/3+50
        marginTop:30
    },
    xiaoxi:{
        flexDirection:'column',

        alignItems:'center',
        justifyContent:'center',
        // marginLeft:Contants.Screen.width/3+50,
        marginTop:30
    },
    close:{
        marginTop:30,
        flexDirection:'row',
        // justifyContent:'flex-end',
    },
    closeimg:{
        alignSelf:'flex-end',
        marginLeft:"80%"
    },
     first:{
        flexDirection:'row',
         alignItems:'center',
         justifyContent:'center',
     },
    news:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:15
    },
    totle:{
        fontSize:14,
        color:'#4D4D4D'
    },
});