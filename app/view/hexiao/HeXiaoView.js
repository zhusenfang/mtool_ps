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
    FlatList
} from 'react-native';
import comstyle from '../../common/CommonStyle';
import {API,postFetch} from '../../common/GConst';
// import Camera from 'react-native-camera'
// import {QRScannerView} from 'ac-qrcode';
import dismissKeyboard from 'dismissKeyboard'
var TimerMixin = require('react-timer-mixin');
import Toast, {DURATION}  from 'react-native-easy-toast';
import Contants from '../../common/Contants';
import Modal from 'react-native-modal'
import CommonTextInput from '../CommonPage/CommonTextInput'
let Headers=[];
// import Tts from 'react-native-tts'
export default class HeXiaoView extends Component{

    constructor(props){
        super(props)
       this.state={
           // isFlashLight:Camera.constants.TorchMode.off,
           isNumerOpenDoor:false,
           number:"",
           scantime:0,

           //是否显示使用帮助
           isModalVisible:false,
           //闪光灯的开关


           list:[],
          cell:0,

       }
        mixins: [TimerMixin]
    }

    // componentWillUnmount(){
    //
    //     // this.clearInterval(this.timer);
    // }
    componentWillUnmount() {
        Headers = [];
    };
    componentDidMount(){
        // Tts.setDucking(true);
        // Tts.speak('Hello,world');
        // // Tts.stop();
        // Tts.voices().then(voices => alert(voices));
        this.timer = setInterval(()=>{
            // alert('ss')

            this.setState({
                cell:this.state.cell+1
            })


        },1000)

     // postFetch(API.TotalGoods,null,(result)=>{
     //     // alert(JSON.stringify(result))
     //     if(result.status==1){
     //         var map = {},
     //             dest = []
     //         for(var i = 0; i < result.data.length; i++){
     //             this.setState({
     //                 k:result.data
     //             })
     //             var ai = result.data[i];
     //             if(!map[ai.charAlpha]){
     //                 dest.push({
     //                     charAlpha: ai.charAlpha,
     //                     // name: ai.name,
     //                     data: [ai]
     //                 });
     //                 map[ai.charAlpha] = ai;
     //             }else{
     //                 for(var j = 0; j < dest.length; j++){
     //                     var dj = dest[j];
     //                     if(dj.charAlpha == ai.charAlpha){
     //                         dj.data.push(ai);
     //                         break;
     //                     }
     //                 }
     //             }
     //         }
     //         this.setState({
     //             list:dest
     //         })

             // alert(JSON.stringify(this.state.list))
             // this.setState({
             //     list:result.data
             // })
         // }
     // })
     //
     //    this.state.list.map((item,i)=>{
     //        Headers.push(item.charAlpha)
     //    })
        // this.timer = this.setInterval(()=>{
        //
        //     if(this.state.scantime == 18){
        //
        //         this.clearInterval(this.timer);
        //
        //         if(isScanEnd == false){
        //
        //             this.setState({
        //
        //                 isNumerOpenDoor:true,
        //             })
        //
        //         }
        //     }
        //
        //     this.setState({
        //
        //         scantime:this.state.scantime+1,
        //     })
        //
        //
        // },1000)



    }
    itemChange = (info) => {
        let section = info.viewableItems[0].section.charAlpha;

        if (section) {
            let index = Headers.indexOf(section);
            if (index < 0) {
                index = 0;
            }
            this.setState({ cell : index });
        }
    }

