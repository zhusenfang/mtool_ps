package com.mtool;

import android.annotation.TargetApi;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.text.TextUtils;

import com.facebook.react.ReactActivity;
import com.hyphenate.EMMessageListener;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMMessage;
import com.hyphenate.util.EMLog;
import com.mtool.chat.ChatHelper;
import com.mtool.chat.EaseConstantSub;
import com.mtool.chat.runtimepermissions.PermissionsManager;
import com.mtool.chat.runtimepermissions.PermissionsResultAction;
import com.mtool.chat.util.Messenger;
import com.mtool.config.Const;
import com.mtool.util.BottomNotifier;

import java.util.List;

public class MainActivity extends ReactActivity {

    private boolean isExceptionDialogShow;
    private AlertDialog.Builder exceptionBuilder;
    private boolean isConflict;
    private EMMessageListener mMessageListener;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MTool";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleNotifyAction();

        initChat();

        mMessageListener = new EMMessageListener() {
            @Override
            public void onMessageReceived(List<EMMessage> list) {
                BottomNotifier.getInstance().nofify();
                for (EMMessage msg : list) {
                    String expressageOrderId = msg.getStringAttribute("expressageOrderId", "");
                    if(!TextUtils.isEmpty(expressageOrderId)){
                        Messenger.getInstance(Messenger.ON_NEW_ORDER).send();
                        break;
                    }
                }
            }

            @Override
            public void onCmdMessageReceived(List<EMMessage> list) {

            }

            @Override
            public void onMessageRead(List<EMMessage> list) {

            }

            @Override
            public void onMessageDelivered(List<EMMessage> list) {

            }

            @Override
            public void onMessageRecalled(List<EMMessage> list) {

            }

            @Override
            public void onMessageChanged(EMMessage emMessage, Object o) {

            }
        };
        BottomNotifier.getInstance().init(this);
        EMClient.getInstance().chatManager().addMessageListener(mMessageListener);
    }

    private void initChat() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String packageName = getPackageName();
            PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                try {
                    //some device doesn't has activity to handle this intent
                    //so del try catch
                    Intent intent = new Intent();
                    intent.setAction(android.provider.Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                    intent.setData(Uri.parse("package:" + packageName));
                    startActivity(intent);
                } catch (Exception e) {

                }
            }
        }
        requestPermissions();

        showExceptionDialogFromIntent(getIntent());

    }

    private void showExceptionDialogFromIntent(Intent intent) {
        if (!isExceptionDialogShow && intent.getBooleanExtra(EaseConstantSub.ACCOUNT_CONFLICT, false)) {
            showExceptionDialog(EaseConstantSub.ACCOUNT_CONFLICT);
        } else if (!isExceptionDialogShow && intent.getBooleanExtra(EaseConstantSub.ACCOUNT_REMOVED, false)) {
            showExceptionDialog(EaseConstantSub.ACCOUNT_REMOVED);
        } else if (!isExceptionDialogShow && intent.getBooleanExtra(EaseConstantSub.ACCOUNT_FORBIDDEN, false)) {
            showExceptionDialog(EaseConstantSub.ACCOUNT_FORBIDDEN);
        } else if (intent.getBooleanExtra(EaseConstantSub.ACCOUNT_KICKED_BY_CHANGE_PASSWORD, false) ||
                intent.getBooleanExtra(EaseConstantSub.ACCOUNT_KICKED_BY_OTHER_DEVICE, false)) {
            Messenger.getInstance(Messenger.TO_LOGIN).send();
        }
    }

    private void showExceptionDialog(String exceptionType) {
        isExceptionDialogShow = true;
        ChatHelper.getInstance().logout(false, null);
        String st = getResources().getString(R.string.Logoff_notification);
        if (!isFinishing()) {
            // clear up global variables
            try {
                if (exceptionBuilder == null)
                    exceptionBuilder = new android.app.AlertDialog.Builder(this);
                exceptionBuilder.setTitle(st);
                exceptionBuilder.setMessage(getExceptionMessageId(exceptionType));
                exceptionBuilder.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        exceptionBuilder = null;
                        isExceptionDialogShow = false;
                        Messenger.getInstance(Messenger.TO_LOGIN).send();
                    }
                });
                exceptionBuilder.setCancelable(false);
                exceptionBuilder.create().show();
                isConflict = true;
            } catch (Exception e) {
                EMLog.e(getClass().getSimpleName(), "---------color conflictBuilder error" + e.getMessage());
            }
        }
    }

    private int getExceptionMessageId(String exceptionType) {
        if (exceptionType.equals(EaseConstantSub.ACCOUNT_CONFLICT)) {
            return R.string.connect_conflict;
        } else if (exceptionType.equals(EaseConstantSub.ACCOUNT_REMOVED)) {
            return R.string.em_user_remove;
        } else if (exceptionType.equals(EaseConstantSub.ACCOUNT_FORBIDDEN)) {
            return R.string.user_forbidden;
        }
        return R.string.Network_error;
    }

    @TargetApi(23)
    private void requestPermissions() {
        PermissionsManager.getInstance().requestAllManifestPermissionsIfNecessary(this, new PermissionsResultAction() {
            @Override
            public void onGranted() {
//				Toast.makeText(MainActivity.this, "All permissions have been granted", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onDenied(String permission) {
                //Toast.makeText(MainActivity.this, "Permission " + permission + " has been denied", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        showExceptionDialogFromIntent(intent);
        setIntent(intent);
        handleNotifyAction();
    }

    private void handleNotifyAction() {

        int chatType = getIntent().getIntExtra("chatType", -1);

        if (chatType == EaseConstantSub.CHATTYPE_SINGLE) {
            String order_id = getIntent().getStringExtra("orderId");
            if (order_id != null) {
                System.out.println("MainActivity orderId  "+order_id);
                Messenger.getInstance(Messenger.TO_ORDER_DETAIL).putString("orderId", order_id).send();
            } else {
                Messenger.getInstance(Messenger.TO_CHATVIEW)
                        .putString(Const.HX_ID, getIntent().getStringExtra("userId"))
                        .putInt(EaseConstantSub.EXTRA_CHAT_TYPE, EaseConstantSub.CHATTYPE_SINGLE).send();
            }
        } else if (chatType == EaseConstantSub.CHATTYPE_GROUP) {
            String order_id = getIntent().getStringExtra("orderId");
            if (order_id != null) {
                Messenger.getInstance(Messenger.TO_ORDER_DETAIL).putString("orderId", order_id).send();
            }
        }
    }
}
