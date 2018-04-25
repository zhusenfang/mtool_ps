package com.mtool.rnmodule;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.mtool.MyApplication;

/**
 * Created by sshss on 2017/11/9.
 */

public abstract class BaseModule extends ReactContextBaseJavaModule {

    public BaseModule(ReactApplicationContext reactContext) {
        super(reactContext);
        MyApplication.getInstance().reactiContext = reactContext;
    }
}
