import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    BackHandler,
    ToastAndroid,
    DeviceEventEmitter,

} from 'react-native';
import Contants from '../common/Contants';
import GGInput from '../common/LogGGInput';
import {

    StackNavigator,
    DrawerNavigator,
    NavigationActions
} from "react-navigation"
import {Button} from 'native-base';
import Toast from "react-native-easy-toast";
import Storage from '../common/GGAsyncStorage'
import {API, postFetch, ObjectTransform} from '../common/GConst'
import LoginModule from '../view/window/nativemodal/LoginModule'
import ChatModal from '../view/window/nativemodal/ChatModal'

export default class Login extends Component {
    constructor(props) {
        super(props)
    }

    _androidBack = () => {
        // alert('back');
        if (this.lastBackPressed && (Date.now() - this.lastBackPressed ) < 2000) {
            BackHandler.exitApp();
        } else {
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按返回退出应用', ToastAndroid.SHORT);
        }
        return true;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this._androidBack);
    }

    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled: false,

    })

    render() {
        return (
            <View style={styles.contain}>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    width: Contants.Screen.width,
                    height: Contants.Screen.height,
                    backgroundColor:'#fff'
                }}>
                    <View style={{flexDirection: 'row',alignItems:'flex-end'}}>
                        <Image source={require('../img/login/logo.png')}
                               style={{marginTop: 70,height:32,width:180, marginLeft: 20,marginRight:10}}/>
                        <Text style={{color:'#FF305E',fontSize:16}}>配送</Text>
                    </View>

                    <View style={{width:Contants.Screen.width-40,flexDirection: 'row',alignItems:'center',
                        marginTop:50,  marginLeft: 20,marginRight:20}}>
                        <View style={{width:100,height:30, borderBottomWidth:5,borderBottomColor:'#FF305E'}}>
                            <Text style={{color:'#FF305E',fontSize:16,textAlign:'left'}}>账号密码登录</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>{this.props.navigation.navigate('DuanXinLogin')}}
                            style={{width:Contants.Screen.width-140,height:30,
                                marginBottom:2,
                                borderBottomWidth:2,borderBottomColor:'#FF305E'}}>
                            <Text style={{color:'#afafaf',fontSize:16,textAlign:'right'}}>手机验证登录</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{width:Contants.Screen.width-40, marginTop:20,  marginLeft: 20,marginRight:20,padding:10,
                        borderRadius:10,

                        shadowOffset:{h:1,w:1},
                        shadowRadius:5,
                        shadowOpacity:0.8,
                        shadowColor:'#f2f2f2',
                        borderWidth:1,
                        borderColor:'#f2f2f2',
                        elevation: 4,
                    }}>

                        <GGInput
                            ref={e => this._userText = e}
                            style={[styles.input, {alignItems:'center'}]}
                            isPwd={false}
                            leftTitle={"手机号码:"}
                            placeholder={"请输入手机号"}
                            keyboardType={"numeric"}
                        />


                        <View style={styles.hengt}/>

                        <GGInput
                            ref={e => this._pwdText = e}
                            style={[styles.input, {marginTop: 0}]}
                            isPwd={true}
                            leftTitle={"登陆密码:"}
                            placeholder={"请输入密码"}/>

                    </View>

                    {/*<View style={styles.hengt}/>*/}


                    <TouchableOpacity onPress={this.loginAction.bind(this)}
                                      style={[styles.logins,{
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: "center",
                                          marginTop: 20,
                                          alignSelf: 'center',
                                          height:35,
                                          width:Contants.Screen.width-40,
                                          backgroundColor:'#ff305e',
                                          borderRadius:5
                                      }]}>

                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                            backgroundColor: 'transparent',
                        }}>登 录</Text>

                    </TouchableOpacity>


                    <View style={[styles.items]}>
                        <TouchableOpacity style={styles.heng} onPress={this.forgetAction}>
                            <Text style={[styles.mima,{color:'red'}]}>登录遇到问题？</Text>
                        </TouchableOpacity>
                    </View>

                    <Toast
                        ref={(e) => {
                            this._toast = e
                        }}
                        position='center'
                    />
                </View>
            </View>
        );
    }

    registerAction = () => {
        this.props.navigation.navigate('Register')
    }
    forgetAction = () => {
        this.props.navigation.navigate('ForgetView')
    }

    loginAction() {
        this._pwdText._input.blur();
        this._userText._input.blur();
        let toast = this._toast;
        let phoneNum = this._userText.state.content;
        let pwd = this._pwdText.state.content;
        if (!phoneNum) {
            toast.show('请输入手机号');
            return
        }
        if (!pwd) {
            toast.show('请输入密码');
            return;
        }
        //手机号验证
        var reg = /^1[34578]\d{9}$/;
        if (!reg.test(this._userText.state.content)) {
            this._toast.show('手机格式错误');
            return;
        }
        if (pwd.length < 6) {
            this._toast.show('密码格式错误');
            return;
        }

        fetch("http://122.112.196.52:8080/mtool/portal/api/user/member/login", {
            method: "POST",
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
            body: JSON.stringify({
                username: phoneNum,
                password: pwd
            })
        }).then((response) => (
            response.json()
        ).then((responseData) => {


            if (responseData.status == 1) {
                if (responseData.data.type != 3 && responseData.data.type != 4){
                    toast.show("请使用，配送员或调度员账号登录");
                    return;
                }

                toast.show(responseData.msg)
                Storage.save("isLogin", true);
                Storage.save("phoneNumber", phoneNum);
                Storage.save("pwd", pwd)
                Storage.save("userId", responseData.data.id)
                if (responseData.data.type == 4) {
                    // Storage.save("isLogin",true);
                    // Storage.save("phoneNumber",phoneNum);
                    // Storage.save("pwd",pwd)
                    // Storage.save("userId",responseData.data.id)
                    Storage.save("type", responseData.data.type)
                    DeviceEventEmitter.emit('DiaoDu', '调度页面')
                    BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
                    this.props.navigation.navigate("TotalDiaoDu")

                }
                else {
                    //下面两行报错，先注释掉 -------朱森方
                    // ChatModal.login(responseData.data.hxUsername, responseData.data.hxPassword, responseData.data.nickname, responseData.data.picUrl)
                    // LoginModule.setUserId(responseData.data.id.toString())

                    BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
                    this.props.navigation.navigate('Index', {data: 0});
                }
                // alert(JSON.stringify(responseData.data.id))


            } else {
                toast.show(responseData.msg)
            }

        }).catch((error) => {
            // alert(error)
        }))

    }
}

