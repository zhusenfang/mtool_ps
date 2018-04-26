import React, {Component} from "react";
import {

    AppRegistry,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Platform,
    StatusBar
} from "react-native";

import {

    StackNavigator,
    DrawerNavigator

} from "react-navigation"
import Contents from '../app/common/Contants'
import Storage from '../app/common/GGAsyncStorage'
import Index from './index';
import OrderPage from './view/OrderPage';
//公告
import PublicOder from './view/window/PublicOder'


//登录//注册
//import Login from './view/Login';
import Login from './view/Zhu_Login';
import Register from './view/Register';

//import ForgetView from './view/ForgetView'
import ForgetView from './view/Zhu_ForgetView'
import ForgetViewTwo from './view/Zhu_ForgetViewTwo'
import ForgetViewThree from './view/Zhu_ForgetViewThree'




//搜索
// import SearchView from './view/window/SearchView';
// import RestaurantView from './view/window/RestaurantView';
// import RestaurantSec from './view/window/RestaurantSec';
// import SearchResult from './view/window/SearchResult';
// import SearchDetail from './view/window/SearchDetail'
// import DaiSongView from './view/window/DaiSongView';
import ResetPwd from './view/ResetPwd'
//订单
import TotalOrder from './view/window/orderpage/TotalOrder';
import ComonModal from './view/CommonPage/ComonModal';
import OrderDetails from './view/window/orderpage/OrderDetails';
import OrderFirst from './view/window/orderpage/OrderFirst';
import BeiZhu from './view/window/orderpage/BeiZhu';
import  RefuseOrder from './view/window/orderpage/RefuseOrder';
import  MainSetting from './view/window/setting/MainSetting';
import  ClassifyOrder from './view/window/setting/ClassifyOrder';
import ClassifyPaiXu from './view/window/setting/ClassifyPaiXu';
import  ClassifyDetails from './view/window/setting/ClassifyDetails';
import ClassifyAdd from './view/window/setting/ClassifyAdd';
import GoodsManage from './view/window/setting/GoodsManage';
import  AccountSercity from './view/window/setting/AccountSercity';

// import  MessageMain from './view/window/message/MessageMain';
import  MineMessage from './view/window/message/MineMessage';
import  PicketMoney from './view/window/message/PicketMoney';
import  AccountInCom from './view/window/message/AccountInCom';
import TodayDetail from './view/window/message/TodayDetail';
import ConsumerMoney from './view/window/message/ConsumerMoney';
import  MineEnjoyed from './view/window/message/MineEnjoyed';

