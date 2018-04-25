import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import Contants from '../../../common/Contants';
import {API,postFetch} from '../../../common/GConst';
export default class MainSetting extends Component{
    constructor(props){
        super(props)
this.state={
    money:0,
    // fixDeposit:0,
    name:'',
    description:'',
    pic:""
}
    }
    static navigationOptions = ({navigation, screenProps}) => ({

        header: null,
        gesturesEnabled:false,

    })
    componentDidMount(){
        postFetch(API.PickerYuE,null,(result)=>{
            // alert(JSON.stringify(result))
            if(result.status==1){
                this.setState({
                    // money:result.data.account,
                    // fixDeposit:result.data.fixDeposit
                    money:result.data.userMemberAccount.account,
                    name:result.data.userMember.nickname,
                    description:result.data.userMember.introduction,
                    pic:result.data.userMember.picUrl,

                })
            }
        })
    }
    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#f9f9f9'}}>
                <View style={styles.tou}>
                    <View style={styles.flex}>
                        <Image source={{uri:this.state.pic}} style={[styles.img,{width:45,height:45}]}/>
                        <View style={styles.wenzi}>
                            <Text>{this.state.name}</Text>
                            <Text>{this.state.description}</Text>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Image source={require('../../../img/shezhi/erweima.png')} style={styles.switch}/>
                        <Image source={require('../../../img/shezhi/jian.png')}/>
                    </View>
                </View>

                <Text style={styles.text}>店铺设置</Text>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,1)}
                    leftTitle="商品分类"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/goodsfenlei.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,2)}
                    leftTitle="商品管理"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/goodsmanage.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,3)}
                    leftTitle="费用管理"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/feiyongmanage.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,4)}
                    leftTitle="快捷输入"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/quckily.png')}
                >

                </Item>
                <Text style={styles.text}>账户设置</Text>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,5)}
                    leftTitle="账户与安全"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/zhanghuan.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,6)}
                    leftTitle="店铺信息"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/dianpumanage.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,7)}
                    leftTitle="隐私设置"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/yinsi.png')}
                >

                </Item>
                <View style={{width:Contants.Screen.width,height:1,backgroundColor:'#E5E5E5'}}></View>
                <Item
                    action={this.changeAction.bind(this,8)}
                    leftTitle="新消息提醒"
                    // rightTitle='>'
                    leftImage={require('../../../img/goods/newstixing.png')}
                >

                </Item>
            </ScrollView>
        )
    }
    changeAction(index){
        switch (index){
            case 1:{
                this.props.navigation.navigate("ClassifyOrder")
                break;
            }
            case 2:{
                this.props.navigation.navigate('GoodsManage')
                break;
            }
            case 3:{
               this.props.navigation.navigate('FeiYongManage')
                break;
            }
            case 4:{
               this.props.navigation.navigate('QuicklyInput')
                break;
            }
            case 5:{
                this.props.navigation.navigate('AccountSercity')
                break;
            }
            case 6:{
                this.props.navigation.navigate('DianMessage')
                break;
            }

        }
    }
}
var Item=React.createClass({
    render(){
        return(
            <TouchableOpacity activeOpacity={1} onPress={() => {
                this.props.action()
            }}>

                <View style={styles.container}>
                    <View style={styles.flex}>
                  <Image source={this.props.leftImage} style={styles.xing}/>
                    <Text style={styles.leftView}>{this.props.leftTitle}</Text>
                    </View>
                    <View style={styles.rightView}>

                        {/*<Text style={{color: "#a8a8a8", fontSize: 15}}>{this.props.rightTitle}</Text>*/}
                       <Image source={require('../../../img/shezhi/jian.png')}/>
                    </View>

                </View>

            </TouchableOpacity>

        )
    }
})
const styles=StyleSheet.create({
    contain:{
        flex:1
    },
    text:{
        marginTop:30,
        marginLeft:20,
        marginBottom:20,
        fontSize:18,
        color:'black',
    },
    container:{
        width:Contants.Screen.width,
        backgroundColor:"white",
        height:45,
        marginTop:1,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    rightView:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginRight:20,
    },

    leftView:{
        marginLeft:5,
        fontSize:15,
        // color:"#1c1c1c"
    },
    heng:{
        width:Contants.Screen.width,
        height:1,
        backgroundColor:"#C0C0C0"
    },
    cont:{
        marginLeft:10,
        marginTop:10,
        marginBottom:10
    },
    tou:{
        flexDirection:'row',
        height:50,
        backgroundColor:'white',
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-between'

    },
    wenzi:{
        flexDirection:'column',
        marginLeft:5,
        justifyContent:"flex-start",

    },
    right:{
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
        marginRight:20
    },
    flex:{
        flexDirection:'row',
        justifyContent:'flex-start',

    },
    img:{
        marginLeft:10
    },
    switch:{
        marginRight:20
    },
    xing:{
        marginLeft:20
    }
})