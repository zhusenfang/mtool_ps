import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    ListView,
    KeyboardAvoidingView,
    TextInput,
    Animated,
    Platform,
    Easing,
    SectionList,
    FlatList,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import LocationIosView from '../nativemodal/LocationIosView'
import Contants from '../../../common/Contants';
var list=''
var cons=''
var addres=''
export default class GpsIosLocation extends Component{
    constructor(props){
        super(props)
        list=this.props.navigation.state.params.latitude;
        cons=this.props.navigation.state.params.longitude
        addres=this.props.navigation.state.params.adress
    }
    componentDidMount(){
        NativeModules.MapModual.toNaviActivity(list,cons,addres)
        this.listen=DeviceEventEmitter.addListener('locate',this.result)
        this.stop=DeviceEventEmitter.addListener('stopGPS',this.stopLocation)
    }
    stopLocation=(e)=>{
        if(e.code==0){
            this.props.navigation.goBack()
        }
    }
    result=(e)=>{
        if(e.code==0){
           // this._MapView.toNaviActivity(list,cons,addres)
        }
    }
    componentWillUnmount(){
       this.listen.remove()
    }
    render(){
        return(<View style={styles.cons}>
            <LocationIosView
                style={styles.map}
                ref={ component => this._MapView = component }
            />
        </View>)
    }

    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    componentDidUpdate(){
        // alert('sssss')
        //this._MapView.toNaviActivity(list,cons,addres)
    }

}
const styles=StyleSheet.create({
    map:{
        width:Contants.Screen.width,
        height:Contants.Screen.height,

    },
    cons:{
        flex:1
    }
})