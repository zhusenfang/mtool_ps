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
export default class ProgressFirst extends Component {
    mixins:[TimerMixin]
    constructor(props){
        super(props);

        this.state={
            isshow:false,
            title:'',
            // dataSource: new ListView.DataSource({
            //     rowHasChanged: (row1, row2) => row1 !== row2,
            // }),
            system:theTime2+':'+theTime1+':'+theTime,
            comdtime:6,
            id:[],//订单id
            ids:'',
            time:0,
            isRefreshing:false,
            totalpage:0,
            perpage:0,
            // dataArray:[],
            pageIndex:0,
            isLoading:false
            // dataArray:[],
            // isFistLoad:true,
            // pageIndex: 0,
            // isLoading:false
        }
        navigation=this.props.navigation
        // alert(JSON.stringify(navigation))
    }
    componentWillMount(){
        this.timer && clearInterval(this.timer);
        //开始预约计时rowan

        // this.timer = setInterval(()=>{
        //     if(this.state.comdtime==0){
        //         this.timer && clearInterval(this.timer);
        //           // alert(this.state.dataSource)
        //         // var s=this.state.dataSource.
        //
        //      //  alert(JSON.stringify(this.state.dataSource))
        //     }
        //     if(this.state.comdtime>0 ){
        //         this.setState({
        //             comdtime:this.state.comdtime-1
        //         })
        //
        //     }
        //
        // },1000)
        this.fetchDate(1)
         this.setState({
             isRefreshing:true
         })


    }
      fetchDate(page){
          postFetch(API.Order,{expressageOrder:{type:0,phase:1},pageNum:page,numPerPage:10},(result)=>{
              // alert(JSON.stringify(result))
              this.setState({
                  isRefreshing:false
              })
              this.timer && clearInterval(this.timer)
              if(result.status==1){
                  this.setState({
                      totalpage:result.page.totalCount
                  })
                  this.timer = setInterval(()=>{
                      // alert('ss')
                      this.setState({
                          time:this.state.time+1
                      })
                  },1000)
                  if(result.data==[] || result.data.length==0){

                      this.setState({
                          title:'当前没有待处理订单记录',
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
                      })
                  }
                  // else {
                  //     this.setState({
                  //         isLoading:true,
                  //         dataArray:this.state.dataArray.concat(result.data),
                  //         dataSource:this.state.dataSource.cloneWithRows(this.state.dataArray.concat(result.data)),
                  //         id:result.data
                  //     })
                  //     this.timer = setInterval(()=>{
                  //         // alert('ss')
                  //
                  //         this.setState({
                  //             time:this.state.time+1
                  //         })
                  //
                  //
                  //     },1000)
                  // }
              }
          },(error)=>{
              // alert(error)
              this.setState({
                  isRefreshing:false
              })
          })
          AppState.addEventListener('change',this.handleAppState.bind(this));
      }
    componentDidMount(){
        // postFetch(API.Order,{expressageOrder:{type:0,phase:3}},(result)=>{
        //     // alert(JSON.stringify(result))
        //     if(result.status==1){
        //         // this.setState({
        //         //     dataSourceyc:this.state.dataSourceyc.cloneWithRows(result.data)
        //         // })
        //     }
        // })
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
        this.fetchDate(1)

    };

