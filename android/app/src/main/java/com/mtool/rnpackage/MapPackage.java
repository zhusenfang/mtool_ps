package com.mtool.rnpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.mtool.rnmanager.OrderPrivManager;
import com.mtool.rnmodule.MapModual;
import com.mtool.rnmodule.OrderPrivModule;
import com.mtool.rnmodule.SPModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by sshss on 2017/11/6.
 */

public class MapPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new MapModual(reactContext));
        modules.add(new OrderPrivModule(reactContext));
        modules.add(new SPModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(new OrderPrivManager());
    }
}
