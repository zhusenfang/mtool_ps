package com.mtool.rnview;

import android.content.Context;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.amap.api.location.AMapLocation;
import com.amap.api.location.AMapLocationListener;
import com.amap.api.maps.AMap;
import com.amap.api.maps.CameraUpdateFactory;
import com.amap.api.maps.TextureMapView;
import com.amap.api.maps.model.BitmapDescriptorFactory;
import com.amap.api.maps.model.LatLng;
import com.amap.api.maps.model.LatLngBounds;
import com.amap.api.maps.model.Marker;
import com.amap.api.maps.model.MarkerOptions;
import com.amap.api.maps.model.Poi;
import com.amap.api.navi.AmapNaviPage;
import com.amap.api.navi.AmapNaviParams;
import com.amap.api.navi.AmapNaviType;
import com.amap.api.navi.AmapPageType;
import com.amap.api.navi.INaviInfoCallback;
import com.amap.api.navi.model.AMapNaviLocation;
import com.facebook.react.uimanager.ThemedReactContext;
import com.mtool.R;
import com.mtool.bean.OrderPrivBean;
import com.mtool.util.Json_U;
import com.mtool.util.LocateUtil;
import com.mtool.util.ToastUtils;
import com.mtool.util.navi.AmapTTSController;

import java.util.List;

/**
 * Created by sshss on 2017/11/16.
 */

public class RNOrderPrevView extends FrameLayout implements AMap.OnMapLoadedListener {

    private AmapTTSController amapTTSController;
    private ThemedReactContext mContext;
    private View mMainView;
    private TextureMapView mMapView;
    private AMap mMap;
    private AMapLocation mMyLocation;
    private INaviInfoCallback mINaviInfoCallback = new INaviInfoCallback() {

        @Override
        public void onInitNaviFailure() {

        }

        @Override
        public void onGetNavigationText(String s) {
            amapTTSController.onGetNavigationText(s);
        }

        @Override
        public void onLocationChange(AMapNaviLocation aMapNaviLocation) {
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
    };

    public RNOrderPrevView(@NonNull Context context) {
        super(context);
    }

    public RNOrderPrevView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RNOrderPrevView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public RNOrderPrevView(ThemedReactContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mMainView = View.inflate(reactContext, R.layout.layout_order_priv, null);
        addView(mMainView);
        mMapView = (TextureMapView) mMainView.findViewById(R.id.mapView);
        mMapView.onCreate(mContext.getCurrentActivity().getIntent().getExtras());
        mMap = mMapView.getMap();
        mMap.getUiSettings().setZoomControlsEnabled(false);
        mMap.getUiSettings().setRotateGesturesEnabled(false);
        mMap.getUiSettings().setTiltGesturesEnabled(false);
        mMap.setOnMapLoadedListener(this);
        mMapView.onResume();

        amapTTSController = AmapTTSController.getInstance(reactContext);
        amapTTSController.init();
    }


    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        mMapView.onDestroy();
    }

    @Override
    public void onMapLoaded() {

    }

