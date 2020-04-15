const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  data: {
    pageIndex:1,
    pageSize:5,
    todayLsts:[],
    todayRecommand:'',
    weekLsts:[],
    weekRecomannd:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._GetRpgPkg();
  },
  _GetRpgPkg(){
    request({
      url: port.rpg.GetRpgPkg,
      data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.pageIndex,page_size:this.pageSize}
    }).then(res=>{
      console.log(res);
      if(res.data.errCode == 0){
        this.setData({
          todayLsts: res.data.data.TodayLst,
          todayRecommand: res.data.data.TodayRecommand,
          weekLsts: res.data.data.WeekLst,
          weekRecomannd: res.data.data.WeekRecomannd

        })
      }

    }).catch(error=>{
      console.log(error);
    })
  }
})