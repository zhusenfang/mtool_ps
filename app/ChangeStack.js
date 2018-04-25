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
import DiaoDuDetail from './view/window/diaodu/DiaoDuDetail';
import ZhiPaiView from './view/window/diaodu/ZhiPaiView';
import ZhiPaiWho from './view/window/diaodu/ZhiPaiWho';
import EndDetail from './view/window/diaodu/EndDetail';
import YiZhiPaiView from './view/window/diaodu/YiZhiPaiView'
import PersonalView from './view/window/diaodu/PersonalView'
import DiaoDuModal from './view/window/diaodu/DiaoDuModal';
import PersonalMessage from './view/window/diaodu/PersonalMessage'
import TotalDiaoDu from './view/window/diaodu/TotalDiaoDu';
import DiaoDuFirst from './view/window/diaodu/DiaoDuFirst';
import DiaoDuSec from './view/window/diaodu/DiaoDuSec';
import DiaoSearchOrder from './view/window/diaodu/DiaoSearchOrder'
import DiaoSearchHistory from './view/window/diaodu/DiaoSearchHistory'
import Login from './view/Login'
import  AccountSercity from './view/window/setting/AccountSercity';
import AccountYanZheng from './view/window/setting/AccountYanZheng';
import AccountMessage from './view/window/setting/AccountMessage'
import GaiBangPhone  from './view/window/setting/GaiBangPhone'
import GaiBangYanZheng from './view/window/setting/GaiBangYanZheng'
import DuanXinLogin from './view/DuanXinLogin'
import DuanXinRegister from './view/DuanXinRegister'
import ResetPwd from './view/ResetPwd'
//消息
import NewsView from './view/window/diaodu/NewsView'
import MessageView from './view/window/diaodu/MessageView'
import TongXunView from './view/window/diaodu/TongXunView'
const ChangeStack=StackNavigator({
    DiaoDuDetail:{
        screen:DiaoDuDetail,
        navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    },
    ZhiPaiView:{
        screen:ZhiPaiView,
        navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    },
    ZhiPaiWho:{
        screen:ZhiPaiWho,
        navigationOptions:({navigation}) => navigations(navigation, "指定派送")
    },
    EndDetail:{
        screen:EndDetail,
        navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    },
    YiZhiPaiView:{
        screen:YiZhiPaiView,
        navigationOptions:({navigation}) => navigations(navigation, "订单详情")
    },
    PersonalView:{
        screen:PersonalView,
        navigationOptions:({navigation}) => navigations(navigation, "我  的")
    },
    DiaoDuModal:{
        screen:DiaoDuModal,

    },
    PersonalMessage:{
        screen:PersonalMessage,
        navigationOptions:({navigation}) => navigations(navigation, "个人信息")
    },
    TotalDiaoDu:{
        screen:TotalDiaoDu
    },
    DiaoDuFirst:{
        screen:DiaoDuFirst
    },
    DiaoDuSec:{
        screen:DiaoDuSec
    },
    DiaoSearchOrder:{
     screen:DiaoSearchOrder,
        navigationOptions:({navigation}) => navigations(navigation, "订单搜索")
    },
    DiaoSearchHistory:{
     screen:DiaoSearchHistory,
        navigationOptions:({navigation}) => navigations(navigation, "搜索历史")
    },
    Login:{
        screen:Login
    },
    AccountSercity:{
        screen:AccountSercity,
        navigationOptions: ({navigation}) => navigations(navigation, "账户与安全")
    },
    AccountYanZheng:{
        screen:AccountYanZheng,
        navigationOptions:({navigation}) => navigations(navigation, "安全认证")
    },
    AccountMessage:{
        screen:AccountMessage,
        navigationOptions:({navigation}) => navigations(navigation, "安全认证")
    },
    GaiBangPhone:{
        screen:GaiBangPhone,
        navigationOptions:({navigation}) => navigations(navigation, "改绑手机")
    },
    GaiBangYanZheng:{
        screen:GaiBangYanZheng,
        navigationOptions:({navigation}) => navigations(navigation, "改绑手机")
    },
    DuanXinLogin:{
        screen:DuanXinLogin,
        navigationOptions:({navigation}) => navigations(navigation, "短信登录")
    },
    DuanXinRegister:{
        screen:DuanXinRegister,
        navigationOptions:({navigation}) => navigations(navigation, "短信登录")
    },
    ResetPwd:{
        screen:ResetPwd,
        navigationOptions: ({navigation}) => navigations(navigation, "更改密码")
    },
    NewsView:{
        screen: NewsView
    },
    MessageView:{
        screen:MessageView
    },
    TongXunView:{
        screen:TongXunView
    }

},{
    initialRouteName:'TotalDiaoDu',
    initialRouteParams: {isShowActivity: true},
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    gesturesEnabled:false,

})

const navigations=(navigation,title,isBackHome)=>{
    var header = (
        <View>
            <DiaoDuModal style={{position:'absolute', zIndex:1000,}} navigation={navigation} />
            <View  style={Styles.headerContainer}>
                {/*内容*/}
                <Text allowFontScaling={false} style={Styles.middleTitle}>
                    {title}
                </Text>

                {/*左边返回按钮*/}
                <TouchableOpacity style={Styles.leftImgBtn} onPress={() => {

                    if (isBackHome) {

                        navigation.goBack('TotalDiaoDu');

                    } else {

                        navigation.goBack(null);

                    }

                }}>
                    <Image source={require("./img/page/arrow.png")} style={Styles.image}/>
                </TouchableOpacity>


                {/*<View style={Styles.leftImgBtn}/>*/}

            </View>
        </View>
    );

    var gesturesEnabled = false;

    return {header, gesturesEnabled};

}
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
        marginTop:Platform.OS==='android'?0:20

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


export default ChangeStack;