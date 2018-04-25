package com.mtool.rnmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.mtool.util.SPUtil;

/**
 * Created by sshss on 2017/11/6.
 */

public class SPModule extends BaseModule {
    private ReactApplicationContext mReactContext;

    public SPModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SPModule";
    }

    @ReactMethod
    public void setUserId(String userId) {
        SPUtil.putString("u_id", userId);
    }
}
