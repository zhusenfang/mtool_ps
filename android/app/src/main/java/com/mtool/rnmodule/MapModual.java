package com.mtool.rnmodule;

import android.app.Activity;
import android.content.Intent;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.Poi;
import com.amap.api.navi.AmapNaviPage;
import com.amap.api.navi.AmapNaviParams;
import com.amap.api.navi.AmapNaviType;
import com.amap.api.navi.AmapPageType;
import com.amap.api.navi.INaviInfoCallback;
import com.amap.api.navi.model.AMapNaviLocation;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mtool.service.LocationInfoUploadService;
import com.mtool.util.LocateUtil;
import com.mtool.util.navi.AmapTTSController;

/**
 * Created by sshss on 2017/11/6.
 */

public class MapModual extends BaseModule implements LifecycleEventListener, ActivityEventListener {
    private ReactApplicationContext mReactContext;
    private AmapTTSController amapTTSController;
    private AMapLocation mMyLocation;
    private String mUserId = "1234";

    public MapModual(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        reactContext.addLifecycleEventListener(this);
        reactContext.addActivityEventListener(this);

        amapTTSController = AmapTTSController.getInstance(reactContext);
        amapTTSController.init();
    }

    @Override
    public String getName() {
        return "MapModual";
    }

    @ReactMethod
    public void locate() {
        LocateUtil.getInstance(new AMapLocationListener() {
            @Override
            public void onLocationChanged(AMapLocation aMapLocation) {
                System.out.println("onLocationChanged  " + aMapLocation.getErrorInfo());
                mMyLocation = aMapLocation;
                WritableMap event = Arguments.createMap();
                event.putInt("code", aMapLocation.getErrorCode());
                mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("locate", event);
            }
        }).locate();
    }


    @ReactMethod
    public void toNaviActivity(String address, double latitude, double longitude) {
        System.out.println("address: " + address + "  latitude: " + latitude + "  longitude: " + longitude);
        System.out.println("myLocate: " + mMyLocation.getLatitude() + "  " + mMyLocation.getLongitude());

        Poi end = new Poi("test终点", new LatLng(latitude, longitude), "");
        Poi start = new Poi("test起点", new LatLng(mMyLocation.getLatitude(), mMyLocation.getLongitude()), "");
        AmapNaviParams amapNaviParams = new AmapNaviParams(start, null, end, AmapNaviType.DRIVER, AmapPageType.NAVI);
        AmapNaviPage.getInstance().showRouteActivity(mReactContext, amapNaviParams, new INaviInfoCallback() {
            @Override
            public void onInitNaviFailure() {

            }

            @Override
            public void onGetNavigationText(String s) {
                amapTTSController.onGetNavigationText(s);
            }

            @Override
            public void onLocationChange(AMapNaviLocation aMapNaviLocation) {
//                System.out.println("navi onLocationChange:");
////                //构造上传位置信息
//                UploadInfo loadInfo = new UploadInfo();
//                //设置上传位置的坐标系支持AMap坐标数据与GPS数据
//                loadInfo.setCoordType(NearbySearch.AMAP);
//                //设置上传数据位置,位置的获取推荐使用高德定位sdk进行获取
//                NaviLatLng coord = aMapNaviLocation.getCoord();
//                loadInfo.setPoint(new LatLonPoint(coord.getLatitude(), coord.getLongitude()));
//                //设置上传用户id
//                loadInfo.setUserID(mUserId);
//                //调用异步上传接口
//                NearbySearch.getInstance(mReactContext)
//                        .uploadNearbyInfoAsyn(loadInfo);
            }

            @Override
            public void onArriveDestination(boolean b) {

            }

            @Override
            public void onStartNavi(int i) {

            }

            @Override
            public void onCalculateRouteSuccess(int[] ints) {

            }

            @Override
            public void onCalculateRouteFailure(int i) {

            }

            @Override
            public void onStopSpeaking() {
                amapTTSController.stopSpeaking();
            }
        });
    }

    @ReactMethod
    public void startLocationUpload() {
        mReactContext.startService(new Intent(mReactContext, LocationInfoUploadService.class));
    }

    @ReactMethod
    public void stopLocationUpload() {
        mReactContext.stopService(new Intent(mReactContext, LocationInfoUploadService.class));
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        amapTTSController.destroy();
        //获取附近实例，并设置要清楚用户的id
//        NearbySearch.getInstance(mReactContext).setUserID(mUserId);
//      //调用异步清除用户接口
//        NearbySearch.getInstance(mReactContext).clearUserInfoAsyn();

    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