const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: "#f9f9f9"
    },
    containto: {
        marginTop: 20,
        width: Contants.Screen.width,
        height: Contants.Screen.height / 2
    },
    input: {
        flexDirection: "row",
        alignSelf: 'center',
        backgroundColor: "transparent",
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
        alignSelf: 'center',

    },
    text: {
        borderColor: 'black',

    },
    zhuce: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        backgroundColor: '#333',
        height: 60
    },
    mima: {
        color: '#FF305E',
        // marginLeft: 30,
        marginTop: 20,
        textAlign:'center',
        fontSize: 14,
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    denglu: {
        color: '#FF305E',
        marginRight: 30,
        marginTop: 20,
        fontSize: 12,
    },
    heng: {
        flex:1,
        flexDirection: 'column',

    },
    xia: {
        width: 61,
        height: 1,
        backgroundColor: '#FF305E',
        marginLeft: 30
    },
    xiaf: {
        width: 61,
        height: 1,
        backgroundColor: '#FF305E',
        // marginLeft:20
    },
    xias: {
        width: 49,
        height: 1,
        backgroundColor: '#FF305E',
        marginRight: 30
    },
    zuixia: {
        // flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: Contants.Screen.height / 3
    },
    texts: {
        fontSize: 10
    },
    buttom: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    logins: {
        alignSelf: 'center',
    },
    hengt:{
        height:2,
        backgroundColor:'red',
    },
})