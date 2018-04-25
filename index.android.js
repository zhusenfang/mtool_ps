/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';
import StackNavi from './app/StackNavi'
import ChangeStack from './app/ChangeStack'
import Storage from './app/common/GGAsyncStorage'
import Login from "./app/view/Login";
const PlaceHolderView = () => (
    <Text style={{flex: 1, paddingTop: 300, textAlign: 'center', color: 'gray'}}>努力加载中......</Text>
);
export default class MTool extends Component {
constructor(props){
    super(props)
    this.state={
        isChange:true,
        type:'',
        startType:0,
    }
    Storage.get('isfir')
        .then(isFirstLaunch => {
            Storage.save('isfir', false);
            if (isFirstLaunch === null) {
                this.setState({ startType: 1 });
            } else {
                this.setState({ startType: 2 });
            }
        })
        .catch(err => {});
}
    componentDidMount(){
    Storage.get('type').then((tage)=>{
       this.setState({
           type:tage
       })
    })
     this.listener=DeviceEventEmitter.addListener('DiaoDu',(e)=>{
        // alert(e)
         this.setState({
             isChange:false
         })
     })
    }
    componentWillUnmount(){
        this.listener&&this.listener.remove()
    }
    render() {

        // alert(this.state.isChange)
        let mainview=this.state.isChange===false||this.state.type===4?<ChangeStack/>:<StackNavi/>
        return (
            <View style={styles.container}>
                {mainview}
            </View>

        );
        if(this.state.startType===1){
            return <Login/>
        }else {
            if(this.state.startType===0){
                return <PlaceHolderView/>
            }else {
                if(this.state.isChange===false||this.state.type===4){
                    return <ChangeStack/>
                }else {
                    return <StackNavi/>
                }
            }
        }
        // if(this.state.isChange===false||this.state.type===4){
        //     return <ChangeStack/>
        // }else {
        //     return <StackNavi/>
        // }
        // if(this.state.startType===0){
        //     return <PlaceHolderView/>
        // }else {
        //     if(this.state.isChange===false||this.state.type===4){
        //         return <ChangeStack/>
        //     }else {
        //         return <StackNavi/>
        //     }
        // }
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
})


AppRegistry.registerComponent('MTool', () => MTool);