    render(){
        var contentView=null;

        return(<View style={{flex:1,backgroundColor:'#f9f9f9'}}>
            <View style={styles.text}>
                <Text>{this.state.title}</Text>

            </View>

            {/*<ListView*/}
                {/*dataSource={this.state.dataSource}*/}
                {/*renderRow={this._renderRow}*/}

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
                    return(<TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)} key={index}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                            {/*<View style={{flexDirection:'column'}}>*/}
                            {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
                            {/*</View>*/}
                            <Image source={require('../../../img/order/daiqu.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent'}}>待取单</Text>
                                <Text style={{color:'#FFFFFF',fontSize:12,backgroundColor:'transparent',}}>{rowData.orderAlpha}</Text>
                            </Image>
                            <View style={styles.item}>
                                {/*<Text>{rowData.consignee}</Text>*/}
                                <Text style={comstyle.text}>{rowData.restaurantName}</Text>
                                <Text style={comstyle.textsmal}>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
                            </View>
                        </View>
                        {/*<Text>{MyTimer.formatSeconds(1,this.state.comdtime)}</Text>*/}
                        <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
                            <Image source={require('../../../img/order/bluequan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-end'}}>
                                <Text style={{color:'#459CF4',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                            </Image>
                            <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                                (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>
                        </View>
                        {/*<Text onPress={this.jiedan.bind(this,rowData.id)}>{rowData.id}</Text>*/}
                        {/*<Text>{this.state.ids}</Text>*/}
                    </TouchableOpacity>)
                })}
            </ScrollView>
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
        </View>)
    }
    _onRefresh(){
       this.setState({
           isRefreshing:true,
           id:[],
           pageIndex:1
       })
        this.timer && clearInterval(this.timer)
        this.fetchDate(1);
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
            this.fetchDate(this.state.pageIndex+1)
            return(<ActivityIndicator style={comstyle.loadingMore}/>)
        }
    }
    // _renderRow=(rowData,sectionID,rowID)=>{
    //     // const {navigate}=this.props.navigation;
    //     // if(rowData.currentTime-rowData.createTime - 1000)/1000==0){
    //     //
    //     //     postFetch(API.chaoshi,{orderDining:{id:rowData.id}},(result)=>{
    //     //
    //     //         if(result.status==1){
    //     //           this.setState({
    //     //               ids:'拒单'
    //     //           })
    //     //         }
    //     //     },(error)=>{
    //     //         alert(error)
    //     //     })
    //     // }
    //     // alert(JSON.stringify(rowData.id))
    //
    //
    //         rowData.countdownTime -= 1000;
    //
    //
    //     return(
    //
    //         <TouchableOpacity style={styles.listview} onPress={this.select.bind(this,rowData)}>
    //             <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
    //             {/*<View style={{flexDirection:'column'}}>*/}
    //                 {/*<Image source={require('../../../img/order/lanshutiao.png')}/>*/}
    //             {/*</View>*/}
    //             <Image source={require('../../../img/order/daiqu.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    //                 <Text style={{color:'#FFFFFF',fontSize:12}}>代取单</Text>
    //                 <Text style={{color:'#FFFFFF',fontSize:12}}>{rowData.orderAlpha}</Text>
    //             </Image>
    //             <View style={styles.item}>
    //                 {/*<Text>{rowData.consignee}</Text>*/}
    //                 <Text>{rowData.restaurantName}</Text>
    //                 <Text>{rowData.phase==1?'待取餐':rowData.phase==2?'待送达':rowData.phase==3?'正在提交的异常单':rowData.phase==4?'历史订单':'待分配'}</Text>
    //             </View>
    //             </View>
    //             {/*<Text>{MyTimer.formatSeconds(1,this.state.comdtime)}</Text>*/}
    //             <View style={{flexDirection:'column',alignItems:'center',justifyContent:"flex-end"}}>
    //                 <Image source={require('../../../img/order/bluequan.png')} style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
    //                   <Text style={{color:'#459CF4',fontSize:10,marginLeft:5,marginTop:2}}>{rowData.orderNumber+'号'}</Text>
    //                 </Image>
    //             <Text style={{marginRight:20,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?
    //
    //               (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(1,(rowData.countdownTime/1000)))}</Text>
    //             </View>
    //             {/*<Text onPress={this.jiedan.bind(this,rowData.id)}>{rowData.id}</Text>*/}
    //             {/*<Text>{this.state.ids}</Text>*/}
    //         </TouchableOpacity>
    //     )
    //
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

    select(rowData){
        // alert(rowData.id.toString())
        // alerthistles
        //  alert('sss')

        this.props.navigation.navigate('DaoOrderDetail',{data:JSON.stringify(rowData.deliveryOrderId)})
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
        height:60,
        marginTop:10,
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    item:{
        flexDirection:'column',
        marginLeft:10
    }
})