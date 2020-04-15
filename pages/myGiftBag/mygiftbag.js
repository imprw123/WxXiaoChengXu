const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({
  data: {
    currentTab: 0,
    pt: 2,
    pageIndex: 1,
    pageSize: 9999,
    giftslist: []
  },
  onLoad: function (options) {
    this._MyPkgLog();
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
            pt: 2,
            currentTab: e.target.dataset.current,
            giftslist: []
          });
          this._MyPkgLog();
          break;
        case "1":
          this.setData({
            pt: 1,
            currentTab: e.target.dataset.current,
            giftslist: []
          });
          this._MyPkgLog();
          break;
  
      }

    }
  },
  _MyPkgLog() {
    request({
      url: port.my.MyPkgLog,
      data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.data.pageIndex, page_size: this.data.pageSize, pt: this.data.pt }
    }).then(res => {
      console.log(res);
      this.setData({
        giftslist: res.data.data
      })

    }).catch(error => {
      console.log(error);
    })
  },
  COPE: function (e) {
    this._copyToClipboard(e.currentTarget.dataset.cdk);
  },
  _copyToClipboard: function (val) {
    wx.setClipboardData({
      data: val,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })

  }
})
