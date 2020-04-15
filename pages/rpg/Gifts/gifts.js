const app = getApp();
import request from '../../../service/network.js';
import port from '../../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize:10,
    giftslists: [],
    pageTotal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._GetGamePkg();
  },
  onReachBottom: function() {
    if (this.data.pageIndex > this.data.pageTotal) {
      wx.showToast({
        title: "没有更多数据了",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.data.pageIndex++;
      request({
        url: port.gifts.GetGamePkg,
        data: {
          page_index: this.data.pageIndex,
          page_size: this.data.pageSize,
          st: wx.getStorageSync("loginSessionKey")
        }
      }).then(res => {
        console.log(res);
        this.setData({
          giftslists: this.data.giftslists.concat(res.data.data)

        })

      }).catch(error => {
        console.log(error);
      })


    }

  },
  _GetGamePkg() {
    request({
      url: port.gifts.GetGamePkg,
      data: {
        page_index: this.data.pageIndex,
        page_size: this.data.pageSize,
        st: wx.getStorageSync("loginSessionKey")
      }
    }).then(res => {
      console.log(res);
      this.setData({
        giftslists: res.data.data,
        pageTotal: Math.floor(res.data.total / this.data.pageSize)
      })

    }).catch(error => {
      console.log(error);
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading(); //在标题栏中显示加载图标
    this.data.pageIndex=1;
    request({
      url: port.gifts.GetGamePkg,
      data: {
        page_index: this.data.pageIndex,
        page_size: this.data.pageSize,
        st: wx.getStorageSync("loginSessionKey")
      }
    }).then(res => {
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
      console.log(res);
      this.setData({
        giftslists: res.data.data

      })

    }).catch(error => {
      wx.hideNavigationBarLoading(); //完成停止加载图标
      wx.stopPullDownRefresh();
      console.log(error);
    })
  }

})