const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex:1,
    pageSize:100,
    weekFree:'',
    pkgLst:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._GetDotaPkg();
  },
  _GetDotaPkg(){
    request({
      url: port.dota.GetDotaPkg,
      data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.data.pageIndex, page_size: this.data.pageSize}
    }).then(res => {
      console.log(res);
      this.setData({
        weekFree: res.data.data.WeekFree,
        pkgLst: res.data.data.PkgLst
      })
     
    }).catch(error => {
      console.log(error);
    })
  },
  _RcvPkg(e){
    request({
      url: port.dota.RcvPkg,
      data: { st: wx.getStorageSync("loginSessionKey"), id: e.currentTarget.dataset['id'], pt: e.currentTarget.dataset['ptid']}
    }).then(res => {
      console.log(res);
      if (res.data.errCode == 0){
        wx.showToast({
          title: '成功',
          icon: 'none',
          duration: 2000
        })
        this._GetDotaPkg();
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
  
    }).catch(error => {
      console.log(error);
    })
  }
})