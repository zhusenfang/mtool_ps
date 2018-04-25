package com.mtool.rnmanager;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.mtool.rnview.RNOrderPrevView;

/**
 * Created by sshss on 2017/11/16.
 */

public class OrderPrivManager extends SimpleViewManager<RNOrderPrevView> {
    @Override
    public String getName() {
        return "RNOrderPrevView";
    }

    @Override
    protected RNOrderPrevView createViewInstance(ThemedReactContext reactContext) {
        return new RNOrderPrevView(reactContext);
    }
}
