import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import comstyle from '../../../common/CommonStyle';
import {API,postFetch} from '../../../common/GConst';
import Contants from '../../../common/Contants'
import Toast from 'react-native-easy-toast';
// import *as wechat from 'react-native-wechat'
export default class ChargeView extends Component{
    constructor(props){
        super(props)
        this.state={
            changePrice:''
        }
    }
    componentDidMount (){
        wechat.registerApp('wx1ccb336f561e993d')
    }
      render(){
          return(<View style={[comstyle.contain,{backgroundColor:'#f9f9f9'}]}>
              {/*<Text>sss</Text>*/}
              <View style={styles.zhif}>
               <View style={styles.fu}>
                   <Text style={styles.text}>支付方式</Text>
                   <Image source={require('../../../img/shezhi/weixin.png')}/>
                   <Text>微信支付</Text>
               </View>
              </View>
              <View style={{width:Contants.Screen.width,height:2,backgroundColor:'#E5E5E5'}}></View>
              <View style={styles.zhif}>
                  <Text style={styles.text}>充值金额</Text>
                  <View style={styles.xie}>
                      <Image source={require('../../../img/shezhi/renmb.png')}/>
                      <TextInput style={styles.input}
                                 onChangeText={(e)=>{
                                 this.setState({
                                 changePrice:e,
                                 })}}
                      />
                  </View>
              </View>
              <TouchableOpacity style={styles.chong} onPress={this.zhifu.bind(this)}>
                  <Image
                      source={require('../../../img/shezhi/chongzhi.png')}
                      style={styles.chong}
                  >
                      <Text style={styles.zhi}>下一步</Text>
                  </Image>
              </TouchableOpacity>
          </View>)
      }
    zhifu(){
   postFetch(API.WeChatZhif,{totalPrice:this.state.changePrice,pathType:'0',pathName:'微信支付'},(result)=>{
       alert(JSON.stringify(result))
       if(result.status==1){
           try{
               // let payResult=wechat.pay({
               //     partnerId:result.data.partnerid,
               //     prepayId:result.data.prepayid,
               //     nonceStr:result.data.noncestr,
               //     timeStamp:result.data.timestamp,
               //     package:result.data.package,
               //     sign:result.data.sign
               // })
           } catch (error){
              alert(error)
           }
       }
   })
    }
}
const styles=StyleSheet.create({
    zhif:{
       width:Contants.Screen.width,
       height:100,
        backgroundColor:'#FFFFFF',
        marginTop:20,
        flexDirection:'column',
    },
    fu:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
    },
    text:{
        color:'#2D2D2D',
        margin:20,
        fontSize:14
    },
    xie:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:20,
        marginBottom:10
    },
    input:{
        width:Contants.Screen.width-40
    },
    chong:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    zhi:{
        color:'white',
    }
})