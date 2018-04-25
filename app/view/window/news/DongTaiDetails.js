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
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Contants from '../../../common/Contants'
import TabBar from '../../../common/DfyTabBar'
import DongTaiFirst from './DongTaiFirst'
import DongTaiPing from './DongTaiPing'
const tabTcon=[
    require('../../../img/page/clocku.png'),
    require('../../../img/page/mu.png'),

]
const tabTconsel=[
    require('../../../img/page/clock.png'),
    require('../../../img/page/mus.png'),

]
var navigation=null
export default class DongTaiDetails extends Component {
    constructor(props){
        super(props)
        navigation=this.props.navigation
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    render(){
        return(<View style={{flex:1,flexDirection:'row',zIndex:100}}>
            <ScrollableTabView
                style={{marginTop:10,marginBottom:10}}
                tabBarPosition='top'
                renderTabBar={() => <TabBar tabIconNames={tabTcon}
                                            selectedTabIconNames={tabTconsel}
                />}

                onChangeTab={
                    (obj) => {
                        console.log('被选中的tab下标：' + obj.i);
                    }
                }

                onScroll={
                    (position) => {
                        console.log('滑动时的位置：' + position);
                    }
                }
            >

                <DongTaiFirst navigation={navigation}/>
                <DongTaiPing navigation={navigation}/>

            </ScrollableTabView>
            <TouchableOpacity style={{height:30,width:30,position:'absolute',marginTop:20,marginLeft:Contants.Screen.width-40}}
                              onPress={this.touch.bind(this)}
            >
                <Image source={require('../../../img/page/arrow.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
        </View>)
    }
    touch(){
        this.props.navigation.goBack()
    }
}