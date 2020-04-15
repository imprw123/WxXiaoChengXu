const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kklists: [],
    pageIndex:1,
    pageSize:20,
    pageTotal:0
  },
  onLoad: function (options) {
    this._MyKingHistory();
  },
  onReachBottom: function () {
    if (this.data.pageIndex > this.data.pageTotal) {
      wx.showToast({
        title: "没有更多数据了",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.data.pageIndex++;
      request({
        url: port.mykk.MyKingHistory,
        data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.data.pageIndex, page_size: this.data.pageSize }
      }).then(res => {
        console.log(res);
        this.setData({
          kklists: this.data.kklists.concat(res.data.data)

        })

      }).catch(error => {
        console.log(error);
      })
    }

  },
  _MyKingHistory() {
    request({
      url: port.mykk.MyKingHistory,
      data: { st: wx.getStorageSync("loginSessionKey"),page_index: this.data.pageIndex,page_size: this.data.pageSize}
    }).then(response => {
      console.log(response);
      this.setData({
        kklists: response.data.data,
        pageTotal: Math.floor(response.data.total / this.data.pageSize)

      })
    }).catch(error => {
      console.log(error);
    })
  }
})