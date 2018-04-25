import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image
} from 'react-native';
import comstyle from '../../../common/CommonStyle';
import {API,postFetch} from '../../../common/GConst';
import Contants from '../../../common/Contants'
export default class DongTaiPing extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(<View style={comstyle.contain}>
            <Text style={pinstyle.pinl}>精选评论</Text>
            <View style={pinstyle.item}>
                <Image/>
                <View style={pinstyle.wu}>
                    <Text>微信</Text>
                    <Text>22小时前</Text>
                </View>
               <Image source={require('../../../img/pinglun/pinglun.png')} style={comstyle.img}/>
                <Text style={pinstyle.text}>48</Text>
                <Image source={require('../../../img/pinglun/dianzan.png')} style={comstyle.img}/>
                <Text style={pinstyle.text}>48</Text>
            </View>
            <View style={comstyle.heng}/>
            <View style={pinstyle.hui}>
             <Text>回复@带带：群殴我合肥屁股</Text>
            </View>
        </View>)

    }
}
const pinstyle=StyleSheet.create({
    pinl:{
        marginTop:20,
        marginLeft:10,
        marginBottom:10
    },
    item:{
        flexDirection:'row',
        backgroundColor:'white',
        height:50,
        alignItems:'center',
        justifyContent:'space-between'
    },
    wu:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    text:{
        marginRight:20
    },
    hui:{
        flexDirection:'row',
        height:30,
        alignItems:'center',
    }
})