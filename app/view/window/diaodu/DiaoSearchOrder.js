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
    AsyncStorage
} from 'react-native';
import Contants from '../../../common/Contants'
import comstyle from '../../../common/CommonStyle';
import Modal from 'react-native-modal';
import Toast from "react-native-easy-toast";
import {API,postFetch} from '../../../common/GConst';

import Storage from '../../../common/GGAsyncStorage'
import MyTimer from '../../../common/MyTimer'
var TimerMixin=require('react-timer-mixin');
var hotlist=[]
var pagelist=[]
export default class DiaoSearchOrder extends Component {
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
        }

    }
    componentWillMount(){

    }
    render(){
        Storage.get('diaosearchorder').then((tagss)=>{
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
        for(var i=0;i<this.state.hotList.length;i++){
            hotlist.push(<View style={styles.bord} key={i}><Text style={styles.keyword}>{this.state.hotList[i].keyword}</Text></View>)
        }
        var contview=null;
        if(this.state.isStyle==false){
            contview=(<View><View style={styles.his}>
                    <View style={comstyle.rightview}>
                        <Text style={styles.histext}>历史搜索</Text>
                    </View>
                    <View style={comstyle.leftview}>
                        <TouchableOpacity onPress={this.laji.bind(this)}>
                            <Image source={require('../../../img/window/lajitong.png')} style={styles.maleft}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DiaoSearchHistory')}}>
                            <Image source={require('../../../img/search/shenglh.png')} style={comstyle.textright}/>
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={[comstyle.heng,{marginTop:15,flexDirection:'row',}]}/>

                    <View style={{flexDirection:"row",flexWrap:'wrap',marginLeft:10,marginRight:10}}>
                        {pagelist}
                    </View>
                    {/*<View style={styles.his}>*/}
                    {/*<Text style={styles.histext}>热门搜索</Text>*/}

                    {/*</View>*/}
                    {/*<View style={[comstyle.heng,{marginTop:15,flexDirection:'row',}]}/>*/}
                    {/*<View style={{flexDirection:"row",flexWrap:'wrap',marginLeft:10,marginRight:10}}>*/}
                    {/*{hotlist}*/}
                    {/*</View>*/}
                </View>
            )
        }else {
            contview=(<ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                enableEmptySections={true}
            />)
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
                    <Image source={require('../../../img/page/srarch.png')} style={styles.img}/>
                </TouchableOpacity>
            </View>
            {/*<TouchableOpacity onPress={this.searchdong.bind(this)} style={styles.img}>*/}

            {/*</TouchableOpacity>*/}
            {contview}

        </View>)
    }
    laji(){
        Storage.delete('diaosearchorder').then((tags)=>{
            this.setState({
                hisList:''
            })
        })
        pagelist.splice(0,pagelist.length)
    }
    searchdong(){
        var hist=[this.state.text]
        // var tags=new Array();
        // tags.push(hist)
        // // alert(tags)
        // Storage.save('sear',tags)
        Storage.get('diaosearchorder').then((taggs)=>{
            if(taggs==null){
                taggs = new Array();
            }
            taggs.push(hist)
            AsyncStorage.setItem('diaosearchorder', JSON.stringify(taggs),);
        })

        postFetch(API.DiaoDuSearch,{keyWord:this.state.text},(result)=>{
            // alert(JSON.stringify(result))
            // alert(JSON.stringify(this.props))
            if(result.status==1){
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data),
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
    _renderRow=(rowData,sectionID,rowID)=>{
        return(<TouchableOpacity style={styles.listview} onPress={this.shit.bind(this,rowData)}>
            {rowData.checkStatus==0||rowData.reasonStatus!=undefined||rowData.reasonStatus==1?
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}} onPress={()=>{
            this.props.navigation.navigate('ZhiPaiView',{data:rowData.deliveryOrderId,id:rowData.id})}
            }>

                <Image source={require('../../../img/diaodu/jingbao.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center'}}>

                </Image>
                <View style={styles.item}>
                    {/*<Text>{rowData.id}</Text>*/}
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:Contants.Screen.width-70}}>
                        <Text style={styles.texttop}>{rowData.courier}</Text>
                        <Text style={{fontSize:10,color:'#B2B2B2'}}>{'单号：'+rowData.deliveryOrderId}</Text>
                    </View>
                    <Text style={styles.textbtm}>{'调度提醒：已超时'+MyTimer.formatSeconds(1,(rowData.warnTime/1000))+'分钟，无配送员接单'}</Text>
                </View>
            </TouchableOpacity>:
                rowData.checkStatus==0?
           <TouchableOpacity onPress={()=>{
               this.props.navigation.navigate('DiaoDuDetail',{data:rowData.deliveryOrderId})
           }}>
               <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>

                   <Image source={require('../../../img/diaodu/jingbao.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center'}}>
                       {/*<Text style={{color:'#FFFFFF',fontSize:12}}>待受理</Text>*/}
                   </Image>
                   <View style={styles.item}>
                       {/*<Text>{rowData.id}</Text>*/}
                       <Text style={styles.texttop}>{rowData.courier}</Text>
                       <Text style={styles.textbtm}>{'申请理由'+rowData.reason}</Text>
                   </View>
               </View>

               <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
                   <Image source={require('../../../img/order/bluequan.png')} style={{marginRight:20,justifyContent:'center',alignItems:'center',alignSelf:'flex-end',}}>
                       <Text style={{color:'#459CF4',fontSize:10,backgroundColor:'transparent',}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                   </Image>
                   {/*<Text style={{marginRight:20}}>{*/}
                   {/*MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime - 1000)/1000)}</Text>*/}
                   <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                       (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>

               </View>
           </TouchableOpacity>:
                    <TouchableOpacity style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',}} onPress={()=>{
                        if(rowData.orderStatus==1){
                            this.props.navigation.navigate('YiZhiPaiView',{data:rowData.deliveryOrderId})
                        }else {
                            this.props.navigation.navigate('EndDetail',{data:rowData.deliveryOrderId})
                        }
                    }}>
                        <View style={{flexDirection:'column',marginLeft:20,justifyContent:'flex-start'}}>
                            <Text style={styles.text}>{rowData.courier}</Text>
                            <Text style={styles.textb}>{rowData.reason}</Text>
                        </View>
                    <View style={{flex:1}}/>
                        <View style={{flexDirection:'column',marginRight:20,alignItems:'center',justifyContent:'flex-end'}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                {/*<Text style={styles.textb}>{}</Text>*/}
                                <Text style={styles.textb}>{new Date(rowData.orderCreateTime).getFullYear()+'.'}</Text>
                                <Text style={styles.textb}>{new Date(rowData.orderCreateTime).getMonth()+1+'.'}</Text>
                                <Text style={styles.textb}>{new Date(rowData.orderCreateTime).getDate()}</Text>
                                {/*<Text style={[styles.textb,{marginLeft:10}]}>{new Date(rowData.orderCreateTime).getHours()+':'}</Text>*/}
                                {/*<Text style={styles.textb}>{new Date(rowData.orderCreateTime).getMinutes()}</Text>*/}
                            </View>

                            <Text style={[styles.textcol,{color:rowData.checkStatus==1?'#33BAB2':'#FF305E'}]}>{rowData.checkStatus==1?'已同意':"已拒绝"}</Text>
                        </View>
                    </TouchableOpacity>
            }
        </TouchableOpacity>)
    }
    shit(id){
        // if(id){
        //
        // }
        // this.props.navigation.navigate('DongTaiDetails',{data:id})
    }
    // _renderImg=(row)=>{
    //     return(<View>
    //         <Image source={{uri:row.resourceUrl}} style={{height:100,width:100,borderRadius:5,marginLeft:15,marginTop:15}}/>
    //     </View>)
    // }
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
        alignItems:'center',
        height:60,
        marginTop:10,
        backgroundColor:'#FFFFFF'
    },
    texttop:{
        fontSize:14,
        color:'#282828',
        letterSpacing:0.01,

    },
    item:{
        flexDirection:'column',
        marginLeft:10
    },
    textbtm:{
        fontSize:10,
        color:'#B2B2B2',
        letterSpacing:0.01,
        lineHeight:13
    },
    text:{
        fontSize:14,
        color:'#282828'
    },
    textb:{
        fontSize:10,
        color:'#B2B2B2'
    },
    textcol:{
        fontSize:14,
        // color:'#33BAB2'
    },

})