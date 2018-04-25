import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Switch,
    TouchableOpacity,
    Image,
    FlatList,
    ListView
} from 'react-native';
import comstyle from '../../../common/CommonStyle';
import {API,postFetch} from '../../../common/GConst';
import Contants from '../../../common/Contants';
let datas
export default class DongTai extends Component{
    constructor(props){
        super(props)
         this.state={
            data:[],
             dataSource: new ListView.DataSource({
                 rowHasChanged: (row1, row2) => row1 !== row2,
             }),
         }
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    componentDidMount(){
        postFetch(API.DongTai,null,(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
             this.setState({
                 data:result.data
             })
                datas=result.data;
            }
        })
    }
    render(){
        console.warn(this.state.data)
        return(
            <View style={comstyle.contain}>
            <FlatList data={this.state.data}
            renderItem={this.renderItem.bind(this)}
            />
        </View>)
    }
    renderItem(rowData){
        if(rowData.item.forumThreadResources.length!=0){
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(rowData.item.forumThreadResources)
            })
        }
        // alert(JSON.stringify(rowData.item.userMember.picUrl))
        return(
            <View style={styles.toux}>
                <View style={styles.item}>
                    <Image source={{uri:rowData.item.userMember.picUrl}} style={styles.image}/>
                    <View style={styles.chixu}>
                        <Text>{rowData.item.userMember.nickname}</Text>
                        <Text>{rowData.item.createTime}</Text>
                    </View>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                />
                <View style={comstyle.heng}/>
                <View style={styles.item}>
                    <View style={styles.you}>
                        <View style={styles.kai}>
                            <Text>{rowData.item.content}</Text>
                        </View>
                        <View style={styles.kais}>
                            <Image source={require('../../../img/pinglun/pinglun.png')} style={styles.image}/>
                            <Text>{rowData.item.opposes}</Text>
                            <TouchableOpacity onPress={this.dianzan.bind(this,rowData.item)}>
                            <Image source={require('../../../img/pinglun/dianzan.png')} style={styles.image}/>
                            </TouchableOpacity>
                            <Text>{rowData.item.supports}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    dianzan(rowData){
        let array = datas;
        // alert(datas)
        var item=[]
        for(let i=0;i<array.length;i++){
            if(array[i].id==rowData.id){
                array[i].supports=array[i].supports+1
            }
            this.setState({
                data:array

            })
        }


    }
    _renderRow=(rowData)=>{
        return(<View>
            <Image source={{uri:rowData.resourceUrl}} style={{width:40,height:40}}/>
        </View>)
    }
}
const styles=StyleSheet.create({
  toux:{
      backgroundColor:'white',
      flexDirection:'column',
      // height:Contants.Screen.height/6,
      marginTop:10
  },
    item:{
      flexDirection:'row',
        flex:1,
        // borderWidth:1,
        // borderColor:'gray',
         alignItems:'center'
    },
    chixu:{
      flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    kai:{
      flexDirection:'row',
        flex:1,
        width:Contants.Screen.width,
        margin:4
    },
    kais:{
      flexDirection:'row',
        justifyContent:'flex-end',
        flex:1,
        width:Contants.Screen.width
    },
    you:{
      flexDirection:'column'
    },
    image:{
      width:20,
        height:20,
        marginRight:20
    }

})