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
export default class DongTaiFirst extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(<View style={comstyle.contain}>
            <View style={styles.top}>
                <Image/>
                <View style={styles.col}>
                   <Text>刀刀</Text>
                    <Text>22小时前</Text>
                </View>
                <Image source={require('../../../img/window/duigou.png')} style={comstyle.img}/>
                <Text>120</Text>
            </View>
            <View style={comstyle.heng}></View>
            <View style={styles.tupian}>
                <Image/>
                <Image/>
                <Image/>
            </View>
            <Text style={styles.text}>天天都在喝，味道啦啦啦啦</Text>
            <View style={styles.zan}>
                <Text>最近赞过的人</Text>
                <Text>...</Text>
            </View>
            <View style={comstyle.heng}></View>
            {/*图片的listview*/}
        </View>)

    }
}
const styles=StyleSheet.create({
     top:{
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
         backgroundColor:'white',
         marginTop:20
     },
    col:{
         flexDirection:'column',
        alignItems:'center',
        justifyContent:'flex-start',
    },
    tupian:{
         width:Contants.width,
        margin:10,
        flexDirection:'row'
    },
    text:{
        margin:10,
        backgroundColor:'white'
    },
    zan:{
        height:30,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:10
    }

})