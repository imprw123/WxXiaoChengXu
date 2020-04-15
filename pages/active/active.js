const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeLists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._HotActive();
  },
  _HotActive(){
    request({
      url: port.active.HotActive,
      data: { st: wx.getStorageSync("loginSessionKey")}
    }).then(res => {
      console.log(res);
      this.setData({
        activeLists: res.data.data
      })

    }).catch(error => {
      console.log(error);
    })
  }
})