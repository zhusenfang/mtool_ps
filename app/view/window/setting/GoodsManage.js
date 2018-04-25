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
import {API,postFetch} from '../../../common/GConst'
const s=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
// const ;
export default class MainSetting extends Component{
    constructor(props){
        super(props);
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            dataSourcea: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            title:'',
            titls:'',
            k:[],
            destlist:[],
        }
    }
    componentDidMount(){
        postFetch(API.TotalGoods,null,(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                var map = {},
                dest = []
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
              this.setState({
                  destlist:dest
              })
                // for(var i=0;i<s.length;i++){
                // var first=[];
                // for(var j=0;j<result.data.length;j++){
                //
                //     if(result.data[j].charAlpha.toUpperCase()==s[i]){
                //         first.push(result.data[j])
                //
                //     }
                //
                // }
                // // alert()
                // if(first.length > 0 ){
                //     // var second  = JSON.parse(JSON.stringify((first)))
                //     this.setState({
                //         title:first[0].charAlpha,
                //         dataSource:this.state.dataSource.cloneWithRows(first)
                //     })
                // }
                //
                // // alert(JSON.stringify(first))
                // //  break;
                //  }
                // this.setState({
                //     dataSource:this.state.dataSource.cloneWithRows(dest[7])
                // })
                // alert(JSON.stringify(dest))
                // if(result.data)
                // for(var i=0;i<result.data.length;i++){

                // if(result.data[i].charAlpha=='F'){
                //
                //     this.setState({
                //         k:result.data,
                //         title:'F',
                //         dataSource:this.state.dataSource.cloneWithRows(result.data)
                //     })
                // }else {
                //     if(result.data[i].charAlpha=='K'){
                //         this.setState({
                //             titles:result.data[i].charAlpha,
                //             dataSourcea:this.state.dataSourcea.cloneWithRows(result.data)
                //         })
                //     }else {
                //
                //     }
                // }
                // }
            }
        },(error)=>{
            alert(error)
        })


    }
    render(){
        // alert(JSON.stringify(dest))

        return(<ScrollView style={[comstyle.contain,{backgroundColor:"#f9f9f9"}]}>
            <View style={[comstyle.item,{marginTop:20}]}>
                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <Image source={require('../../../img/window/tianjia.png')} style={comstyle.maleft}/>
               <Text style={{marginLeft:10}}>添加商品</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('GoodsAdding')}}>
              <Image source={require('../../../img/window/rightbutton.png')}/>
                </TouchableOpacity>
            </View>
            <SectionList
                renderSectionHeader={this.sectionComp}
                // dataSource={this.state.dataSource}
                renderItem={this._renderRow}
                 sections={this.state.destlist}
            />

        </ScrollView>)
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
            <TouchableOpacity onPress={this.xiugai.bind(this,rowID,rowData.item.id)}>
            <Image source={require('../../../img/window/write.png')} style={[comstyle.img,{marginRight:20 }]}/>
            </TouchableOpacity>
        </View>)
    }
    sectionComp=(info)=>{
        // alert(JSON.stringify(info))
        return(<Text style={{fontSize:14,marginLeft:20,marginTop:15,marginBottom:10,color:"#282828"}}>{info.section.charAlpha}</Text>)
    }
    xiugai(rowId,rowdata){
      this.props.navigation.navigate('BianJiGoods',{data:rowdata,callback:(data)=>{}});
    }

}