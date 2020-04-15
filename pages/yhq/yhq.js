const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({
  data: {
    currentTab: 0,
    pt: 1,
    pageIndex: 1,
    pageSize: 5,
    recentLQ:[]
  },
  onLoad: function (options) {
    this._MyLtLog();
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  clickTab: function (e) {
    console.log(this.data.currentTab === e.target.dataset.current);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
  
      switch (e.target.dataset.current) {
        case "0":
          this.setData({
            pt:1,
            currentTab: e.target.dataset.current
          });
          this._MyLtLog();
          break;
        case "1":
          this.setData({
            pt:2,
            currentTab: e.target.dataset.current
          });
          this._MyLtLog();
          break;
        case "2":

          this.setData({
            pt:3,
            currentTab: e.target.dataset.current
          });
          this._MyLtLog();
          break;
      }
   
    }
  },
  _MyLtLog(){
    request({
      url: port.my.MyLtLog,
      data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.data.pageIndex, page_size: this.data.pageSize, pt: this.data.pt }
    }).then(res => {
      console.log(res);
      this.setData({
        recentLQ:res.data.data
      })
      
    }).catch(error => {
      console.log(error);
    })
  }
})
