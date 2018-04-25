package com.mtool.rnmodule;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.mtool.rnview.RNOrderPrevView;
import com.mtool.util.ToastUtils;

/**
 * Created by sshss on 2017/11/6.
 */

public class OrderPrivModule extends BaseModule implements LifecycleEventListener {
    private ReactApplicationContext mReactContext;

    public OrderPrivModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "OrderPrivModule";
    }

    @ReactMethod
    public void setData(int tag, String json) {
        System.out.println("json: " + json);
        RNOrderPrevView view = (RNOrderPrevView) mReactContext.getCurrentActivity().findViewById(tag);
        if (view != null)
            view.setData(json);
        else
            ToastUtils.showToast("error");
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}
