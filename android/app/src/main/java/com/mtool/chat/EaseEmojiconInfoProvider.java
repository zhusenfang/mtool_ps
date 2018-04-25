package com.mtool.chat;


import com.mtool.chat.domain.EaseEmojicon;

import java.util.Map;

public interface EaseEmojiconInfoProvider {
        /**
         * return EaseEmojicon for input emojiconIdentityCode
         * @param emojiconIdentityCode
         * @return
         */
        EaseEmojicon getEmojiconInfo(String emojiconIdentityCode);
        
        /**
         * get Emojicon map, key is the text of emoji, value is the resource id or local path of emoji icon(can't be URL on internet)
         * @return
         */
        Map<String, Object> getTextEmojiconMapping();
    }