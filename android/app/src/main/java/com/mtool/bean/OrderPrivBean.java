package com.mtool.bean;


import java.util.List;

/**
 * Created by sshss on 2017/11/16.
 */

public class OrderPrivBean extends BaseBean {


    public DataBean data;

    public static class DataBean {
        public List<PoiInfoBean> shopWait;
        public List<PoiInfoBean> userWait;
        public List<PoiInfoBean> userIng;
        public List<PoiInfoBean> userExcp;
    }

    public static class PoiInfoBean {

        public String orderAlpha;
        public String geo;
        public int number;
    }
}