import NewsMain from './view/window/news/NewsMain';
import NewsMessage from './view/window/news/NewsMessage';
import DongTai from './view/window/news/DongTai';
import TongXunLu from './view/window/news/TongXunLu';
import HeXiaoView from './view/hexiao/HeXiaoView'
// import ToolsTotal from './view/tools/ToolsTotal'
import AccountYanZheng from './view/window/setting/AccountYanZheng';
import EndOrder from './view/window/orderpage/EndOrder';
import EndOrderFirst from './view/window/orderpage/EndOrderFirst';
import EndOrderSecond from './view/window/orderpage/EndOrderSecond';
// import MyOrder from './view/tools/MyOrder';
// import DaiSongOrder from './view/tools/DaiSongOrder';
// import UserXuZhi from './view/tools/UserXuZhi';
import MyGreated from './view/window/message/MyGreated';
import DongTaiDetails from './view/window/news/DongTaiDetails';
import DongTaiFirst from './view/window/news/DongTaiFirst';
import DongTaiPing from './view/window/news/DongTaiPing';
import ProgressOrderDetail from './view/window/orderpage/ProgressOrderDetail';
import YiChangOrder from './view/window/orderpage/YiChangOrder';
import ChargeView from './view/window/message/ChargeView';
import DaoOrderDetail from './view/window/orderpage/DaoOrderDetail';
import ProgressNews from './view/window/orderpage/ProgressNews';
import CommonModal from './view/CommonPage/ComonModal';
import ProgressDaoDetails from './view/window/orderpage/ProgressDaoDetails';
import OrderFinally from './view/window/orderpage/OrderFinally';
import OrderFinalFirst from './view/window/orderpage/OrderFinalFirst';
import OrderFinalSecond from './view/window/orderpage/OrderFinalSecond';
import TotalDiaoDu from './view/window/diaodu/TotalDiaoDu';
import DiaoDuFirst from './view/window/diaodu/DiaoDuFirst';
import DiaoDuSec from './view/window/diaodu/DiaoDuSec';
import EndOrderDetail from './view/window/orderpage/EndOrderDetail';
import OrderFinalDetail from './view/window/orderpage/OrderFinalDetail';
import  OrderPingJia from './view/window/orderpage/OrderPingJia';
import DiaoDuDetail from './view/window/diaodu/DiaoDuDetail';
import ZhiPaiView from './view/window/diaodu/ZhiPaiView';
import ZhiPaiWho from './view/window/diaodu/ZhiPaiWho';
import EndDetail from './view/window/diaodu/EndDetail';
import YiZhiPaiView from './view/window/diaodu/YiZhiPaiView'
import PersonalView from './view/window/diaodu/PersonalView'
import DiaoDuModal from './view/window/diaodu/DiaoDuModal';
import PersonalMessage from './view/window/diaodu/PersonalMessage'
import SaFeView from './view/SaFeView'
import OrderSecondDetail from './view/window/orderpage/OrderSecondDetail'
import ProgressDaoOrder from './view/window/orderpage/ProgressDaoOrder'
import ProgressDaoNews from './view/window/orderpage/ProgressDaoNews'
import EndOrderDao from './view/window/orderpage/EndOrderDao'
import EndOrderDaoDetail from './view/window/orderpage/EndOrderDaoDetail'
import EndOrderDaoNews from './view/window/orderpage/EndOrderDaoNews'
import EndOrderYiChang from './view/window/orderpage/EndOrderYiChang'
import EndDaoYiDetail from './view/window/orderpage/EndDaoYiDetail'
import EndDaoYiNews from './view/window/orderpage/EndDaoYiNews'
//订单详情
import EndOrderFirstYiDetail from './view/window/orderpage/EndOrderFirstYiDetail'
import OrderFinalSecDetail from './view/window/orderpage/OrderFinalSecDetail'
import OrderLocation from './view/window/orderpage/OrderLocation'
import AccountMessage from './view/window/setting/AccountMessage'
import GaiBangPhone  from './view/window/setting/GaiBangPhone'
import GaiBangYanZheng from './view/window/setting/GaiBangYanZheng'
import DuanXinLogin from './view/DuanXinLogin'
import DuanXinRegister from './view/DuanXinRegister'
import SearchOrder from './view/search/SearchOrder'
import  SearchOrderHistory from './view/search/SearchOrderHistory'
import DiaoSearchOrder from './view/window/diaodu/DiaoSearchOrder'
import DiaoSearchHistory from './view/window/diaodu/DiaoSearchHistory'
import OrderGaiLan from './view/hexiao/OrderGaiLan'
import EndOrderFir from './view/window/orderpage/EndOrderFir'
import EndOrderFirstNews from './view/window/orderpage/EndOrderFirstNews'
import EndOrderFirYiCh from './view/window/orderpage/EndOrderFirYiCh'
import EndOrderFirYiNews from './view/window/orderpage/EndOrderFirYiNews'
import OrderFinalFir from './view/window/orderpage/OrderFinalFir'
import OrderFinalFirNews  from './view/window/orderpage/OrderFinalFirNews'
import OrderFinalSec from './view/window/orderpage/OrderFinalSec'
import OrderFinalSecNews from './view/window/orderpage/OrderFinalSecNews'
import GpsIosLocation from './view/window/orderpage/GpsIosLocation'
import ChatViews from './view/window/news/ChatViews'
const StackNavi=StackNavigator({
 Index:{
     screen:Index,

 },
 PublicOder:{
     screen:PublicOder,
     navigationOptions: ({navigation}) => navigationOptions(navigation, "公告")
 },
    Register:{
        screen:Register,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "注  册")
    },
   Login:{
    screen:Login,
    // navigationOptions: ({navigation}) => navigationOptions(navigation, "登  录")
},


    ForgetView:{
     screen:ForgetView,
        navigationOptions: ({navigation}) => Zhu_navigationOptions(navigation, "安全认证")
    },
    ForgetViewTwo:{
        screen:ForgetViewTwo,
        navigationOptions: ({navigation}) => Zhu_navigationOptions(navigation, "忘记密码")
    },
    ForgetViewThree:{
        screen:ForgetViewThree,
        navigationOptions: ({navigation}) => Zhu_navigationOptions(navigation, "忘记密码")
    },
    DuanXinLogin:{
        screen:DuanXinLogin,
        navigationOptions:({navigation}) => Zhu_navigationOptions(navigation, "短信登录")
    },




    SaFeView:{
     screen:SaFeView,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "安全认证")
    },
    ResetPwd:{
     screen:ResetPwd,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "更改密码")
    },
    // SearchView:{
    //     screen:SearchView,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "搜  索")
    // },
    // RestaurantView:{
    //     screen:RestaurantView,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "搜  索")
    // },
    // RestaurantSec:{
    //     screen:RestaurantSec,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "搜  索")
    // },
    // SearchResult:{
    //  screen:SearchResult,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "搜索结果")
    // },
    // SearchDetail:{
    //  screen:SearchDetail,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "订单详情")
    // },

    TotalOrder:{
     screen:TotalOrder,
        // navigationOptions: ({navigation}) => navigationOptions(navigation, "外送")
    },
    ComonModal:{
        screen:ComonModal,
    },
    OrderDetails:{
     screen:OrderDetails,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "订单详情")
    },
    OrderFirst:{
     screen:OrderFirst
    },
    BeiZhu:{
     screen:BeiZhu,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "订单备注")
    },
    RefuseOrder:{
     screen:RefuseOrder,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "申请拒单")
    },
    MainSetting:{
     screen:MainSetting,
        // navigationOptions: ({navigation}) => navigationOptions(navigation, "设置")
    },
    ClassifyOrder:{
     screen:ClassifyOrder,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "商品分类")
    },
    ClassifyPaiXu:{
     screen:ClassifyPaiXu,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "商品分类")
    },
    ClassifyDetails:{
     screen:ClassifyDetails,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "自定义分类")
    },
    ClassifyAdd:{
     screen:ClassifyAdd,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "添加到分类")
    },
    GoodsManage:{
     screen:GoodsManage,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "商品管理")
    },
    // GoodsAdding:{
    //  screen:GoodsAdding,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "添加商品")
    // },
    // FeiYongManage:{
    //  screen:FeiYongManage,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "费用管理")
    // },
    // QuicklyInput:{
    //  screen:QuicklyInput,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "快捷输入")
    // },
    // BianJiGoods:{
    //  screen:BianJiGoods,
    //     navigationOptions: ({navigation}) => navigationOptions(navigation, "编辑商品")
    // },
    AccountSercity:{
     screen:AccountSercity,
        navigationOptions: ({navigation}) => navigationOptions(navigation, "账户与安全")
    },
    // DianMessage:{
    //  screen:DianMessage,
    //     navigationOptions:({navigation}) => navigationOptions(navigation, "店铺信息")
    // },
    // MessageMain:{
    //  screen:MessageMain,
    //     // navigationOptions:({navigation}) => navigationOptions(navigation, "店铺信息")
    // },
    MineMessage:{
     screen:MineMessage,
        navigationOptions:({navigation}) => navigationOptions(navigation, "我  的")
    },
    PicketMoney:{
     screen:PicketMoney,
        navigationOptions:({navigation}) => navigationOptions(navigation, "钱   包")
    },
    AccountInCom:{
     screen:AccountInCom,
        navigationOptions:({navigation}) => navigationOptions(navigation, "收资记录")
    },
    TodayDetail:{
     screen:TodayDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    ConsumerMoney:{
     screen:ConsumerMoney,
        navigationOptions:({navigation}) => navigationOptions(navigation, "钱   包")
    },
    MineEnjoyed:{
     screen:MineEnjoyed,
        navigationOptions:({navigation}) => navigationOptions(navigation, "新消息提醒")
    },
    NewsMain:{
     screen:NewsMain,

    },
    NewsMessage:{
     screen:NewsMessage,

    },
    DongTai:{
     screen:DongTai,

    },
    TongXunLu:{
     screen:TongXunLu
    },
    HeXiaoView:{
     screen:HeXiaoView,
        navigationOptions:({navigation}) => navigationOptions(navigation, "核   销")
    },
    AccountYanZheng:{
     screen:AccountYanZheng,
        navigationOptions:({navigation}) => navigationOptions(navigation, "安全认证")
    },
    EndOrder:{
     screen:EndOrder,
        navigationOptions:({navigation}) => navigationOptions(navigation, "安全验证")
    },
    EndOrderFirst:{
     screen:EndOrderFirst,

    },EndOrderSecond:{
     screen:EndOrderSecond
    },

    MyGreated:{
     screen:MyGreated,
        navigationOptions:({navigation}) => navigationOptions(navigation, "个人信息")
    },
    DongTaiDetails:{
     screen:DongTaiDetails,
        navigationOptions:({navigation}) => navigationOptions(navigation, "我赞过的")
    },
    DongTaiFirst:{
     screen:DongTaiFirst
    },
    DongTaiPing:{
     screen:DongTaiPing
    },
    ProgressOrderDetail:{
     screen:ProgressOrderDetail,
     navigationOptions:({navigation}) => navigationOptions(navigation, "我的订单")
    },
    YiChangOrder:{
     screen:YiChangOrder,
        navigationOptions:({navigation}) => navigationOptions(navigation, "异常订单")
    },
    ChargeView:{
     screen:ChargeView,
        navigationOptions:({navigation}) => navigationOptions(navigation, "钱   包")
    },
    DaoOrderDetail:{
     screen:DaoOrderDetail
    },
    ProgressNews:{
     screen:ProgressNews
    },
    ProgressDaoDetails:{
     screen:ProgressDaoDetails
    },
    OrderFinally:{
     screen:OrderFinally,

    },
    OrderFinalFirst:{
     screen:OrderFinalFirst
    },
    OrderFinalSecond:{
     screen:OrderFinalSecond
    },
    // TotalDiaoDu:{
    //  screen:TotalDiaoDu
    // },
    // DiaoDuFirst:{
    //  screen:DiaoDuFirst
    // },
    // DiaoDuSec:{
    //  screen:DiaoDuSec
    // },
    EndOrderDetail:{
     screen:EndOrderDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    OrderFinalDetail:{
     screen:OrderFinalDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    OrderPingJia:{
     screen:OrderPingJia,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单评价")
    },
    // DiaoDuDetail:{
    //  screen:DiaoDuDetail,
    //     navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    // },
    // ZhiPaiView:{
    //  screen:ZhiPaiView,
    //     navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    // },
    // ZhiPaiWho:{
    //  screen:ZhiPaiWho,
    //     navigationOptions:({navigation}) => navigations(navigation, "指定派送")
    // },
    // EndDetail:{
    //  screen:EndDetail,
    //     navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    // },
    // YiZhiPaiView:{
    //  screen:YiZhiPaiView,
    //     navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    // },
    // PersonalView:{
    //  screen:PersonalView,
    //     navigationOptions:({navigation}) => navigations(navigation, "我  的")
    // },
    // DiaoDuModal:{
    //  screen:DiaoDuModal,
    //
    // },
    // PersonalMessage:{
    //  screen:PersonalMessage,
    //     navigationOptions:({navigation}) => navigations(navigation, "个人信息")
    // },
    OrderSecondDetail:{
     screen:OrderSecondDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    ProgressDaoOrder:{
     screen:ProgressDaoOrder,
    },
    ProgressDaoNews:{
     screen:ProgressDaoNews,

    },
    EndOrderDao:{
     screen:EndOrderDao,
    },
    EndOrderDaoDetail:{
     screen:EndOrderDaoDetail,
    },
    EndOrderDaoNews:{
     screen:EndOrderDaoNews,
    },
    EndOrderYiChang:{
     screen:EndOrderYiChang,
    },
    EndDaoYiDetail:{
     screen:EndDaoYiDetail
    },
    EndDaoYiNews:{
     screen:EndDaoYiNews
    },
    EndOrderFirstYiDetail:{
     screen:EndOrderFirstYiDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    OrderFinalSecDetail:{
     screen:OrderFinalSecDetail,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单详情")
    },
    OrderLocation:{
     screen:OrderLocation,
        navigationOptions:({navigation}) => navigationOptions(navigation, "用户位置")
    },
    AccountMessage:{
     screen:AccountMessage,
        navigationOptions:({navigation}) => navigationOptions(navigation, "安全认证")
    },
    GaiBangPhone:{
     screen:GaiBangPhone,
        navigationOptions:({navigation}) => navigationOptions(navigation, "改绑手机")
    },
    GaiBangYanZheng:{
     screen:GaiBangYanZheng,
        navigationOptions:({navigation}) => navigationOptions(navigation, "改绑手机")
    },
    DuanXinRegister:{
     screen:DuanXinRegister,
        navigationOptions:({navigation}) => navigationOptions(navigation, "短信登录")
    },
    SearchOrder:{
     screen:SearchOrder,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单搜索")
    },
    SearchOrderHistory:{
     screen:SearchOrderHistory,
        navigationOptions:({navigation}) => navigationOptions(navigation, "搜索历史")
    },
    // DiaoSearchOrder:{
    //  screen:DiaoSearchOrder,
    //     navigationOptions:({navigation}) => navigations(navigation, "订单搜索")
    // },
    // DiaoSearchHistory:{
    //  screen:DiaoSearchHistory,
    //     navigationOptions:({navigation}) => navigations(navigation, "搜索历史")
    // },
    OrderGaiLan:{
     screen:OrderGaiLan,
        navigationOptions:({navigation}) => navigationOptions(navigation, "订单概览")
    },
    EndOrderFir:{
     screen:EndOrderFir
    },
    EndOrderFirstNews:{
     screen:EndOrderFirstNews,
    },
    EndOrderFirYiCh:{
     screen:EndOrderFirYiCh,
    },
    EndOrderFirYiNews:{
     screen:EndOrderFirYiNews
    },
    OrderFinalFir:{
     screen:OrderFinalFir
    },
    OrderFinalFirNews:{
     screen:OrderFinalFirNews
    },
    OrderFinalSec:{
     screen:OrderFinalSec
    },
    OrderFinalSecNews:{
     screen:OrderFinalSecNews
    },
    GpsIosLocation:{
        screen:GpsIosLocation

    },
    ChatViews:{
     screen:ChatViews
    }



},{
    initialRouteName:'Index',
    initialRouteParams: {isShowActivity: true},
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    gesturesEnabled:false,

})
/* *************************通用导航栏************************* */

const navigationOptions = (navigation, title, isBackHome) => {


    var header = (
        <View>

       <CommonModal style={{position:'absolute', zIndex:1000,}} navigation={navigation} />

        <View style={Styles.headerContainer}>
            {/*内容*/}

            <Text allowFontScaling={false} style={Styles.middleTitle}>
                {title}
            </Text>

            {/*左边返回按钮*/}
            <TouchableOpacity style={Styles.leftImgBtn} onPress={() => {

                if (isBackHome) {

                    navigation.goBack('Index');

                } else {

                    navigation.goBack(null);

                }

            }}>
                <Image source={require("./img/page/arrow.png")}/>
            </TouchableOpacity>


            {/*<View style={Styles.leftImgBtn}/>*/}

        </View>

        </View>
    );

    var gesturesEnabled = false;

    return {header, gesturesEnabled};

}

const Zhu_navigationOptions = (navigation, title, isBackHome) => {

    var header = (
        <View style={{backgroundColor: "#fff"}}>
            <View
                style={{
                    height: 45,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingRight: 0,
                    width:Contents.Screen.width,
                    marginTop:(Platform.OS=='android')?10:25,
                    paddingLeft:10,

                }}>
                {/*内容*/}

                {/*左边返回按钮*/}
                <TouchableOpacity style={{  width:45  }}
                                  onPress={() => {

                                      if (isBackHome) {

                                          navigation.goBack('Index');

                                      } else {

                                          navigation.goBack(null);

                                      }

                                  }}>
                    <Image source={require("./img/login/gob.png")}/>
                </TouchableOpacity>
                <View style={{
                    height: 45,
                    width:Contents.Screen.width-100,
                    justifyContent: "center",
                    alignItems:'center',

                }}>
                    <Text style={{
                        textAlign:'center',
                        color:'#FF305E',
                        width:'100%',
                        alignItems:'center',
                        fontSize: 18,}} allowFontScaling={false} >
                        {title}
                    </Text>
                </View>


                {/*<View style={Styles.leftImgBtn}/>*/}

            </View>
        </View>
    );

    var gesturesEnabled = false;

    return {header, gesturesEnabled};

}

// const navigations=(navigation,title,isBackHome)=>{
//     var header = (
//         <View>
//             <DiaoDuModal style={{position:'absolute', zIndex:1000,}} navigation={navigation} />
//             <View  style={Styles.headerContainer}>
//                 {/*内容*/}
//                 <Text allowFontScaling={false} style={Styles.middleTitle}>
//                     {title}
//                 </Text>
//
//                 {/*左边返回按钮*/}
//                 <TouchableOpacity style={Styles.leftImgBtn} onPress={() => {
//
//                     if (isBackHome) {
//
//                         navigation.goBack('Index');
//
//                     } else {
//
//                         navigation.goBack(null);
//
//                     }
//
//                 }}>
//                     <Image source={require("./img/page/arrow.png")} style={Styles.image}/>
//                 </TouchableOpacity>
//
//
//                 <View style={Styles.leftImgBtn}/>
//
//             </View>
//         </View>
//     );
//
//     var gesturesEnabled = false;
//
//     return {header, gesturesEnabled};
//
// }


const Styles = StyleSheet.create({

    //导航栏样式
    headerContainer: {

        height: 60,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 0,
        width: "100%",
        marginTop:Platform.OS=='android'?StatusBar.currentHeight:20

    },

    leftImgBtn: {
        width: 105,
        height: 55,
        alignItems: "flex-end",
        justifyContent: "center",
        alignSelf:'flex-end',
        marginRight:Contents.Screen.width/6+10
    },

    middleTitle: {

        fontSize: 18,
        marginLeft:20,
    },
    image:{
        position:'absolute',
    }
})


export default StackNavi;