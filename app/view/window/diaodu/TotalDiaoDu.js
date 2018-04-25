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
    DeviceEventEmitter
} from 'react-native';
import DiaoDuFirst from './DiaoDuFirst';
import DiaoDuSec from './DiaoDuSec';
import CommonModal from '../../CommonPage/ComonModal'
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DiaoDuTabBar';
import Contants from '../../../common/Contants'
import Modal from 'react-native-modal';
import {

    StackNavigator,
    DrawerNavigator,
    NavigationActions
} from "react-navigation"
const tabTcon=[
    require('../../../img/order/orderfirunpress.png'),
    require('../../../img/order/orderforunpress.png'),

]
const tabTconsel=[
    require('../../../img/order/orderfirpress.png'),
    require('../../../img/order/orderforpress.png'),

]
import Storage from '../../../common/GGAsyncStorage'
var navigation=null
export default class TotalDiaoDu extends Component{
    constructor(props){
        super(props);
        this.state={
            isshowmodal:false,
            isSearch:false,

        }
        navigation=this.props.navigation
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    componentDidMount() {
        this.onlistener=DeviceEventEmitter.addListener('event',(e)=>{
            if(e.action==='TO_LOGIN'){
                GGAsyncStorage.delete('isLogin');
                GGAsyncStorage.delete('phoneNumber');
                GGAsyncStorage.delete('pwd');
                GGAsyncStorage.delete('userId');
                // GGAsyncStorage.delete('isFirstL');
                // Storage.delete('qrCode')
                this.props.navigation.navigate('Login');
            }
        })
    }
    componentWillUnmount(){
        this.onlistener.remove()
    }
    componentWillMount() {

        // this.setState({
        //     isshowmodal:true
        // })
        // Storage.get("isFirstDiaoDu").then((isLogin)=>{
        DeviceEventEmitter.emit('DiaoDu','调度页面')
            Storage.get('isLogin').then((userId)=>{
            if(userId!==true){

                // Storage.save("isFirstDiaoDu",true);
                this.props.navigation.navigate("Login")
            }else {
              // this.listener=DeviceEventEmitter.addListener('DiaoDu',()=>{
              //     NavigationActions.reset({
              //         index:1,
              //         actions:[NavigationActions.navigate({routeName:'Index'}),
              //         NavigationActions.navigate({routeName:'TotalDiaoDu'})
              //         ]
              //     })
              // })
            }
            })
        // })
    }
    render(){
        return(<View style={{flex:1,flexDirection:'column',zIndex:100}}>
            {/*<CommonModal navigation={navigation}/>*/}
            {this.renderHeader()}
            <ScrollableTabView
                style={{marginTop:0,marginBottom:0,backgroundColor:"#f9f9f9"}}
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

                <DiaoDuFirst navigation={navigation}/>
                <DiaoDuSec navigation={navigation}/>

            </ScrollableTabView>

            <TouchableOpacity style={{height:30,width:30,position:'absolute',marginTop:7,marginLeft:Contants.Screen.width/2+30,backgroundColor:'white'}}
                              onPress={this.touch.bind(this)}
            >
                {/*<Image source={require('../../../img/page/arrow.png')}/>*/}
                {/*<View></View>*/}
            </TouchableOpacity>
            <Modal
                isVisible={this.state.isshowmodal}
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
                        this.setState({isshowmodal: false});

                    }}
                    style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}
                />
                <Image source={require("../../../img/dian/background.png")} style={{marginRight:2}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TouchableOpacity style={styles.gonggao}>
                            <Image source={require("../../../img/dian/gonggao.png")} />
                            <Text>公 告</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.sousuo} onPress={
                            this.searchview.bind(this)
                        }>
                            <Image source={require("../../../img/order/shousuo.png")} />
                            <Text>搜 索</Text>
                        </TouchableOpacity>
                        {/*中心红色按钮*/}
                        <TouchableOpacity style={styles.btncons} onPress={()=>{
                            this.setState({
                                isshowmodal:false
                            })
                        }}>

                            <Image source={require("../../../img/page/buttonselt.png")} style={styles.btnimgs} />
                        </TouchableOpacity>
                    </View>

                    {/*下面的订单等*/}


                    <View style={{flexDirection:'column',justifyContent:"flex-end",alignSelf:'flex-end',marginRight:15}}>
                        <TouchableOpacity style={styles.dingdan}>

                            <Image source={require("../../../img/order/dingdan.png")} />
                            <Text>订 单</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.xiaoxi} onPress={()=>{this.props.navigation.navigate('NewsView')
                            this.setState({
                                isshowmodal:false
                            })
                        }}>
                            <Image source={require("../../../img/order/message.png")}/>
                            <Text>消 息</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.xiaoxi} onPress={this.mine.bind(this)}>
                            <Image source={require("../../../img/order/mine.png")}/>
                            <Text>我 的</Text>
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
                <View style={{flexDirection:'column',width:Contants.Screen.width,height:150}}>
                    <TouchableOpacity style={styles.close} onPress={()=>{this.setState({isSearch:false})}}>
                        <Image source={require('../../../img/search/close.png')} style={styles.closeimg}/>
                    </TouchableOpacity>
                    <View style={styles.first}>
                        <Image source={require('../../../img/search/classify.png')} style={styles.news}>
                            <Text style={styles.totle}>消息/联系人</Text>
                        </Image>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DiaoSearchOrder')
                            this.setState({
                                isSearch:false
                            })
                        }}>
                            <Image source={require('../../../img/search/classify.png')} style={styles.news}>
                                <Text style={styles.totle}>订单</Text>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>)
    }
    renderHeader(){
        return(

            <View style={styles.headercontainer}>
                <TouchableOpacity style={styles.btncon} onPress={()=>{
                    this.setState({
                        isshowmodal:true
                    })
                }}>

                    <Image source={require("../../../img/page/button.png")} style={styles.btnimg}/>
                </TouchableOpacity>
            </View>

        )
    }
    touch(){
        this.props.navigation.goBack()
    }
    mine(){

        this.setState({
            isshowmodal:false
        })
        this.props.navigation.navigate('PersonalView')
    }
    searchview(){
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

        position:'absolute',
        marginTop:10,
        alignSelf:'flex-end',
    },
    modalstyle:{
        backgroundColor:"transparent",
        margin:0,
        position:'absolute',
        // marginLeft:Contants.Screen.width/2+80,
        marginTop:10,
        alignSelf:'flex-end',

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