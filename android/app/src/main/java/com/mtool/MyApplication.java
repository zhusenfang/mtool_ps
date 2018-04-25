package com.mtool;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.mtool.chat.ChatHelper;
import com.mtool.chat.ChatPackage;
import com.mtool.rnpackage.MapPackage;

import java.util.Arrays;
import java.util.List;

public class MyApplication extends Application implements ReactApplication {

    public static ReactApplicationContext reactiContext;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
                    , new MapPackage()
                    , new ChatPackage()
            );
        }
    };
    private static MyApplication sContext;

    public static Context getContext() {
        return sContext;
    }

    public static MyApplication getInstance() {
        return sContext;
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        sContext = this;
        MultiDex.install(this);
        MultiDex.install(this);
        //=============聊天===========
        ChatHelper.getInstance().init(this);
        //============================
    }
}
