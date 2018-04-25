import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';
import Storage from '../common/GGAsyncStorage'
var event='http://122.112.196.52:8080/mtool/portal/api/'
var API={
    Register:"http://122.112.196.52:8080/mtool/portal/api/communication/smsverificode/registuser",
    Search:'http://122.112.196.52:8080/mtool/portal/api/orderdining/search_merchant_order',
    SearchDetail:event+'orderdining/search_order_detail',
    ForgetPwd:event+'communication/smsverificode/forgetpassword',
    Password:event+'communication/smsverificode/identification',
    ResetPwd:event+'user/member/updatepassword',
    Order:event+'expressage/expressageorder/find_order_list',
    FirstOrder:event+'expressage/expressageorder/find_pending_order_list',
    chaoshi:event+'orderdining/exec_order_cancel',
    OrderDetail:event+'expressage/expressageorder/find_expressageorder_by_id',
    RefuseOrder:event+'expressage/expressageexcep/find_expressagerejectreason',
    BuChongOrder:event+'expressage/expressageexcep/save_expressageexcep',
    ListOrder:event+'foodgroup/view_food_group',
    ResetListOrder:event+'foodgroup/add_food_group',
    DelectListOrder:event+'foodgroup/del_food_group',
    PaiXu:event+'foodgroup/exchange_food_group',
    ClassifyDetail:event+'foodgroup/find_food_group_detail',
    TotalGoods:event+'foodinfo/view_foodinfo_shop',
    ShangChuan:'http://img.dahonghuo.com.cn/fileService/file/upload/'+'png',
    // ShangChuan:'http://img.zhaomini.com/fileService/file/upload/'+'png',
    GuanLi:event+'merchantrestaurants/restaurantsallofee_detail',

    GoodsAddings:event+'foodinfo/add_foodinfo_shop',
    PeiSongType:event+'expressage/merchant/shop_restaurantsallofee_list',
    FeiYongReset:event+'merchantrestaurants/update_restaurantsallofee_shop',
    TotalHuifu:event+'merchantusershortmsg/list_merchantusershortmsg',
    AddingHuifu:event+'merchantusershortmsg/add_merchantusershortmsg',
    DelectHuifu:event+'merchantusershortmsg/del_merchantusershortmsg',
    GengHuifu:event+'merchantusershortmsg/update_merchantusershortmsg',
    BianJiGoods:event+'foodinfo/find_foodinfo_detail_edit',
    DelectGoodsManage:event+'foodinfo/del_food',
    SoureGeng:event+'foodinfo/upt_foodinfo_detail_edit',
    DianPuMessage:event+'merchantrestaurants/view_restaurants_msg',
    DianPuReset:event+'merchantrestaurants/edit_restaurants',
    PickerYuE:event+'merchantrestaurants/account_detail',
    Shouzi:event+'total/countmemberaccount/account_income_expenses',
    TodayDetail:event+'user/memberaccountdetail/mem_account_detail',
    BaoZhangJin:event+'user/memberaccount/add_account_number',
    YingYe:event+'merchantrestaurants/update_restaurants_status',
    DongTai:event+'forum/post/findforumPost',
    TianJiaFenl:event+'foodinfo/add_food_by_group',
    RefuseOrderShuoM:event+'orderdiningrefund/save_order_reason',
    ShanChuGoods:event+'foodinfo/del_food_by_group',
    AccountSercitys:event+'user/member/userImfo',
    JieDan:event+'expressage/expressageorder/confirm',
    QiangDan:event+'expressage/expressageorder/jxdj',
    WaisongJieDan:event+'expressage/expressageorder/jxdj_pend',
    SureSongDa:event+'expressage/expressageorder/finish',
    SureQuCan:event+'expressage/expressageorder/confirm',
    YiChangOrder:event+'orderdining/search_exception_order',
    ZhangJing:event+'user/memberaccount/account_detail',
    WeChatZhif:event+'orderrecharge/create_order_recharge',
    HistoryOrder:event+'orderdining/search_complete_merchant_order',
    DaiShouliOrder:event+'expressage/expressageorder/find_pending_expressageorder_by_id',
    YiChangs:event+'expressage/expressageorder/find_order_list',
    DiaoDuOrder:event+'expressage/expressageexcep/find_expressageexcep_by_checkstatus',
    DiaoDuAgree:event+'expressage/expressageexcep/update_checkstatus',
    DingDan:event+'expressage/expressageorder/find_expressageorder_by_id_audio',
    PerSongYuan:event+'expressage/expressagecourier/find_delivery_expressagecouriers',
    ZhiPaiWHO:event+'expressage/expressageorder/allocation_order',
    ChaKanP:event+'expressage/expressagecourier/look_delivery_courier',
    KaiShang:event+'expressage/expressagecourier/update_delivery_detail',
    Personnal:event+'expressage/expressagecourier/find_expressagecourier_detail',
    Personalmessage:event+'expressage/expressagecourier/find_expressagecourier_by_userid',
    ZhangHuMingxi:event+'user/memberaccountdetail/account_income_expenses_current_month',
    TuiChuLogin:event+'user/member/logout',
    DuanXinYanZheng:event+'communication/smsverificode/loginuser',
    DuanXinLogin:event+'user/member/loginUser',
    SearchOrder:event+'expressage/expressageorder/ordered_history_search',
    DiaoDuSearch:event+'expressage/expressageexcep/ordered_history_search_audio',
    DingDanGaiLan:event+'expressage/expressageorder/ordered_general',
    TongXunLus:event+'chatrelation/find_expressage_friend_byuserid',
    Orderhistory:event+'expressage/expressageorder/find_order_list_his'
}

