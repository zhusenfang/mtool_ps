package com.mtool.chat.module;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hyphenate.EMCallBack;
import com.hyphenate.chat.EMClient;
import com.mtool.chat.EaseConstant;
import com.mtool.chat.EaseConstantSub;
import com.mtool.chat.util.Messenger;
import com.mtool.chat.view.ChatView;
import com.mtool.chat.view.ConverSationsView;
import com.mtool.config.Const;
import com.mtool.rnmodule.BaseModule;
import com.mtool.util.BottomNotifier;
import com.mtool.util.SPUtil;

import java.io.File;

/**
 * Created by sshss on 2017/12/21.
 */

public class ChatModule extends BaseModule {
    private ChatActionReceiver mReceiver;
    private ReactApplicationContext mContext;
    private ChatView chatView;

    public ChatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mReceiver = new ChatActionReceiver();
        IntentFilter filter = new IntentFilter();
        filter.addAction("action.chatmodule");
        filter.setPriority(Integer.MAX_VALUE);
        // filter.addDataScheme("package");
        mContext.registerReceiver(mReceiver, filter);
        mContext.addActivityEventListener(new ActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (chatView != null) {
                    chatView.onActivityResult(activity, requestCode, resultCode, data);
                }
            }

            @Override
            public void onNewIntent(Intent intent) {

            }
        });
    }

    @Override
    public String getName() {
        return "ChatModule";
    }

    @ReactMethod
    public void login(final String hxUserName, String hxPwd, final String nickName, final String head) {
        System.out.println("hx login:" + hxUserName + hxPwd + nickName + head);
        SPUtil.putString(Const.HX_ID, hxUserName);
        SPUtil.putString(Const.HX_PWD, hxPwd);
        SPUtil.putString(Const.USER_NICK, nickName);
        SPUtil.putString(Const.USER_HEADER, head);
        EMClient.getInstance().logout(true);
        EMClient.getInstance().login(hxUserName, hxPwd, new EMCallBack() {

            @Override
            public void onSuccess() {
                System.out.println("环信登录成功");
                EMClient.getInstance().getOptions().setAutoAcceptGroupInvitation(true);
                EMClient.getInstance().groupManager().loadAllGroups();
                EMClient.getInstance().chatManager().loadAllConversations();

                boolean updatenick = EMClient.getInstance().pushManager().updatePushNickname(nickName);
                if (!updatenick) {
                    Log.e("ChatModule", "update current user nick fail");
                }
            }

            @Override
            public void onProgress(int progress, String status) {

            }

            @Override
            public void onError(final int code, final String message) {
                System.out.println("环信登录失败：" + code + "  " + message);
            }
        });
    }

    @ReactMethod
    public void initChatView(final int tag, final String hxId, final int chatType) {
        System.out.println("initChatView：" + tag + "   " + hxId + "   " + chatType);
        final Activity currentActivity = mContext.getCurrentActivity();
        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                chatView = (ChatView) currentActivity.findViewById(tag);
                chatView.initViews(chatType, hxId);
                chatView.setUpView();
                //刷新会话列表，清除未读消息标签
                if (ConverSationsView.sInstance != null) {
                    ConverSationsView.sInstance.refresh();
                }
            }
        });
    }


    @ReactMethod
    public void setQuickReply(int tag, final String dataJson) {

        if (chatView != null) {
            mContext.getCurrentActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    chatView.setQuickReplyData(dataJson);
                }
            });
        }
    }

    @ReactMethod
    public boolean isConnected() {
        return EMClient.getInstance().isConnected();
    }

    @ReactMethod
    public void onNewOrder() {
        BottomNotifier.getInstance().nofify("有新订单");
    }

    private class ChatActionReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            WritableMap event = Arguments.createMap();
            String action = intent.getStringExtra("action");
            if (action != null && mContext != null) {
                if (action.equals(Messenger.TO_USER_DETAIL) || action.equals(Messenger.TO_CHATVIEW)) {
                    String userId = intent.getStringExtra(Const.HX_ID);
                    event.putString(Const.HX_ID, userId);
                    event.putInt(EaseConstantSub.EXTRA_CHAT_TYPE, intent.getIntExtra(EaseConstantSub.EXTRA_CHAT_TYPE, EaseConstant.CHATTYPE_SINGLE));
                }
                if(action.equals(Messenger.TO_ORDER_DETAIL)){
                    event.putString("orderId",intent.getStringExtra("orderId"));
                }
                event.putString("action", action);
                mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("event", event);
            }
        }
    }
}
