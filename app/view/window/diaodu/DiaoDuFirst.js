import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
    ListView,
    AppState
} from 'react-native';
import commstyle from '../../../common/CommonStyle'
import MyTimer from '../../../common/MyTimer'
var TimerMixin=require('react-timer-mixin');
import {API,postFetch} from '../../../common/GConst'
import Contents from '../../../common/Contants'
export default class DiaoDuFirst extends Component{
    mixins:[TimerMixin]
    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            time:0,
            title:''
        }
    }
    componentWillMount(){
        // this.setState({
        //     // dataSource:this.state.dataSource.cloneWithRows('111')
        // })
        postFetch(API.DiaoDuOrder,{expressageExcepRecord:{checkStatus:0}},(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                if(result.data==[] || result.data.length==0){

                    this.setState({
                        title:'当前没有订单记录',
                    })
                }else {
               this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(result.data),
                   title:'',
                })

                this.timer = setInterval(()=>{
                    // alert('ss')

                    this.setState({
                        time:this.state.time+1
                    })


                },1000)
            }
            }
        },(error)=>{

        })
        AppState.addEventListener('change',this.handleAppState.bind(this));
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

    };

    render(){
        return(<View style={{flex:1,backgroundColor:"#f9f9f9"}}>
            <View style={styles.text}>
                <Text>{this.state.title}</Text>

            </View>
            {/*<Text>sss</Text>*/}
            {/*<Text>dddd</Text>*/}
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections={true}
            />
        </View>)
    }
    _renderRow=(rowData,sectionID,rowID)=>{
        // alert(JSON.stringify(rowData))
        rowData.countdownTime -= 1000;
        rowData.warnTime-=1000;
        var contview=null;
        if(rowData.orderStatus==1){
            contview=(<TouchableOpacity style={styles.listview} onPress={()=>{this.props.navigation.navigate('ZhiPaiView',{data:rowData.deliveryOrderId,id:rowData.id})}} key={rowID}>

                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>

                    <Image source={require('../../../img/diaodu/jingbao.png')} style={{width:45,height:45,marginLeft:20,alignItems:'center',justifyContent:'center'}}>

                    </Image>
                    <View style={styles.item}>
                        {/*<Text>{rowData.id}</Text>*/}
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:Contents.Screen.width-70}}>
                        <Text style={styles.texttop}>{rowData.courier}</Text>
                            <Text style={{fontSize:10,color:'#B2B2B2'}}>{'单号：'+rowData.deliveryOrderId}</Text>
                        </View>
                        <Text style={styles.textbtm}>{'调度提醒：已超时'+MyTimer.formatSeconds(1,(rowData.warnTime/1000))+'分钟，无配送员接单'}</Text>
                    </View>
                </View>


            </TouchableOpacity>)
        }else {
            contview=(
                <TouchableOpacity style={styles.listview} onPress={()=>{this.props.navigation.navigate('DiaoDuDetail',{data:rowData.deliveryOrderId,id:rowData.id})}} key={rowID}>

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
                            <Text style={{color:'#459CF4',fontSize:10,}}>{rowData.orderNumber==undefined?'0号':rowData.orderNumber+'号'}</Text>
                        </Image>
                        {/*<Text style={{marginRight:20}}>{*/}
                        {/*MyTimer.formatSeconds(1,(rowData.currentTime-rowData.createTime - 1000)/1000)}</Text>*/}
                        <Text style={{marginRight:20,fontSize:10,color:rowData.countdownTime<0?'#FF305E':'#B2B2B2'}}>{rowData.countdownTime<0?

                            (MyTimer.formatSeconds(2,-(rowData.countdownTime/1000))):(MyTimer.formatSeconds(2,(rowData.countdownTime/1000)))}</Text>

                    </View>

                </TouchableOpacity>
            )
        }

        return(
            <View>
            {contview}
            </View>
        )
    }
}
const styles=StyleSheet.create({
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
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        position:'absolute',
        // marginLeft:100,
        alignSelf:'center',
    },
})