    render(){
        return(<View style={[comstyle.contain,{backgroundColor:'#f9f9f9',flexDirection:'row',}]}>
                {/*<FlatList*/}
                    {/*ref='FlatList'*/}
                    {/*style={ScanCodeStyle.leftList}*/}
                    {/*data={ this.state.list }*/}
                    {/*renderItem={(item) => this.renderLRow(item)}*/}
                    {/*// ItemSeparatorComponent={ () => this.separator() }*/}
                    {/*keyExtractor={ (item) => item.charAlpha }*/}
                {/*/>*/}

                {/*<SectionList*/}
                    {/*ref='sectionList'*/}
                    {/*renderSectionHeader={this.sectionComp}*/}
                    {/*// dataSource={this.state.dataSource}*/}
                    {/*renderItem={this._renderRow}*/}
                    {/*sections={this.state.list}*/}
                    {/*keyExtractor={ (item) => item.name }*/}
                    {/*// scrollToIndex={()=>{}}*/}
                    {/*onViewableItemsChanged={ (info) => this.itemChange(info)}*/}
                {/*/>*/}
                <Text>{this.state.cell}</Text>

        </View>)
    }
    renderLRow = (item) => {
        return (
            <TouchableOpacity style={[ ScanCodeStyle.lItem, {backgroundColor: item.index == this.state.cell ? 'white' : null} ]}
                              onPress={()=>this.cellAction(item)}>
                <Text style={ScanCodeStyle.lText}>{ item.item.charAlpha }</Text>
            </TouchableOpacity>
        )
    };
    cellAction = (item) => {
        if (item.index <= this.state.list.length) {
            this.setState({
                cell : item.index
            });
            if (item.index > 0) {
                var count = 0;
                for (var i = 0;
                     i < item.index;
                     i++) {
                    count += this.state.list[ i ].data.length + 2
                    // alert(count)
                }
                this.refs.sectionList.scrollToIndex({ animated : false, index : count })
            } else {
                this.refs.sectionList.scrollToIndex({ animated : false, index : 0 });
            }

        }

    }
    sectionComp=(info)=>{
        // alert(JSON.stringify(info))
        return(<Text style={{fontSize:14,height:30,justifyContent:'center',alignItems:'center',color:"#282828"}}>{info.section.charAlpha}</Text>)
    }
    _renderRow=(rowData,sectionID,rowID)=>{
        // alert(JSON.stringify(rowData))
        return(<View style={{flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            backgroundColor:'white',
            height:50,marginTop:10}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Image source={{uri:rowData.item.imgUrl}} style={{width:45,height:45,marginLeft:20}} />
                <Text style={{marginLeft:10}}>{rowData.item.name}</Text>
            </View>
            <TouchableOpacity>
                <Image source={require('../../img/window/write.png')} style={[comstyle.img,{marginRight:20 }]}/>
            </TouchableOpacity>
        </View>)
    }
    _renderTopView() {

        return <Text style={ScanCodeStyle.top}>将条码/二维码放入框内</Text>
    }
    _renderBottomView(){

        return (

            <View style={ScanCodeStyle.bottom}>

                <TouchableOpacity onPress={this.bottomAction.bind(this,1)} style={{marginLeft:(Contants.Screen.width-100),alignItems:"center"}}>
                    <Image style={{width:20,height:20}} source={require("../../img/window/write.png")}/>
                    <Text style={{marginTop:8,color:"white"}}>手动输入</Text>
                </TouchableOpacity>

                {/*<TouchableOpacity onPress={this.bottomAction.bind(this,2)} style={{marginLeft:(Contants.Screen.width-100)/3,alignItems:"center"}}>*/}
                    {/*<Image style={{width:20,height:20}} source={require("../../img/window/write.png")}/>*/}
                    {/*<Text style={{marginTop:8,color:"white"}}>手电筒</Text>*/}
                {/*</TouchableOpacity>*/}

            </View>
        )

    }
    /****************按钮事件***************************/


    barcodeReceived(e) {

        isScanEnd = true;

        if (this.transCode !== "888") {

            //放在this上，防止触发多次，setstate有延时
            this.transCode = "888";

            var mipaoIP2 = e.data.substr(0,22);

            var mipaoIP1 = e.data.substr(0,20);

            // if(!((mipaoIP1 === "http://120.76.31.198" || mipaoIP2 === "http://www.misspao.com"))){
            //
            //     // this._toast.close();
            //     this._toast.show("二维码格式有误",1500);
            //     return;
            //
            // }
            var number = e.data.substring(38);

            var reg = /^[0-9]*$/g;

            if(!reg.test(number)){

                number = e.data.substring(40);
            }

          alert('sss')

        }
    }
    bottomAction(index){

        //1手动输入 2摄像头
        if(index == 2){

            // if(this.state.isFlashLight == Camera.constants.TorchMode.on){
            //
            //     this.setState({
            //
            //         isFlashLight:Camera.constants.TorchMode.off,
            //     })
            //
            // }else{
            //
            //     this.setState({
            //
            //         isFlashLight:Camera.constants.TorchMode.on,
            //     })
            // }

        }else{

            this.setState({

                isNumerOpenDoor:!this.state.isNumerOpenDoor,
            })


        }

    }
}
var ScanCodeStyle = StyleSheet.create({

    top:{

        width:160,
        borderColor:"rgb(200,160,21)",
        borderWidth:1,
        borderRadius:8,
        marginLeft:Contants.Screen.width/2-75,
        textAlign:"center",
        padding:10,
        color:"rgb(200,160,21)",
        marginTop:30,
    },

    bottom: {

        flexDirection: "row",
        width: "100%",
        height: 160,
        backgroundColor: "transparent",

    },
    leftList : {
        width : 1 * Contants.Screen.width / 4,
        backgroundColor : '#E9E9EF'
    },
    lItem : {
        minHeight : 44,
        justifyContent : 'center',
    },
    lText : {
        marginLeft : 10,
        marginRight : 10,
        fontSize : 16,
    },
})
