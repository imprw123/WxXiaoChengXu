const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myYDlists:[],
    txImg: '',
    user_name:'',
    yd_value:0,
    realyYd:0
  },
  onLoad: function (options) {
    this._MyYdHistory();
    this._GetUserInfo();
  },
  _GetUserInfo() {
    request({
      url: port.my.GetUserInfo,
      data: { st: wx.getStorageSync("loginSessionKey") }
    }).then(res => {
      console.log(res);
      this.setData({
        user_name: res.data.data.user_name,
        realyYd: res.data.data.yd_value - res.data.data.yd_free,
        txImg: res.data.data.icon,
        k_value: res.data.data.k_value,
        yd_value: res.data.data.yd_value

      })
    }).catch(error => {
      console.log(error);
    })

  },
  _MyYdHistory(){
    request({
      url: port.myYaoDou.MyYdHistory,
      data: { st: wx.getStorageSync("loginSessionKey")  }
    }).then(response => {
      console.log(response);
      this.setData({
        myYDlists: response.data.data
      })
     
    }).catch(error => {
      console.log(error);
    })
  } 
})