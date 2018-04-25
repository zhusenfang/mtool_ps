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
    TouchableOpacity,
    View,
    Image,
    StatusBar,
    Platform
} from 'react-native';
import Contants from './Contants'
// import Icon from 'react-native-vector-icons/Ionicons';
import Storage from './GGAsyncStorage'
var list=''
export default class DfyTabBar extends Component {
    static propTypes = {


        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合

        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
        selectedTabIconNames: React.PropTypes.array
    };  // 注意这里有分号


    render() {
        return (

            <View style={styles.tabs}>

                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}

            </View>
        );
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
        Storage.get('type').then((type)=>{
            list=type

        })
        // alert(list)
    }

    setAnimationValue({value}) {
        console.log('动画值：'+value);
    }


    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? "#6B8E23" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        let icon =this.props.activeTab ==i ? this.props.selectedTabIconNames[i]:this.props.tabIconNames[i];
        return (
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} key={i}>
                <View style={styles.tabItem}>
                    <Image
                        // name={this.props.tabIconNames[i]} // 图标
                        size={30}
                        source={icon}
                        // style={{width:24,height:23}}
                        color={color}/>
                    {/*<Text style={{color: color}}>*/}
                    {/*{this.props.tabNames[i]}*/}
                    {/*</Text>*/}
                </View>
            </TouchableOpacity>

        );
    }


}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 60,
        width:Contants.Screen.width,
        justifyContent:'flex-start',
        backgroundColor:'white',
        marginTop:Platform.OS==='ios'?20:0
    },

    tab: {
        // flex: 1,
        //justifyContent: 'center',
        // alignItems: 'flex-start',
        backgroundColor:'white'
    },

    tabItem: {
        // flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft:30,
        marginTop:20,
        backgroundColor:'white',
        alignSelf:'center',
    },

});