var ObjectTransform = (obj)=>{

    var tempStr = "";

    for(var key in obj){

        tempStr += key+"="+obj[key]+"&";
    }

    let index = tempStr.lastIndexOf('&');

    tempStr = tempStr.substring(0,index);

    return tempStr;

}

var getFetch=function (url,data,success,failure) {
    var str=ObjectTransform(data);
    return fetch(url+"?"+str,{
        method:"GET",
        headers:{
            "Authorization":"bearer "+token,
        }
    }).then((response)=>response.json()).then((responseData)=>{
        success(responseData)
    }).catch((error)=>{
        if(failure!=null){
            failure(error)
        }
    }).done()

}

var postFetch=(url,data,success,failure,tempthis) =>{


    var config=null;
    config = {

        method:"POST",
         // body:ObjectTransform(data),
        body:JSON.stringify(data),
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
    };

    // if(token==null){
    //     config = {
    //
    //         method:"POST",
    //         body:ObjectTransform(data),
    //         headers:{
    //             "Content-Type":"application/x-www-form-urlencoded",
    //         }
    //     };
    // }else {
    //     config = {
    //
    //         method:"POST",
    //         body:ObjectTransform(data),
    //         headers:{
    //             "Authorization":"bearer "+token,
    //             "Content-Type":"application/x-www-form-urlencoded",
    //         }
    //     };
    // }
    return fetch(url,config).then((response)=>{
        return response.json()
    })

        .then((result) => {
            // alert(JSON.stringify(result))
            if(result.status==2){
                // alert(JSON.stringify(result.status))
                Storage.get('phoneNumber').then((phoneNumber)=>{

                    // Storage.get('pwd').then((pwd)=>{
                        Storage.get('isFirstL').then((isLogin)=>{
                            Storage.get('isLogin').then((userId)=> {
                                if (isLogin == true||userId==true) {

                                    fetch("http://122.112.196.52:8080/mtool/portal/api/user/member/free_login", {
                                        method: "POST",
                                        headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
                                        body: JSON.stringify({
                                            // username: phoneNumber,
                                            phone: phoneNumber
                                        })
                                    }).then((response) => (
                                        response.json()
                                    ).then((responseData) => {
                                        // alert(JSON.stringify(responseData))

                                        if (responseData.status == 1) {
                                            // toast.show(responseData.msg)
                                             Storage.save("isLogin",true);
                                             Storage.save("phoneNumber",phoneNumber);
                                            // Storage.save("pwd",pwd)
                                            Storage.save("userId",responseData.data.id)
                                            //  alert(JSON.stringify(responseData.data))
                                            // this.props.navigation.navigate('Index');
                                            DeviceEventEmitter.emit('HOMEPAGE','Index重新加载')

                                        } else {
                                            // toast.show(responseData.msg)
                                        }

                                    }).catch((error) => {

                                    }))

                                }
                            })
                        })


                    })
                // })


            }else {
                success(result);
            }


        }).catch((error) => {

            failure != null && failure(error);
        });
}

module.exports={API,ObjectTransform,getFetch,postFetch}