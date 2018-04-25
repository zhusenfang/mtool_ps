import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    ListView
} from 'react-native';
import Contants from '../../../common/Contants';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TabBar from '../../../common/DfyTabBar'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
import SearchPage from '../../SearchPage'
import EndOrder from './EndOrder'
import EndOrderFirst from './EndOrderFirst'
import ProgressOrder from './ProgressOrder'
import OutOrder from './OutOrder'
import CommonModal from '../../CommonPage/ComonModal'
import OrderFinally from './OrderFinally'
const tabTcon=[
    require('../../../img/order/orderfirunpress.png'),
    require('../../../img/order/ordersecunpress.png'),
    require('../../../img/order/orderthunpress.png'),
    require('../../../img/order/orderforunpress.png')
]
const tabTconsel=[
    require('../../../img/order/orderfirpress.png'),
    require('../../../img/order/ordersecpress.png'),
    require('../../../img/order/orderthpress.png'),
    require('../../../img/order/orderforpress.png')
]
var navigation=null
export default class TotalOrder extends Component {
    constructor(props){
        super(props)
        navigation=this.props.navigation
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    render(){

        return(<View style={{flex:1,flexDirection:'column',zIndex:100,backgroundColor:'#f9f9f9'}}>
            <CommonModal navigation={navigation}/>
            <ScrollableTabView
                style={{marginTop:0,marginBottom:0}}
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

                <OutOrder navigation={navigation}/>
                <ProgressOrder navigation={navigation}/>
                <EndOrderFirst navigation={navigation}/>
                <OrderFinally navigation={navigation}/>

            </ScrollableTabView>
            <TouchableOpacity style={{height:30,width:30,position:'absolute',marginTop:25,marginLeft:Contants.Screen.width/2+30,backgroundColor:'white'}}
            onPress={this.touch.bind(this)}
            >
            <Image source={require('../../../img/page/arrow.png')}/>
            </TouchableOpacity>
        </View>)
    }
touch(){
        this.props.navigation.goBack()
}
}