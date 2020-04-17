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
  },
  onShareAppMessage: function () {
    return {
      title: '热门活动', //转发的标题。当前小程序名称
      path: 'pages/active/active', //转发的路径
      imageUrl: 'https://img.5211game.com/Base/bg/kinglg.jpg',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})