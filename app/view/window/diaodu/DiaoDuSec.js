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
    ListView
} from 'react-native';
import comstyle from '../../../common/CommonStyle'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
export default class DiaoDuSec extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
    }
    componentWillMount(){
      postFetch(API.DiaoDuOrder,{expressageExcepRecord:{checkStatus:""}},(result)=>{
          // alert(JSON.stringify(result))
          if(result.status==1){
              this.setState({
                  dataSource:this.state.dataSource.cloneWithRows(result.data)
              })
          }
      })
    }
    render(){
        return(<View style={{flex:1,backgroundColor:"#f9f9f9"}}>
            {/*<Text>sss</Text>*/}
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._render}
            style={{marginTop:10}}
            enableEmptySections={true}
            />
        </View>)
    }
    _render=(rowData)=>{
        return(

            <TouchableOpacity style={styles.item} onPress={()=>{
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
        </TouchableOpacity>)
    }
}
const styles=StyleSheet.create({
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
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        height:61,
        marginTop:10,

    },
})