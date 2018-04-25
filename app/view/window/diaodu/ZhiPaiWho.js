import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
    ListView
} from 'react-native';
import comstyle from '../../../common/CommonStyle'
import {API,postFetch} from '../../../common/GConst'
import Toast from "react-native-easy-toast";
var mSelectWhat = -1;
export default class ZhiPaiWho extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
    }
    componentWillMount(){
postFetch(API.PerSongYuan,null,(result)=>{
    // alert(JSON.stringify(result))
    if(result.status==1){
        // this.setState({
        //     dataSource:this.state.dataSource.cloneWithRows(result.data)
        // })
        var LetAll=result.data;
        result.data.map((o,i)=>{
            if(!this.props.mID){
                LetAll[i]['isCheck']=false
            }else {
                if(this.props.mID==o.user_id){
                    LetAll[i]['isCheck']=true
                }else {
                    LetAll[i]['isCheck']=false
                }
            }
        })
        this.LetAll=LetAll
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(JSON.parse(JSON.stringify(this.LetAll)))
        })

    }
},(error)=>{


})
    }
    render(){
        return(<View style={styles.contain}>

            {/*<Text>ss</Text>*/}
            <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            style={{marginTop:10}}
            />
            <Toast ref={(e) => {
                this._toast = e
            }}
                   position='center'
            />

        </View>)
    }
    _renderRow=(rowData,sectionID,rowID)=>{
       return(<View style={styles.item}>
          <View style={comstyle.rightview}>
              <Image source={{uri:rowData.userMember.picUrl}} style={{width:45,height:45,marginLeft:20}}/>
              <Text style={{marginLeft:10}}>{rowData.userMember.nickname}</Text>
          </View>
           <TouchableOpacity onPress={this.touch.bind(this,rowData,rowID)}>
           <Image source={require('../../../img/diaodu/whogo.png')} style={{marginRight:20,alignItems:'center',justifyContent:"center"}}>
               <Text style={styles.text}>让TA去</Text>
           </Image>
           </TouchableOpacity>
       </View>)
    }
    touch(item,index){
        const list=this.props.navigation.state.params.data;
        alert(JSON.stringify(list))
        if(item.isCheck){
            this.LetAll[index]['isCheck']=false;
            mSelectWhat=-1
        }else {
            this.LetAll.map((o,i)=>{
                if(i==index){
                    this.LetAll[i]['isCheck']=true
                    mSelectWhat=i;
                    // alert(JSON.stringify(this.LetAll[i]['isCheck']))
                    // if(this.LetAll[i]['isCheck'])==true)
                    if(this.LetAll[i]['isCheck']==true){
                        // alert(JSON.stringify(this.LetAll[i]['id']))
                        postFetch(API.ZhiPaiWHO,{id:list,deliveryUserId:this.LetAll[i]['id']},(result)=>{
                            // alert(JSON.stringify(result))
                            if(result.status==1){
                                this._toast.show(result.msg)
                            }
                        })

                    }
                }else {
                    this.LetAll[i]['isCheck']=false
                }
            })
        }

        this.setState({

            dataSource:this.state.dataSource.cloneWithRows(JSON.parse(JSON.stringify(this.LetAll)))
        })
    }
}
const styles=StyleSheet.create({
    contain:{
        backgroundColor:"#f9f9f9",
        flex:1
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        height:60,
        marginTop:10
    },
    text:{
        fontSize:14,
        color:'#FF305E'
    }
})