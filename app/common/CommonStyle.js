import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Contants from './Contants'
const styles=StyleSheet.create({
    contain:{
        flex:1
    },
    heng:{
        width:Contants.Screen.width,
        height:1,
        backgroundColor:"#E5E5E5"
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        height:46
    },
    img:{
        width:20,
        height:20
    },
    rightview:{
        flexDirection:'row',justifyContent:'flex-start',alignItems:'center'
    },
    maleft:{
        marginLeft:20
    },
    textright:{
        marginRight:20
    },
    mesg:{
        marginLeft:10
    },
    time:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',

    },
    contentitem:{
        flexDirection:'column',
        height:75,
        // alignItems:'center',
        marginLeft:20
    },
    itemlist:{
        flexDirection:'row',
        // alignItems:'center'
    },
    colview:{
        flexDirection:'column',justifyContent:'flex-start',alignItems:'center',marginLeft:20
    },
    leftview:{
        flexDirection:'row',justifyContent:'flex-end',alignItems:'center'
    },
    con:{
        flex:1,
        backgroundColor:'#f9f9f9'
    },
    text:{
        fontSize:14,
        color:'#282828'
    },
    textsmal:{
       fontSize:10,
       color:'#B2B2B2'
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
export default styles