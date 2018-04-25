import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Button,
    ListView,
    ScrollView,
    Platform,
    Switch,
    AsyncStorage,
    BackHandler
} from 'react-native';
import Contants from '../../common/Contants'
import comstyle from '../../common/CommonStyle';
import Modal from 'react-native-modal';
import Toast from "react-native-easy-toast";
import {API,postFetch} from '../../common/GConst';

import Storage from '../../common/GGAsyncStorage'
import MyTimer from '../../common/MyTimer'

var TimerMixin=require('react-timer-mixin');
var hotlist=[]
var pagelist=[]
var dismissKeyboard=require('dismissKeyboard');
export default class SearchOrder extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props);
        // this.shit().bind(this)
        this.state={
            text:'',
            isStyle:false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            dataSourceimg: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            hotList:[],
            hisList:[],
            time:0,
            data:[]
        }

    }
    componentDidMount(){
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);
        }
    }
    _androidBack = () => {

        this.props.navigation.goBack()

        return true;

    }
    componentWillUnmount(){
        if(Platform.OS==='android'){
            BackHandler.removeEventListener('hardwareBackPress', this._androidBack);
        }
    }
    render(){
        // Storage.get('searchorder').then((tagss)=>{
        //     // alert(tagss)
        //     this.setState({
        //         hisList:tagss
        //     })
        // })
        // if(this.state.hisList!=null){
        //     // alert('sss')
        //     for(var j=0;j<this.state.hisList.length;j++){
        //         pagelist.push(<View style={styles.bord} key={j}><Text style={styles.keyword}>{this.state.hisList[j]}</Text></View>)
        //     }
        // }
        // for(var j=0;j<this.state.hisList.length;j++){
        //     pagelist.push(<View style={styles.bord} key={j}><Text style={styles.keyword}>{this.state.hisList[j]}</Text></View>)
        // }

        // for(var i=0;i<this.state.hotList.length;i++){
        //     hotlist.push(<View style={styles.bord} key={i}><Text style={styles.keyword}>{this.state.hotList[i].keyword}</Text></View>)
        // }
        var contview=null;
        if(this.state.isStyle==false){
            contview=(<View><View style={styles.his}>
                    <View style={comstyle.rightview}>
                        <Text style={styles.histext}>历史搜索</Text>
                    </View>
                    <View style={comstyle.leftview}>
                        <TouchableOpacity onPress={this.laji.bind(this)}>
                            <Image source={require('../../img/window/lajitong.png')} style={styles.maleft}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SearchOrderHistory')}}>
                            <Image source={require('../../img/search/shenglh.png')} style={comstyle.textright}/>
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={[comstyle.heng,{marginTop:15,flexDirection:'row',}]}/>

                    {/*<View style={{flexDirection:"row",flexWrap:'wrap',marginLeft:10,marginRight:10}}>*/}
                        {/*/!*{pagelist}*!/*/}
                    {/*</View>*/}
                    <View>
                        <Heading/>
                    </View>
                </View>
            )
        }else {
            contview=(

           <ScrollView
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}
            pagingEnabled={true}
            horizontal={false}
            onScroll={(e)=>{
            }}
           >
               {this.state.data.map((rowData,index)=>{
                   rowData.countdownTime -= 1000;
                   return(<TouchableOpacity style={styles.listview} onPress={this.shit.bind(this,rowData)} key={index}>
                       <View style={comstyle.rightview}>
                           <Image style={styles.searchimg} source={rowData.phase==0?require('../../img/daisong/shouli.png'):rowData.phase==1?require('../../img/order/daiqu.png'):rowData.phase==2?require('../../img/daisong/songda.png'):
                               rowData.phase==3||rowData.checkStatus==0?require('../../img/dian/yichang.png'):null}>
                               <Text style={{backgroundColor:'transparent',}}>{rowData.phase==0?'待受理':rowData.phase==1?"待取单":rowData.phase==2?"待送达":rowData.phase==3||rowData.checkStatus==0?'?':''}</Text>
                               <Text style={{backgroundColor:'transparent',}}>{rowData.phase==1?rowData.orderAlpha+'号':rowData.phase==2?rowData.orderAlpha+'号':""}</Text>
                           </Image>
                           <View style={{  flexDirection:'column', marginLeft:20}}>
                               <Text>{rowData.restaurantName}</Text>
                               <Text>{rowData.phase==0?'【新消息】您有新订单':rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3||rowData.checkStatus==0?'正在提交的异常单':'用户评价'+rowData.score!=undefined||rowData.score+'分'}</Text>
                           </View>
                       </View>
                       {rowData.phase==1?
                           <View style={styles.searchfinal}>

                               <Image source={rowData.orderType==0?require('../../img/order/bluequan.png'):require('../../img/daisong/greenquan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
                                   <Text style={{color:rowData.orderType==0?'#459CF4':'#33BAB2',fontSize:10,backgroundColor:'transparent',}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                               </Image>
                               {rowData.phase==1||rowData.checkStatus!=undefined||rowData.checkStatus==0?<Text style={{marginRight:20,fontSize:10,color:'#FF305E'}}>正在退单中</Text>:
                                   <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                                       (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                               }
                           </View>:rowData.phase==0?<View style={styles.searchfinal}>
                               <Image source={rowData.orderType==0?require('../../img/daisong/lanquan.png'):require('../../img/daisong/greenbig.png')} style={{marginRight:20,alignItems:'center',justifyContent:'center',backgroundColor:'transparent',}}>
                                   <Text style={{color:rowData.orderType==0?'#459CF4':'#33BAB2',fontSize:12}}>接单</Text>
                               </Image>
                           </View>:rowData.phase==2?
                               <View style={styles.searchfinal}>

                                   <Image source={rowData.orderType==0?require('../../img/order/bluequan.png'):require('../../img/daisong/greenquan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end',backgroundColor:'transparent',}}>
                                       <Text style={{color:rowData.orderType==0?'#459CF4':'#33BAB2',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                                   </Image>
                                   <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?
                                       (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                               </View>:
                               rowData.phase==3||rowData.checkStatus==0?
                                   <View style={styles.searchfinal}>

                                       <Image source={rowData.orderType==0?require('../../img/order/bluequan.png'):require('../../img/daisong/greenquan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end',backgroundColor:'transparent',}}>
                                           <Text style={{color:rowData.orderType==0?'#459CF4':'#33BAB2',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                                       </Image>
                                       <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?
                                           (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                                   </View>:
                                   <View style={styles.timeview}>
                                       <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getFullYear()+'-'}</Text>
                                       <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getMonth()+1+'-'}</Text>
                                       <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getDate()}</Text>
                                   </View>
                       }
                   </TouchableOpacity>)

               })}
           </ScrollView>
            )
        }

        return(<View style={styles.con}>
            <View style={styles.textinput}>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.inputsty}
                    placeholderTextColor="#B2B2B2"
                    onChangeText={(e)=>{
                        this.setState({
                            text:e,
                        })
                    }}
                    multiline={true}
                    placeholder={'输入信息'}
                    onFocus={()=>{this.setState({isStyle:true})}}
                >

                </TextInput>
                <TouchableOpacity onPress={this.searchdong.bind(this)}>
                    <Image source={require('../../img/page/srarch.png')} style={styles.img}/>
                </TouchableOpacity>
            </View>
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
            {/*<TouchableOpacity onPress={this.searchdong.bind(this)} style={styles.img}>*/}

            {/*</TouchableOpacity>*/}
            {contview}

        </View>)
    }
    laji(){
        Storage.delete('searchorder').then((tags)=>{
            this.setState({
                hisList:''
            })
        })
        pagelist.splice(0,pagelist.length)
    }
    searchdong(){
        dismissKeyboard();
        if(this.state.text==''){
            this._toast.show('请输入关键字')
            return
        }
        var hist=[this.state.text]
        Storage.get('searchorder').then((taggs)=>{
            if(taggs==null){
                taggs = new Array();
            }
            taggs.push(hist)
            AsyncStorage.setItem('searchorder', JSON.stringify(taggs),);
        })

        postFetch(API.SearchOrder,{keyWord:this.state.text},(result)=>{
            // alert(JSON.stringify(result))
            // alert(JSON.stringify(this.props))
            if(result.status==1){
                if(result.data==[] || result.data.length==0){
                    this._toast.show('搜索无结果')
                    return
                }
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data),
                    data:result.data,
                    // dataSourceimg:this.state.dataSourceimg.cloneWithRows(result.data.forumThreadResources)
                })
                this.timer = setInterval(()=>{
                    // alert('ss')

                    this.setState({
                        time:this.state.time+1
                    })


                },1000)
            }
        },(error)=>{

        })
    }

    shit(rowdata){
        // alert(rowdata.phase)
        // this.props.navigation.navigate('DongTaiDetails',{data:id})
        if(rowdata.phase==0&&rowdata.orderType==0){
            this.props.navigation.navigate('OrderDetails',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==0&&rowdata.orderType==1){
            this.props.navigation.navigate('OrderSecondDetail',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==1&&rowdata.orderType==0){
            this.props.navigation.navigate('DaoOrderDetail',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==1&&rowdata.orderType==1){
            this.props.navigation.navigate('ProgressDaoOrder',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==2&&rowdata.orderType==0){
            this.props.navigation.navigate('EndOrderDetail',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==2&&rowdata.orderType==1) {
            this.props.navigation.navigate('EndOrderDao', {data: rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==3&&rowdata.orderType==0&&rowdata.checkStatus==0){
            this.props.navigation.navigate('EndOrderFirstYiDetail',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==3&&rowdata.orderType==1&&rowdata.checkStatus==0){
            this.props.navigation.navigate('EndOrderYiChang',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==4&&rowdata.orderType==0){
            this.props.navigation.navigate('OrderFinalDetail',{data:rowdata.deliveryOrderId})
            return
        }
        if(rowdata.phase==4&&rowdata.orderType==1){
            this.props.navigation.navigate('OrderFinalSecDetail',{data:rowdata.deliveryOrderId})
            return
        }
      // if(rowdata.phase==0||rowdata.orderType==0){
      //    this.props.navigation.navigate('OrderDetails',{data:rowdata.deliveryOrderId})
      // }else {
      //     if(rowdata.phase==0||rowdata.orderType==1){
      //    this.props.navigation.navigate('OrderSecondDetail',{data:rowdata.deliveryOrderId})
      //     }else {
      //         if(rowdata.phase==1||rowdata.orderType==0){
      //             this.props.navigation.navigate('DaoOrderDetail',{data:rowdata.deliveryOrderId})
      //         }else {
      //             if(rowdata.phase==1||rowdata.orderType==1){
      //                 this.props.navigation.navigate('ProgressDaoOrder',{data:rowdata.deliveryOrderId})
      //             }else {
      //                 if(rowdata.phase==2||rowdata.orderType==0){
      //                     this.props.navigation.navigate('EndOrderDetail',{data:rowdata.deliveryOrderId})
      //                 }else {
      //                     if(rowdata.phase==2||rowdata.orderType==1){
      //                      this.props.navigation.navigate('EndOrderDao',{data:rowdata.deliveryOrderId})
      //                     }else {
      //                         if(rowdata.phase==3||rowdata.orderType==0||rowdata.checkStatus==0){
      //                             this.props.navigation.navigate('EndOrderFirstYiDetail',{data:rowdata.deliveryOrderId})
      //                         }else {
      //                             if(rowdata.phase==3||rowdata.orderType==1||rowdata.checkStatus==0){
      //                                 this.props.navigation.navigate('EndOrderYiChang',{data:rowdata.deliveryOrderId})
      //                             }else {
      //                                 if(rowdata.phase==4||rowdata.orderType==0){
      //                                     this.props.navigation.navigate('OrderFinalDetail',{data:rowdata.deliveryOrderId})
      //                                 }else{
      //                                     if(rowdata.phase==4||rowdata.orderType==1){
      //                                         this.props.navigation.navigate('OrderFinalSecDetail',{data:rowdata.deliveryOrderId})
      //                                     }
      //                                 }
      //                             }
      //                         }
      //                     }
      //                 }
      //             }
      //         }
      //     }
      // }
    }

}
class Heading extends Component{
    constructor(props){
        super(props)
        this.state={
            hisList:[]
        }
    }

    render(){
        Storage.get('searchorder').then((tagss)=>{
            // alert(tagss)
            this.setState({
                hisList:tagss
            })
        })
        if(this.state.hisList!=null){
            // alert('sss')
            for(var j=0;j<this.state.hisList.length;j++){
                pagelist.push(<View style={styles.bord} key={j}><Text style={styles.keyword}>{this.state.hisList[j]}</Text></View>)
            }
        }
        return(<View style={styles.pagelist}>{pagelist}</View>)
    }
}

const styles=StyleSheet.create({
    con:{
        backgroundColor:'#f9f9f9',
        flex:1,
        flexDirection:'column',
    },
    textinput:{
        marginTop:25,
        justifyContent:'center',
        // alignItems:'center',
        flexDirection:'row',
        backgroundColor: "#FFFFFF",
        height:42,
        borderWidth:1,
        borderColor:'#E5E5E5',
        width:Contants.Screen.width-40,
        // marginLeft:10,
        // marginRight:40,
        borderRadius:20,
        alignSelf:'center',
    },
    inputsty:{
        backgroundColor: "#FFFFFF",
        // textAlign: "center",
        height:36,
        // borderWidth:1,
        // borderColor:'#E5E5E5',
        width:Contants.Screen.width-80,
        // marginLeft:10,
        // marginRight:40,
        // borderRadius:20,
        // marginTop:5,
        marginLeft:5
    },
    img:{
        // position:'absolute',
        // marginLeft:Contants.Screen.width-50,
        width:16,height:16,
        // alignSelf:'flex-end',
        // marginTop:40
        marginTop:10,
    },
    his:{
        flexDirection:'row',
        marginTop:26,
        justifyContent:'space-between',

    },
    histext:{
        fontSize:14,
        color:'#282828',
        marginLeft:20
    },
    maleft:{
        marginRight:30
    },
    toux:{
        // backgroundColor:'white',
        flexDirection:'column',
        // height:Contants.Screen.height/6,
        marginTop:10
        ,backgroundColor:'white'
    },
    item:{
        flexDirection:'row',
        flex:1,
        // borderWidth:1,
        // borderColor:'gray',
        alignItems:'center',
        marginTop:10,
        marginBottom:10
    },
    chixu:{
        flexDirection:'column',
        justifyContent:'center',
        // alignItems:'center'
    },
    kai:{
        flexDirection:'row',
        flex:1,
        width:Contants.Screen.width,
        margin:4
    },
    kais:{
        flexDirection:'row',
        justifyContent:'flex-end',
        flex:1,
        width:Contants.Screen.width
    },
    you:{
        flexDirection:'column'
    },
    image:{
        width:35,
        height:35,
        marginRight:10,
        marginLeft:20,
        borderRadius:4
    },
    bord:{
        borderRadius:4,
        borderWidth:1,
        borderColor:'#E5E5E5',
        height:30,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:5,marginRight:5,
        marginTop:15
    },
    keyword:{
        fontSize:12,
        color:'#B2B2B2',
        marginLeft:10,marginRight:10,

    },
    listview:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        height:61,
        marginTop:10
    },
    consty:{
        width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center'
    },
    searchimg:{
        width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'
    },
    searchfinal:{
        flexDirection:'column',alignItems:'center',justifyContent:"flex-end",alignSelf:'center',
    },
    timeview:{
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:20,
        marginTop:10
    },
    apptime:{
        fontSize:10,
        color:'#B2B2B2',

        letterSpacing:0.01,
        lineHeight:10
    },
    pagelist:{
        flexDirection:"row",flexWrap:'wrap',marginLeft:10,marginRight:10
    }
})