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
import Message from './NewsMessage';
import TongXunLu from './TongXunLu'
import CommonModal from '../../CommonPage/ComonModal'
const tabTcon=[
    require('../../../img/pinglun/newsunpress.png'),
    // require('../../../img/page/mu.png'),
    require('../../../img/pinglun/tongxulu.png')
]
const tabTconsel=[
    require('../../../img/pinglun/news.png'),
    // require('../../../img/page/mus.png'),
    require('../../../img/pinglun/tongxulupress.png')
]
var navigation=null
export default class NewsMain extends Component {
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

                <Message navigation={navigation}/>
                {/*<DongTai navigation={navigation}/>*/}
                <TongXunLu navigation={navigation}/>
            </ScrollableTabView>
            <TouchableOpacity style={{position:'absolute',marginTop:25,backgroundColor:'white',alignSelf:'flex-end',}}
                              onPress={this.touch.bind(this)}
            >
                <Image source={require('../../../img/page/arrow.png')} style={{marginRight:Contants.Screen.width/6+10}}/>
                {/*<View></View>*/}
            </TouchableOpacity>
        </View>)
    }
    touch(){
        this.props.navigation.goBack()
    }
}