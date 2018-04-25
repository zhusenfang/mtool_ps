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
    FlatList,
    RefreshControl,
    ScrollView,
    ActivityIndicator
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
import comstyle from '../../../common/CommonStyle'
var TimerMixin=require('react-timer-mixin');

// var comdtime=600;
var uptime=1;
var theTime = 0;//秒
var theTime1 = 0;//分
var theTime2 = 0;//时
var navigation=null
export default class EndOrderSecond extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props);

        this.state={
            isshow:false,
            title:'',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            dataSourceyc:new ListView.DataSource({
                rowHasChanged: (row1, row2)=> row1 !== row2,
            }),
            system:theTime2+':'+theTime1+':'+theTime,
            comdtime:6,
            id:[],//订单id
            ids:'',
            time:'',
            score:'',
            serverScore:"",
            isRefreshing:false,
            list:[],
            times:0,
            totalpage:0,
            perpage:0,
            // dataArray:[],
            pageIndex:0,
            isLoading:false,
            totalpagesec:0,
            perpagesec:0,
            pageIndexsec:0
        }
        navigation=this.props.navigation
        // alert(JSON.stringify(navigation))
    }
    componentWillMount(){
        this.timer && clearInterval(this.timer);
        //开始预约计时rowan
        this.fetchData(1)

        this.setState({
            isRefreshing:true
        })

    }

    fetchData(page){
        postFetch(API.Order,{expressageOrder:{type:1,phase:2},pageNum:page,numPerPage:10},(result)=>{
            // alert(JSON.stringify(result))
            this.timer && clearInterval(this.timer)
            this.setState({
                isRefreshing:false
            })

            if(result.status==1){
                this.setState({
                    totalpage:result.page.totalCount
                })
                this.timer = setInterval(()=>{
                    this.setState({
                        time:this.state.time+1
                    })



                },1000)
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        title:'当前没有历史订单记录',
                    })
                }else if(page==1){
                    this.setState({
                        id:result.data,
                        title:'',
                        perpage:result.data.length
                    })

                }else {
                    this.setState({
                        id:this.state.id.concat(result.data),
                        perpage:this.state.perpage+result.data.length,
                        isLoading:true,
                        title:''
                    })
                }

            }
        },(error)=>{
            alert(error)
            this.setState({
                isRefreshing:false
            })

        })
        AppState.addEventListener('change',this.handleAppState.bind(this));
    }
    componentDidMount(){
        this.fetsecond(1)
    }
    fetsecond(page){
        postFetch(API.Order,{expressageOrder:{type:1,phase:3},pageNum:page,numPerPage:10},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this.setState({
                    totalpagesec:result.page.totalCount
                })
                if(page==1){

                    this.setState({
                        // dataSourceyc:this.state.dataSourceyc.cloneWithRows(result.data),
                        list:result.data,
                        perpagesec:result.data.length
                    })
                }else {
                    this.setState({
                        list:this.state.list.concat(result.data),
                        perpagesec:this.state.perpagesec+result.data.length
                    })
                }
                if(this.state.id==[]||this.state.id.length==0){


                    this.timer = setInterval(()=>{
                        this.setState({
                            times:this.state.times+1
                        })

                    },1000)
                }
            }
        })
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        AppState.removeEventListener('change', this.handleAppState.bind(this));
    }
    handleAppState(nextAppState) {
        if (nextAppState === 'inactive') {
            this.recodTime = new Date();
            this._endTimer();
        } else if (nextAppState === 'active') {

            this.turnsOnTimer();
        }
    }
    _endTimer(){

        this.timer && clearInterval(this.timer)

    }

    turnsOnTimer(){

        const now = new Date();
        const diff = Math.round((now - this.recodTime) / 1000);

        this.count = this.count+diff;

        // this._beginTimer();
        this.fetchData()

    };

    render(){
        var contentView=null;

        return(<ScrollView style={[comstyle.contain,{backgroundColor:'#f9f9f9'}]}>
            {/*<ListView*/}
            {/*dataSource={this.state.dataSource}*/}
            {/*renderRow={this._renderRow}*/}
            {/*style={{marginTop:10}}*/}
            {/*refreshControl={*/}
            {/*<RefreshControl*/}
            {/*refreshing={this.state.isRefreshing}*/}
            {/*onRefresh={this._onRefresh.bind(this)}*/}
            {/*/>*/}
            {/*}*/}
            {/*/>*/}
            <ScrollView
                showsVerticalScrollIndicator={true}
                scrollEnabled={true}
                pagingEnabled={true}
                horizontal={false}
                onScroll={this.renderFooter}
                automaticallyAdjustContentInsets={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >
                {this.state.id.map((rowData,index)=>{
                    rowData.countdownTime -= 1000;
                    return(

                        <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)} key={index}>



                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                                {/*<View style={{flexDirection:'column'}}>*/}
                                {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
                                {/*</View>*/}
                                <Image source={require('../../../img/daisong/songda.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                    <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent'}}>待送达</Text>
                                    <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent'}}>{rowData.orderAlpha+'号'}</Text>
                                </Image>
                                <View style={styles.item}>

                                    <Text>{rowData.restaurantName}</Text>
                                    <Text>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
                                <Image source={require('../../../img/daisong/greenquan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
                                    <Text style={{color:'#33BAB2',fontSize:10}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                                </Image>
                                {/*<Text style={{marginRight:20}}>{*/}
                                {/*MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime - 1000)/1000)}</Text>*/}
                                <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                                    (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <Text style={styles.yichang}>送达异常</Text>
            {/*<ListView*/}
                {/*dataSource={this.state.dataSourceyc}*/}
                {/*renderRow={this._renderYiCh}*/}
                {/*enableEmptySections={true}*/}
            {/*/>*/}
            <ScrollView
                showsVerticalScrollIndicator={true}
                scrollEnabled={true}
                pagingEnabled={true}
                horizontal={false}
                onScroll={this.renderFooterSec}
                automaticallyAdjustContentInsets={true}>
                {this.state.list.map((rowData,index)=>{
                    rowData.countdownTime -= 1000;
                    return( <TouchableOpacity style={styles.listview} onPress={this.selected.bind(this,rowData)} key={index}>



                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                            {/*<View style={{flexDirection:'column'}}>*/}
                            {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
                            {/*</View>*/}
                            <Image source={require('../../../img/dian/yichang.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent'}}>?</Text>
                                {/*<Text style={{color:'#FFFFFF',fontSize:12}}>{rowData.orderAlpha+'号'}</Text>*/}
                            </Image>
                            <View style={styles.item}>

                                <Text style={comstyle.text}>{rowData.restaurantName}</Text>
                                <Text style={comstyle.textsmal}>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
                            </View>
                        </View>

                        <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
                            <Image source={require('../../../img/daisong/greenquan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end',}}>
                                <Text style={{color:'#33BAB2',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                            </Image>
                            <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                                (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                        </View>
                    </TouchableOpacity>)
                })}
            </ScrollView>
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
        </ScrollView>)
    }
    // _renderRow=(rowData,sectionID,rowID)=>{
    //     // alert(rowData.merchantRestaurantsComment)
    //     // const {navigate}=this.props.navigation;
    //     // alert(JSON.stringify(rowData.merchantRestaurantsComment))
    //     // if(typeof(rowData.merchantRestaurantsComment) != "undefined"){
    //     //     this.setState({
    //     //        score:rowData.merchantRestaurantsComment.score,
    //     //         serverScore:rowData.merchantRestaurantsComment.serverScore
    //     //     })
    //     // }
    //     rowData.countdownTime -= 1000;
    //     return(
    //
    //         <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
    //
    //
    //
    //             <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
    //                 {/*<View style={{flexDirection:'column'}}>*/}
    //                 {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
    //                 {/*</View>*/}
    //                 <Image source={require('../../../img/daisong/songda.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    //                     <Text style={{color:'#FFFFFF',fontSize:12}}>代送达</Text>
    //                     <Text style={{color:'#FFFFFF',fontSize:12}}>{rowData.orderAlpha+'号'}</Text>
    //                 </Image>
    //                 <View style={styles.item}>
    //
    //                     <Text>{rowData.restaurantName}</Text>
    //                     <Text>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
    //                 </View>
    //             </View>
    //
    //             <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
    //                 <Image source={require('../../../img/order/bluequan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
    //                     <Text style={{color:'#459CF4',fontSize:10,marginLeft:5,marginTop:2}}>{rowData.orderNumber+'号'}</Text>
    //                 </Image>
    //                 {/*<Text style={{marginRight:20}}>{*/}
    //                 {/*MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime - 1000)/1000)}</Text>*/}
    //                 <Text style={{marginRight:20,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?
    //
    //                     (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(1,(rowData.countdownTime/1000)))}</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    //
    // }
    // _renderYiCh=(rowData)=>{
    //     rowData.countdownTime -= 1000;
    //     return( <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
    //
    //
    //
    //         <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
    //             {/*<View style={{flexDirection:'column'}}>*/}
    //             {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
    //             {/*</View>*/}
    //             <Image source={require('../../../img/dian/yichang.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    //                 <Text style={{color:'#FFFFFF',fontSize:12}}>?</Text>
    //                 {/*<Text style={{color:'#FFFFFF',fontSize:12}}>{rowData.orderAlpha+'号'}</Text>*/}
    //             </Image>
    //             <View style={styles.item}>
    //
    //                 <Text>{rowData.restaurantName}</Text>
    //                 <Text>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
    //             </View>
    //         </View>
    //
    //         <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
    //             <Image source={require('../../../img/order/bluequan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
    //                 <Text style={{color:'#459CF4',fontSize:10,marginLeft:5,marginTop:2}}>{rowData.orderNumber+'号'}</Text>
    //             </Image>
    //             <Text style={{marginRight:20,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?
    //
    //                 (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(1,(rowData.countdownTime/1000)))}</Text>
    //         </View>
    //     </TouchableOpacity>)
    // }
    jiedan(rowData){
        // postFetch(API.JieDan,{orderDining:{
        //     id:rowData,
        //     status:'1'
        // }},(result)=>{
        //     alert(JSON.stringify(result))
        //     if(result.status==1){
        //         this._toast.show('接单成功')
        //     }
        // })
    }
    _onRefresh(){
        var tem=this

        // setTimeout(function () {
        //   tem.setState({
        //       isRefreshing:true
        //   })
        //     tem.fetchData()
        // },1000)
        this.timer && clearInterval(this.timer)
        this.setState({
            isRefreshing:true,
            id:[],
            pageIndex:1
        })

        this.fetchData(1);
    }
    renderFooter=()=>{
        // alert(this.state.totalpage)
        if(this.state.totalpage==this.state.perpage){
            return(<View style={comstyle.loadingMore}>
                <Text style={comstyle.loadingText}>没有更多数据啦...</Text>
            </View>)
        }else {
            this.setState({
                pageIndex:this.state.pageIndex+1,
                isLoading:true
            })
            this.fetchData(this.state.pageIndex+1)
            return(<ActivityIndicator style={comstyle.loadingMore}/>)
        }
    }
    renderFooterSec=()=>{
        if(this.state.totalpagesec==this.state.perpagesec){
            return(<View style={comstyle.loadingMore}>
                <Text style={comstyle.loadingText}>没有更多数据啦...</Text>
            </View>)
        }else {
            this.setState({
                pageIndexsec:this.state.pageIndexsec+1,

            })
            this.fetsecond(this.state.pageIndexsec+1)
            return(<ActivityIndicator style={comstyle.loadingMore}/>)
        }
    }
    select(rowData){


        this.props.navigation.navigate('EndOrderDao',{data:JSON.stringify(rowData.deliveryOrderId)})

    }
    selected(rowData){
        this.props.navigation.navigate('EndOrderYiChang',{data:JSON.stringify(rowData.deliveryOrderId)})
    }
}
const styles=StyleSheet.create({
    contain:{
        flex:1
    },
    text:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        position:'absolute',
        marginLeft:100
    },
    listview:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        marginTop:10,
        backgroundColor:'#FFFFFF'
    },
    item:{
        flexDirection:'column',
        alignItems:"center",
        marginLeft:10
    },
    yichang:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        fontSize:14,
        color:'#282828',
        // fontFamily:'FZLTZHK--GBK1-0',
        letterSpacing:0.01
    },
    pingtext:{
        fontSize:10,
        color:'#B2B2B2',
        // fontFamily:'FZLTXHK--GBK1-0',
        letterSpacing:0.01,
        lineHeight:12
    },
    timeview:{
        justifyContent:'flex-end',
        flexDirection:'row',
        marginRight:20
    },
    apptime:{
        fontSize:10,
        color:'#B2B2B2',
        // marginRight:20
        // fontFamily:'FZLTXHK--GBK1-0',
        letterSpacing:0.01,
        lineHeight:10
    },

})