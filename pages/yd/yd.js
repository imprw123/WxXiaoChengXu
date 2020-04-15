const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yd_expired:0,
    yd_yestoday_get:0,
    yd_yestoday_use:0,
    yd:0,
    today_signed:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._GetMyYd();
  },
  _GetMyYd(){
    request({
      url: port.yd.GetMyYd,
      data: { st: wx.getStorageSync("loginSessionKey") }
    }).then(res => {
      console.log(res);
      this.setData({
        yd_expired:res.data.data.yd_expired,
        yd_yestoday_get: res.data.data.yd_yestoday_get,
        yd_yestoday_use: res.data.data.yd_yestoday_use,
        yd: res.data.data.yd,
        today_signed: res.data.data.today_signed
      })
    }).catch(error => {
      console.log(error);
    })
  },
  _Sign(){
    request({
      url: port.yd.Sign,
      data: { st: wx.getStorageSync("loginSessionKey") }
    }).then(res => {
      console.log(res);
      if (res.data.errCode == 0){
        wx.showToast({
          title: "签到成功",
          icon: 'none',
          duration: 2000
        });
    
      }else{
        wx.showToast({
          title:res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }

      this._GetMyYd();
      
    }).catch(error => {
      console.log(error);
    })
  },
  errorTip() {
    wx.showToast({
      title: "敬请期待!",
      icon: 'none',
      duration: 1500
    });
    return false;
  }
})