    public void setData(final String json) {
        System.out.println("setData:" + json);
        LocateUtil.getInstance(new AMapLocationListener() {
            @Override
            public void onLocationChanged(AMapLocation aMapLocation) {
                if (aMapLocation.getErrorCode() == 0) {
                    LatLng latLng = new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude());
                    mMap.addMarker(new MarkerOptions().position(latLng)
                            .icon((BitmapDescriptorFactory.fromView(View.inflate(mContext, R.layout.item_my_loacteion, null)))));
                    mMyLocation = aMapLocation;

                } else {
                    ToastUtils.showToast("获取当前位置失败");
                }

                if (!TextUtils.isEmpty(json)) {
                    OrderPrivBean orderPrivBean = Json_U.fromJson(json, OrderPrivBean.class);
                    OrderPrivBean.DataBean data = orderPrivBean.data;

                    if (data != null) {
                        showMarker(data.shopWait, 0);
                        showMarker(data.userExcp, 1);
                        showMarker(data.userIng, 2);
                        showMarker(data.userWait, 3);
                    }
                }
            }
        }).locate();
    }

    private void showMarker(List<OrderPrivBean.PoiInfoBean> poiList, int type) {
        if (poiList == null || poiList.size() == 0)
            return;

        LatLngBounds.Builder b = LatLngBounds.builder();
        if (mMyLocation != null)
            b.include(new LatLng(mMyLocation.getLatitude(), mMyLocation.getLongitude()));
        for (int i = 0; i < poiList.size(); i++) {
            OrderPrivBean.PoiInfoBean poiInfoBean = poiList.get(i);
            if (!TextUtils.isEmpty(poiInfoBean.geo)) {
                String[] split = poiInfoBean.geo.split(",");

//                LatLng latLng = new LatLng(Double.parseDouble(split[1]), Double.parseDouble(split[0]));
                LatLng latLng = new LatLng(Double.parseDouble(split[1]) + Math.random() / 10, Double.parseDouble(split[0]) + Math.random() / 10);
                b.include(latLng);
                mMap.addMarker(new MarkerOptions()
                        .position(latLng)
                        .infoWindowEnable(false)
                        .icon(BitmapDescriptorFactory.fromView(getPoiView(poiInfoBean, type)))
                );
            }
        }
        LatLngBounds build = b.build();
        mMap.moveCamera(CameraUpdateFactory.newLatLngBounds(build, 30));
        mMap.setOnMarkerClickListener(new AMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(final Marker marker) {
                if (mMyLocation == null) {
                    LocateUtil.getInstance(new AMapLocationListener() {
                        @Override
                        public void onLocationChanged(AMapLocation aMapLocation) {
                            if (aMapLocation.getErrorCode() == 0) {
                                LatLng latLng = new LatLng(aMapLocation.getLatitude(), aMapLocation.getLongitude());
                                mMap.addMarker(new MarkerOptions().position(latLng)
                                        .icon((BitmapDescriptorFactory.fromView(View.inflate(mContext, R.layout.item_my_loacteion, null)))));
                                mMyLocation = aMapLocation;
                                toNavigate(marker);
                            } else {
                                ToastUtils.showToast("获取当前位置失败,请重试");
                            }
                        }
                    }).locate();
                    return false;
                }
                toNavigate(marker);
                return false;
            }
        });
    }

    private void toNavigate(Marker marker) {
        Poi end = new Poi("test终点", new LatLng(marker.getPosition().latitude, marker.getPosition().longitude), "");
        Poi start = new Poi("test起点", new LatLng(mMyLocation.getLatitude(), mMyLocation.getLongitude()), "");
        AmapNaviParams amapNaviParams = new AmapNaviParams(start, null, end, AmapNaviType.DRIVER, AmapPageType.NAVI);
        AmapNaviPage.getInstance().showRouteActivity(mContext, amapNaviParams, mINaviInfoCallback);
    }

    private View getPoiView(OrderPrivBean.PoiInfoBean poiInfoBean, int type) {
        View view = View.inflate(mContext, R.layout.item_order_poi, null);
        View top = view.findViewById(R.id.top);
        View bottom = view.findViewById(R.id.bottom);
        switch (type) {
            case 0:
                view = View.inflate(mContext, R.layout.item_order_poi_shop, null);
                if (poiInfoBean.number > 1) {
                    ((TextView) view.findViewById(R.id.name)).setText("x" + poiInfoBean.number);
                } else {
                    ((TextView) view.findViewById(R.id.name)).setText(poiInfoBean.orderAlpha);
                }
                break;
            case 1:
                view = View.inflate(mContext, R.layout.item_order_poi_error, null);
                if (poiInfoBean.number > 1) {
                    ((TextView) view.findViewById(R.id.name)).setText("x" + poiInfoBean.number);
                }
                break;
            case 2:
                top.setBackgroundResource(R.mipmap.ic_2);
                bottom.setBackgroundResource(R.mipmap.ic_3);

                if (poiInfoBean.number > 1) {
                    ((TextView) view.findViewById(R.id.name)).setText("x" + poiInfoBean.number);
                } else {
                    ((TextView) view.findViewById(R.id.name)).setText(poiInfoBean.orderAlpha);
                }
                break;
            case 3:
                top.setBackgroundResource(R.mipmap.ic_0);
                bottom.setBackgroundResource(R.mipmap.ic_1);
                if (poiInfoBean.number > 1) {
                    ((TextView) view.findViewById(R.id.name)).setText("x" + poiInfoBean.number);
                } else {
                    ((TextView) view.findViewById(R.id.name)).setText(poiInfoBean.orderAlpha);
                }
                break;

        }
        return view;
    }
}
