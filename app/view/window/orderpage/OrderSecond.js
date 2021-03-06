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
    RefreshControl,
    DeviceEventEmitter,
    Platform,
    ActivityIndicator,
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import SearchPage from '../../SearchPage'
import OrderPage from '../../OrderPage'
import {Container, Tab, Tabs,TabHeading} from 'native-base';
var TimerMixin=require('react-timer-mixin');
import MyTimer from '../../../common/MyTimer'
import comstyle from '../../../common/CommonStyle'
export default class OrderSecond extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props)
        this.state={
            title:'',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            comdtime:6,
            isRefreshing:false,
            dataArray:[],
            isFistLoad:true,
            pageIndex: 0,
            isLoading:false,
            totalpage:0,
            perpage:0
        }
    }
    componentDidMount(){
      this.fetchdata(1)
        this.setState({
            isRefreshing:true
        })
        this.listener=DeviceEventEmitter.addListener('HOMEPAGE',(e)=>{
            this.fetchdata()
        })
        if(Platform.OS==='android'){
            this.listen=DeviceEventEmitter.addListener('event',(e)=>{
                if(e.action==='ON_NEW_ORDER'){
                    this.fetchdata()
                }
            })
        }
    }
    fetchdata(page){
        postFetch(API.FirstOrder,{expressageOrder:{type:1,phase:0},pageNum:page,numPerPage:10},(result)=>{
            // alert(JSON.stringify(result))
            this.setState({
                isRefreshing:false
            })
            if(result.status==1){
                this.setState({
                    totalpage:result.page.totalCount
                })
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        title:'当前没有待处理订单记录'
                    })
                }else if(page==1){
                    this.setState({
                        dataSource:this.state.dataSource.cloneWithRows(result.data),
                        array:result.data,
                        title:'',
                        dataArray:result.data,
                        perpage:result.data.length
                    })
                }else {
                    this.setState({
                        isLoading:true,
                        dataArray:this.state.dataArray.concat(result.data),
                        dataSource:this.state.dataSource.cloneWithRows(this.state.dataArray.concat(result.data)),
                        array:result.data,
                        perpage:this.state.perpage+result.data.length
                    })
                }
            }
        },(error)=>{
            alert(error)
        })
    }
    render(){
        return(<View style={styles.contain}>
            <View style={styles.text}>
                <Text>{this.state.title}</Text>
            </View>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                enableEmptySections={true}
                style={{marginTop:10}}
                automaticallyAdjustContentInsets={false}
                onEndReached={this._fetchMoreData.bind(this)}
                onEndReachedThreshold={0.1}
                renderFooter={this._renderfoot}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        </View>)
    }
    _onRefresh(){
        this.setState({
            dataArray:[],
            array:[],
            isRefreshing:true
        })
        this.fetchdata(1)
    }
    _renderfoot=()=>{
        // alert(this.state.array.length)
        if(this.state.totalpage==this.state.perpage){
            return(<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>)
        }

        else  {
            return (<ActivityIndicator
                style={styles.loadingMore}
            />)
        }
    }
    _fetchMoreData(){
        if(this.state.isFistLoad == true){

            this.setState({

                isFistLoad:false,
            })

            return;
        }
        if(this.state.array.length==0){
            return
        }
        this.setState({
            pageIndex:this.state.pageIndex+1,
            isLoading:true

        })
        this.fetchdata(this.state.pageIndex+1)

    }
    componentWillUnmount(){
        this.listener.remove()
        this.listen.remove()
    }

    _renderRow=(rowData,sectionID,rowID)=>{
        const {navigate}=this.props.navigation;
        // if(this.state.comdtime==0){
        //
        //     postFetch(API.chaoshi,{orderDining:{id:rowData.id}},(result)=>{
        //
        //         if(result.status==1){
        //           this.setState({
        //               ids:'拒单'
        //           })
        //         }
        //     },(error)=>{
        //         alert(error)
        //     })
        // }
        // alert(JSON.stringify(rowData.id))
        return(

            <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                    {/*<View style={{flexDirection:'column'}}>*/}
                    {/*/!*<Image source={require('../../../img/order/lanshutiao.png')}/>*!/*/}
                    {/*</View>*/}
                    <Image source={require('../../../img/daisong/shouli.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent'}}>待受理</Text>
                    </Image>
                    <View style={styles.item}>
                        {/*<Text>{rowData.consignee}</Text>*/}
                        <Text style={comstyle.text}>{rowData.restaurantName}</Text>
                        <Text style={comstyle.textsmal}>【新消息】您有新订单！</Text>
                    </View>
                </View>
                {/*<Text>{MyTimer.formatSeconds(1,this.state.comdtime)}</Text>*/}
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:"flex-end"}}>
                    <Image source={require('../../../img/daisong/greenbig.png')} style={{marginRight:20,justifyContent:'center',alignItems:'center',}}>
                        <Text style={{color:'#33BAB2',fontSize:12}}>接单</Text>
                    </Image>
                    {/*<Text style={{marginRight:20}}>{*/}
                    {/*MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime - 1000)/1000)}</Text>*/}
                </View>
                {/*<Text onPress={this.jiedan.bind(this,rowData.id)}>{rowData.id}</Text>*/}
                {/*<Text>{this.state.ids}</Text>*/}
            </TouchableOpacity>
        )

    }

    select(rowData){
        // alert(rowData.id.toString())
        // alerthistles
        //  alert('sss')
        this.props.navigation.navigate('OrderSecondDetail',{data:JSON.stringify(rowData.deliveryOrderId)})
        // alert(JSON.stringify(rowData.id))
    }
}
const styles=StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'#f9f9f9'
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
        backgroundColor:'white',
        height:61,
        marginTop:10
    },
    item:{
        flexDirection:'column',
        marginLeft:10
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