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
    ActivityIndicator,
    RefreshControl
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
export default class OrderFinalSecond extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props);

        this.state={
            isshow:false,
            title:0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            system:theTime2+':'+theTime1+':'+theTime,
            comdtime:6,
            id:[],//订单id
            ids:'',
            time:'',
            score:'',
            serverScore:"",
            dataArray:[],
            isFistLoad:true,
            pageIndex: 0,
            isLoading:false,
            isRefreshing:false,
            totalpage:0

        }
        navigation=this.props.navigation
        // alert(JSON.stringify(navigation))
    }
    componentWillMount(){
        this.timer && clearInterval(this.timer);
        //开始预约计时rowan
        this.setState({
            isRefreshing:true
        })
        this.fetchdata(1)

        AppState.addEventListener('change',this.handleAppState.bind(this));


    }
    fetchdata(page){
        postFetch(API.Orderhistory,{expressageOrder:{type:1,phase:4},pageNum:page,numPerPage:10},(result)=>{
            // alert(JSON.stringify(result))
            this.setState({
                isRefreshing:false,

            })
            if(result.status==1){
                this.setState({
                    totalpage:result.page.totalCount
                })
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        // title:'当前没有历史订单记录',
                    })
                }else if(page==1){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.data),
                        id:result.data,
                        title:result.data.length,
                        dataArray:result.data
                    })
                }else {
                    this.setState({
                        isLoading:true,
                        dataArray:this.state.dataArray.concat(result.data),
                        dataSource:this.state.dataSource.cloneWithRows(this.state.dataArray.concat(result.data)),
                        id:result.data,
                        title:this.state.title+result.data.length
                    })
                }

            }
        },(error)=>{
            alert(error)
        })
    }
    // componentDidMount(){
    //     postFetch(API.Order,{expressageOrder:{type:0,phase:4}},(result)=>{
    //         alert(JSON.stringify(result))
    //     })
    // }

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
    turnsOnTimer(){

        const now = new Date();
        const diff = Math.round((now - this.recodTime) / 1000);

        this.count = this.count+diff;

        // this._beginTimer();

    };

    render(){
        var contentView=null;

        return(<View style={[comstyle.contain,{backgroundColor:'#f9f9f9'}]}>

            <TouchableOpacity style={[comstyle.item,{marginTop:20}]} onPress={()=>{
                this.props.navigation.navigate('YiChangOrder')
            }}>
                <View style={comstyle.rightview}>
                    <Image source={require('../../../img/order/yichangorder.png')} style={comstyle.maleft}/>
                    <Text style={[comstyle.mesg,comstyle.text]}>  异常订单</Text>
                </View>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('YiChangOrder')
                }}>
                    {/*<Text style={styles.texts}>{'>'}</Text>*/}
                    <Image source={require('../../../img/shezhi/jian.png')} style={comstyle.textright}/>
                </TouchableOpacity>
            </TouchableOpacity>
            <Text style={styles.yichang}>历史订单</Text>
            <View style={styles.text}>
                {/*<Text>{this.state.title}</Text>*/}

            </View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={false}
                onEndReached={this._fetchMoreData.bind(this)}
                onEndReachedThreshold={10}
                renderFooter={this._renderfoot}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
        </View>)
    }
    _onRefresh(){
       // if(this.state.title==0){
       //     return
       // }
        this.setState({
            isRefreshing:true
        })

        // this.setState({
        //     dataArray:[],
        //     array:[]
        // })
        // this.fetchdata(1);
    }
    _fetchMoreData(){
        if(this.state.isFistLoad == true){

            this.setState({

                isFistLoad:false,
            })

            return;
        }
        if(this.state.id.length==0){
            return
        }
        this.setState({
            pageIndex:this.state.pageIndex+1,
            isLoading:true
        })
        this.fetchdata(this.state.pageIndex+1)

    }
    _renderfoot=()=>{
        // alert(this.state.title)
        if(this.state.totalpage==this.state.title){
            return(<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>)
        }
        // else if(this.state.isLoading==false || this.state.pageIndex==1){
        //
        //     return (<View/>)
        // }

        else  {
            return (<ActivityIndicator
                style={styles.loadingMore}
            />)
        }
    }
    _renderRow=(rowData)=>{

        return(

            <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
                <View style={comstyle.rightview}>
                    {/*<Image source={{uri:rowData.imlUrl}} style={{width:45,height:45,borderRadius:5,marginLeft:20}}/>*/}
                    <View style={styles.item}>
                        {/*<Text>{rowData.consignee}</Text>*/}
                        <Text style={{marginBottom:2.5}}>{rowData.restaurantName}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:2.5}}>
                            <Text style={styles.pingtext}>用户评价</Text>

                            <Text style={[styles.pingtext,{marginLeft:5}]}>{rowData.score==undefined?'':rowData.score+'分'}</Text>
                            {/*<Text style={styles.pingtext}>{rowData.merchantRestaurantsComment&&rowData.merchantRestaurantsComment.score+'分'}</Text>*/}
                            {/*<Text>{rowData.merchantRestaurantsComment.serverScore}</Text>*/}
                        </View>
                    </View>

                </View>
                <View style={styles.timeview}>
                    <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getFullYear()+'-'}</Text>
                    <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getMonth()+1+'-'}</Text>
                    <Text style={styles.apptime}>{new Date(rowData.orderCreateTime).getDate()}</Text>
                </View>

            </TouchableOpacity>
        )

    }
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

    select(rowData){
        // alert(rowData.id.toString())
        // alerthistles
        //  alert('sss')

        this.props.navigation.navigate('OrderFinalSec',{data:JSON.stringify(rowData.deliveryOrderId)})
        // alert(JSON.stringify(rowData.id))
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
        // alignItems:'center',
        height:60,
        marginTop:10,
        backgroundColor:'#FFFFFF'
    },
    item:{
        flexDirection:'column',
        alignItems:"center",
        marginLeft:20,

    },
    yichang:{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        fontSize:14,
        color:'#282828',

        letterSpacing:0.01,
        marginBottom:10
    },
    pingtext:{
        fontSize:10,
        color:'#B2B2B2',

        letterSpacing:0.01,
        lineHeight:12
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
    loadingMore: {
    marginVertical: 20,
        flexDirection:'row',
        justifyContent:'center'
     },
    loadingText: {
    fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginTop:20
   },
   })