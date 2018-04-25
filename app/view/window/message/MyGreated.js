import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    BackHandler
} from 'react-native';
import comstyle from '../../../common/CommonStyle'
import {API,postFetch} from '../../../common/GConst';
import Contants from '../../../common/Contants'
export default class MineMessage extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            picurl:"",
            name:'',
            sex:'',
            gonghao:''
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
    componentDidMount(){
        if(Platform.OS==='android'){
            BackHandler.addEventListener('hardwareBackPress', this._androidBack);}
        //网络请求
        postFetch(API.Personalmessage,null,(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this.setState({
                    picurl:result.data.userMember.picUrl,
                    name:result.data.userMember.nickname,
                    sex:result.data.userMember.sex,
                    gonghao:result.data.jobNum,
                })
            }
        })
    }
    render(){
        return(<View style={[comstyle.contain,{backgroundColor:'#f9f9f9'}]}>
            <View style={styles.toux}>
                <View style={comstyle.rightview}>
                  <Image source={require('../../../img/order/mine.png')}  style={comstyle.maleft}/>
                    <Text style={comstyle.mesg}>头 像</Text>
                </View>
                <Image style={[comstyle.textright,{width:45,height:45,borderRadius:4}]} source={{uri:this.state.picurl}}/>
            </View>
            <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
            <View style={comstyle.item}>
                <View style={comstyle.rightview}>
                    <Image source={require('../../../img/dian/gonghao.png')} style={comstyle.maleft}/>
                    <Text style={comstyle.mesg}>工 号</Text>
                </View>
                <Text style={comstyle.textright}>{this.state.gonghao}</Text>
            </View>
            <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
            <View style={comstyle.item}>
                <View style={comstyle.rightview}>
                    <Image source={require('../../../img/dian/name.png')} style={comstyle.maleft}/>
                    <Text style={comstyle.mesg}>姓 名</Text>
                </View>
                <Text style={comstyle.textright}>{this.state.name}</Text>
            </View>
            <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
            <View style={comstyle.item}>
                <View style={comstyle.rightview}>
                    <Image source={require('../../../img/dian/sex.png')} style={comstyle.maleft}/>
                    <Text style={comstyle.mesg}>性 别</Text>
                </View>
                <Text style={comstyle.textright}>{this.state.sex==0?'女':'男'}</Text>
            </View>
            <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
            {/*<ListView*/}
            {/*dataSource={this.state.dataSource}*/}
            {/*renderRow={this._renderRow.bind(this)}*/}
            {/*/>*/}
        </View>)
    }

}
const styles=StyleSheet.create({
    toux:{
        backgroundColor:'white',
        flexDirection:'row',
        height:60,
        // height:Contants.Screen.height/6,
        marginTop:10,
        justifyContent:"space-between",
        alignItems:'center',
    },
    item:{
        flexDirection:'row',
        flex:1,
        // borderWidth:1,
        // borderColor:'gray',
        alignItems:'center'
    },
    chixu:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
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
        width:20,
        height:20,
        marginRight:20
    }

})