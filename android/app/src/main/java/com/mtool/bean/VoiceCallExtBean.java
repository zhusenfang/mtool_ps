package com.mtool.bean;


import com.mtool.util.SPUtil;

import com.mtool.config.Const;

/**
 * Created by sshss on 2017/12/27.
 */

public class VoiceCallExtBean {
    public String groupId;
    public String userpicurlhx;
    public String usernicknamehx;

    public VoiceCallExtBean() {
        userpicurlhx = SPUtil.getString(Const.USER_HEADER, "");
        usernicknamehx = SPUtil.getString(Const.USER_NICK, "");
    }
}
