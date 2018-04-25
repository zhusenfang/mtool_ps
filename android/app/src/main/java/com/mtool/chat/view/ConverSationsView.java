package com.mtool.chat.view;

import android.content.Context;
import android.os.Handler;
import android.support.annotation.AttrRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Pair;
import android.view.View;
import android.widget.AdapterView;
import android.widget.FrameLayout;
import android.widget.ListView;

import com.facebook.react.uimanager.ThemedReactContext;
import com.hyphenate.EMConnectionListener;
import com.hyphenate.EMConversationListener;
import com.hyphenate.EMError;
import com.hyphenate.EMMessageListener;
import com.hyphenate.chat.EMClient;
import com.hyphenate.chat.EMConversation;
import com.hyphenate.chat.EMMessage;
import com.mtool.R;
import com.mtool.chat.ChatHelper;
import com.mtool.chat.EaseConstantSub;
import com.mtool.chat.adapter.ConversationAdapter;
import com.mtool.chat.util.Messenger;
import com.mtool.config.Const;
import com.mtool.util.ToastUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * Created by sshss on 2017/12/20.
 */

public class ConverSationsView extends FrameLayout {
    private final static int MSG_REFRESH = 2;
    private ListView mListView;
    private ThemedReactContext mContext;
    private List<EMConversation> conversationList = new ArrayList<>();
    private ConversationAdapter mAdapter;

    private EMMessageListener messageListener = new EMMessageListener() {

        @Override
        public void onMessageReceived(List<EMMessage> messages) {
            System.out.println("ConverSationsView:  onMessageReceived");
            for (EMMessage message : messages) {
                ChatHelper.getInstance().getNotifier().onNewMsg(message);
            }
            refresh();
        }

        @Override
        public void onCmdMessageReceived(List<EMMessage> messages) {
            refresh();
        }

        @Override
        public void onMessageRead(List<EMMessage> messages) {

        }

        @Override
        public void onMessageDelivered(List<EMMessage> message) {
        }

        @Override
        public void onMessageRecalled(List<EMMessage> messages) {
            refresh();
        }

        @Override
        public void onMessageChanged(EMMessage message, Object change) {
        }
    };
    protected EMConversationListener convListener = new EMConversationListener() {

        @Override
        public void onCoversationUpdate() {
            refresh();
        }
    };
    protected EMConnectionListener connectionListener = new EMConnectionListener() {

        @Override
        public void onDisconnected(int error) {
            if (error == EMError.USER_REMOVED || error == EMError.USER_LOGIN_ANOTHER_DEVICE || error == EMError.SERVER_SERVICE_RESTRICTED
                    || error == EMError.USER_KICKED_BY_CHANGE_PASSWORD || error == EMError.USER_KICKED_BY_OTHER_DEVICE) {
//                isConflict = true;
                ToastUtils.showToast("error" + error);
            } else {
                handler.sendEmptyMessage(0);
            }
        }

        @Override
        public void onConnected() {
            handler.sendEmptyMessage(1);
        }
    };

    protected Handler handler = new Handler() {
        public void handleMessage(android.os.Message msg) {
            switch (msg.what) {
                case 0:
//                    onConnectionDisconnected();
                    break;
                case 1:
//                    onConnectionConnected();
                    break;
                case MSG_REFRESH: {

                    if (mListView != null) {
                        updateAdapter();
                    }
                    break;
                }
                default:
                    break;
            }
        }
    };
    private View mMainView;
    public static ConverSationsView sInstance;

    public ConverSationsView(@NonNull ThemedReactContext context) {
        super(context);
        mContext = context;
        sInstance = this;
    }

    public ConverSationsView(@NonNull Context context) {
        this(context, null);
    }

    public ConverSationsView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ConverSationsView(@NonNull Context context, @Nullable AttributeSet attrs, @AttrRes int defStyleAttr) {
        super(context, attrs, defStyleAttr);

    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(new Runnable() {
            @Override
            public void run() {
                measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                        MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
                layout(getLeft(), getTop(), getRight(), getBottom());
            }
        });
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        mMainView = View.inflate(mContext, R.layout.rn_view_conversations, null);
        mListView = (ListView) mMainView.findViewById(R.id.lv_list);
        mListView.setFocusable(true);
        mListView.setFocusableInTouchMode(true);

        addView(mMainView);
        EMClient.getInstance().addConnectionListener(connectionListener);
        EMClient.getInstance().chatManager().addConversationListener(convListener);
        EMClient.getInstance().chatManager().addMessageListener(messageListener);
        conversationList.addAll(loadConversationList());
        updateAdapter();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        EMClient.getInstance().removeConnectionListener(connectionListener);
        EMClient.getInstance().chatManager().removeConversationListener(convListener);
        EMClient.getInstance().chatManager().removeMessageListener(messageListener);
    }

    private void updateAdapter() {
        if (mAdapter == null) {
            mAdapter = new ConversationAdapter(conversationList);
            mListView.setAdapter(mAdapter);
            mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    EMConversation item = mAdapter.getItem(position);
                    int converType = EaseConstantSub.CHATTYPE_SINGLE;
                    if (item.getType() == EMConversation.EMConversationType.GroupChat)
                        converType = EaseConstantSub.CHATTYPE_GROUP;
                    Messenger.getInstance(Messenger.TO_CHATVIEW)
                            .putString(Const.HX_ID, item.conversationId())
                            .putInt(EaseConstantSub.EXTRA_CHAT_TYPE, converType)
                            .send();

                }
            });

        } else {
            conversationList.clear();
            conversationList.addAll(loadConversationList());
            mAdapter.notifyDataSetChanged();
            postInvalidate();
            mListView.postInvalidate();
            Messenger.getInstance(Messenger.REFRESH).send();
        }
    }

    public void refresh() {
        if (!handler.hasMessages(MSG_REFRESH)) {
            handler.sendEmptyMessage(MSG_REFRESH);
        }
    }

    protected List<EMConversation> loadConversationList() {
        Map<String, EMConversation> conversations = EMClient.getInstance().chatManager().getAllConversations();
        List<Pair<Long, EMConversation>> sortList = new ArrayList<Pair<Long, EMConversation>>();
        synchronized (conversations) {
            for (EMConversation conversation : conversations.values()) {
                if (conversation.getAllMessages().size() == 0 || conversation.getType() == EMConversation.EMConversationType.GroupChat)
                    continue;
                long msgTime = conversation.getLastMessage() != null ? conversation.getLastMessage().getMsgTime() : System.currentTimeMillis();
                sortList.add(new Pair<Long, EMConversation>(msgTime, conversation));
            }
        }
        try {
            sortConversationByLastChatTime(sortList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<EMConversation> list = new ArrayList<EMConversation>();
        for (Pair<Long, EMConversation> sortItem : sortList) {
            list.add(sortItem.second);
        }
        return list;
    }

    private void sortConversationByLastChatTime(List<Pair<Long, EMConversation>> conversationList) {
        Collections.sort(conversationList, new Comparator<Pair<Long, EMConversation>>() {
            @Override
            public int compare(final Pair<Long, EMConversation> con1, final Pair<Long, EMConversation> con2) {

                if (con1.first.equals(con2.first)) {
                    return 0;
                } else if (con2.first.longValue() > con1.first.longValue()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }
}
