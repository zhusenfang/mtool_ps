import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Button,
    ListView,
    ScrollView,
    SectionList
} from 'react-native';
import Contants from '../../../common/Contants'
import comstyle from '../../../common/CommonStyle';
import Modal from 'react-native-modal';
import Toast from "react-native-easy-toast";
import {API,postFetch} from '../../../common/GConst';
import CheckBox from '../../../common/CheckView'
const s=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
let b=new Array();
export default class ClassifyAdd extends Component{

    constructor(props){
        super(props)
        this.state={

            title:'',
            titls:'',
            k:[],
            destlist:[],
            selectItem:[],
            pickerMore:false,
            isEdict: true,
            selectArray: [],
            array:[],
            imgurls:require('../../../img/window/emptyCircle.png'),
            showimg:false,
            list:[],
            selectImage:false,
            params:''
        }

    }
    componentDidMount(){

     postFetch(API.TotalGoods,null,(result)=>{
         // alert(JSON.stringify(result))
         // b=result.data
         if(result.status==1){
             var map = {},
                 dest = [];
             for(var i = 0; i < result.data.length; i++){
                 this.setState({
                     k:result.data
                 })
                 var ai = result.data[i];
                 if(!map[ai.charAlpha]){
                     dest.push({
                         charAlpha: ai.charAlpha,
                         // name: ai.name,
                         data: [ai]
                     });
                     map[ai.charAlpha] = ai;
                 }else{
                     for(var j = 0; j < dest.length; j++){
                         var dj = dest[j];
                         if(dj.charAlpha == ai.charAlpha){
                             dj.data.push(ai);
                             break;
                         }
                     }
                 }
             }
             // b=dest
             this.setState({
                 destlist:dest,

             })

         }
     },(error)=>{
         alert(error)
     })


    }
    render(){
        const{navigate,goBack,state}=this.props.navigation;
        state.params.callback('')
        // alert(JSON.stringify(list))
        // alert(JSON.stringify(dest))
        // this.state.destlist.map((item,index)=>{
        //     let datas=item.item
        //     datas.map((i,d)=>{
        //         i['checked']=false
        //     })
        // })
        return(<ScrollView style={[comstyle.contain,{backgroundColor:"#f9f9f9"}]}>
            <View style={[comstyle.item,{marginTop:20}]}>
                <Text style={{marginLeft:20}}>添加商品</Text>
                <TouchableOpacity onPress={this.tijjiao.bind(this)}>
                <Image source={require('../../../img/window/duigou.png')} style={{width:20,height:20}}/>
                </TouchableOpacity>
                {/*onPress={()=>{this.props.navigation.navigate('GoodsAdding')}}*/}
                <TouchableOpacity>
                    <Image source={require('../../../img/window/rightbutton.png')}/>
                </TouchableOpacity>
            </View>
            <SectionList
                renderSectionHeader={this.sectionComp}
                // dataSource={this.state.dataSource}
                renderItem={this._renderRow}
                sections={this.state.destlist}
            />
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />
        </ScrollView>)
    }
    _renderRow=(rowData,sectionID,rowID,highlightRow)=>{
        // alert(JSON.stringify(rowData))
        return(<View style={{flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            backgroundColor:'white',
            height:50,marginTop:10}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Image source={{uri:rowData.item.imgUrl}} style={{width:45,height:45,marginLeft:20}}/>
                <Text style={{marginLeft:10}}>{rowData.item.name}</Text>
            </View>
            {/*<TouchableOpacity onPress={this._change.bind(this,rowData.item.id)}>*/}
                {/*/!*<Image source={this.state.imgurls} />*!/*/}
                {/*<Image style={{marginRight:40,width:20,height:20,backgroundColor:'red'}}*/}
                 {/*source={}*/}
               {/*/>*/}
              {/*/!*<CheckBox/>*!/*/}
            {/*</TouchableOpacity>*/}
            <CheckBox onChange={this._change.bind(this,rowData.item.id)} style={{marginRight:20}}/>
            {/*{this.renderShowEditView(this.state.isEdict, rowData, rowID, ()=> {*/}
                {/*this.rightOnPress(rowData, rowID)*/}
            {/*})}*/}
        </View>)
    }
    sectionComp=(info)=>{
        // alert(JSON.stringify(info))
        return(<Text style={{fontSize:14,marginLeft:20,marginTop:15,marginBottom:10,color:"#282828"}}>{info.section.charAlpha}</Text>)
    }
    // xiugai(rowId,rowdata){
    //     this.props.navigation.navigate('BianJiGoods',{data:rowdata});
    // }
    _change(info){
 // alert(JSON.stringify(this.state.imgurls))

        var dou=false
        for (var i = 0; i < this.state.list.length; i++) {
            if (this.state.list[i] == info) {
                dou=true
            }
        }
        if(!dou){
            this.state.list.push(info)
        }else {
            for (var i = 0; i < this.state.list.length; i++) {
                if (this.state.list[i] == info) {
                    this.state.list.splice(i,1)
                }
            }
        }

    }
    tijjiao(){
        // alert(JSON.stringify(this.state.list))
        const list=this.props.navigation.state.params.data;
        // alert(JSON.stringify(this.state.list))
       postFetch(API.TianJiaFenl,{groupId:list,foodids:this.state.list},(result)=>{
           // alert(JSON.stringify(result))
           if(result.status==1){
               this._toast.show(result.data)
               // this.props.navigation.navigate('ClassifyDetails');
           // this.props.navigation.goBack();
           }
       })
    }
//     //按钮选择
//     rightOnPress=(rowData,index)=>{
//         // let array=this.state.destlist;
//
//         // this.setState({
//         //     destlist:newArray
//         // })
//
//
//         let selectArray=this.state.selectArray;
//        let data=this.state.array;
//        let newArrays=[]
//         for(let i=0;i<data.length;i++){
//            let dict=data[i];
//            if(index==i){
//                if(dict.isSelect==true){
//                    dict.isSelect=false
//                    for (let j=0;j<selectArray.length;j++){
//                        let id=selectArray[j];
//                        if(id==dict.id){
//                            selectArray.splice(j,1);
//                        }
//                    }
//                }else {
//                    dict.isSelect=true
//                    selectArray.push(dict.id)
//                }
//            }
//           newArrays.push(dict)
//         }
//         // this.setState({
//         //     selectArray:selectArray,
//         //     destlist:newArray
//         // })
// }


    // //是否选中
    // renderShowEditView(isEdict, rowData, index, onPress) {
    //     let newArray=[]
    //     //给自己增加一个状态，控制是否选中
    //     for(let f=0;f<rowData.item.length;f++){
    //         let dict=rowData.item[f]
    //         dict.isSelect=false;
    //         newArray.push(dict)
    //         // alert(JSON.stringify(dict))
    //     }
    //     this.setState({
    //         array:newArray
    //     })
    //     // alert(rowData.isSelect)
    //     if (isEdict == true) {
    //         let imageURL = require('../../../img/window/emptyCircle.png')
    //         if (rowData.isSelect == true) {
    //             imageURL = require('../../../img/window/strokeCircle.png')
    //         }
    //         return (
    //             <TouchableOpacity onPress={()=> {
    //                 onPress(newArray.isSelect, index)
    //             }} style={{height: 111, width: 40, justifyContent: 'center', alignItems: 'center'}}>
    //                 <Image style={{width: 30, height: 30}} source={imageURL}/>
    //             </TouchableOpacity>
    //         )
    //     }
    // }
}