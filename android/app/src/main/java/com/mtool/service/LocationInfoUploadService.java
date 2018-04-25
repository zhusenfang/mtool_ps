package com.mtool.service;

import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.text.TextUtils;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationClient;
import com.amap.api.location.AMapLocationClientOption;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.services.core.LatLonPoint;
import com.amap.api.services.nearby.NearbySearch;
import com.amap.api.services.nearby.UploadInfo;
import com.mtool.util.SPUtil;

/**
 * Created by sshss on 2017/11/10.
 */

public class LocationInfoUploadService extends Service {

    private NearbySearch mNearbySearch;
    private AMapLocationClient mLocationClient;
    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            mLocationClient.startLocation();
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        NearbySearch.getInstance(getApplicationContext()).setUserID("1234");
        NearbySearch.getInstance(getApplicationContext()).clearUserInfoAsyn();
        System.out.println("clear update");

        mNearbySearch = NearbySearch.getInstance(getApplicationContext());
        mLocationClient = new AMapLocationClient(this.getApplicationContext());
        AMapLocationListener locationContinueListener = new AMapLocationListener() {
            @Override
            public void onLocationChanged(AMapLocation location) {

                if (location.getErrorCode() == 0) {

                    String u_id = SPUtil.getString("u_id", "");
                    if (TextUtils.isEmpty(u_id)) {
                        return;
                    }

//                    if(!"1234".equals(u_id)){
//                        NearbySearch.getInstance(getApplicationContext()).setUserID("1234");
//                        NearbySearch.getInstance(getApplicationContext()).clearUserInfoAsyn();
//                        System.out.println("clear update");
//                    }

                    System.out.println("service  onLocationChanged  " + location.getLatitude() + "  " + location.getLongitude() + "  " + u_id);
                    UploadInfo loadInfo = new UploadInfo();
                    loadInfo.setCoordType(NearbySearch.AMAP);
                    loadInfo.setPoint(new LatLonPoint(location.getLatitude(), location.getLongitude()));
                    loadInfo.setUserID(u_id);
                    mNearbySearch.uploadNearbyInfoAsyn(loadInfo);
                }
                mHandler.sendEmptyMessageDelayed(0, 30000);
            }
        };
        mLocationClient.setLocationListener(locationContinueListener);
//        AMapLocationClientOption option = new AMapLocationClientOption();
//        option.setInterval(30000);
//        mLocationClient.setLocationOption(option);
        AMapLocationClientOption locationClientSingleOption = new AMapLocationClientOption();
        locationClientSingleOption.setOnceLocation(true);
        locationClientSingleOption.setLocationCacheEnable(false);
        mLocationClient.setLocationOption(locationClientSingleOption);
        mHandler.sendEmptyMessage(0);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        //调用销毁功能，在应用的合适生命周期需要销毁附近功能
        NearbySearch.destroy();
        mHandler.removeMessages(0);
        mNearbySearch.destroy();
        mLocationClient.stopLocation();
        mLocationClient.onDestroy();
    }
}
