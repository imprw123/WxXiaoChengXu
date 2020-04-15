const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({
  data: {
    currentTab: 0,
    sp:601,
    pageIndex:1,
    pageSize:5,
    festivalFeatured:[]
  },
  onLoad: function (options) {
    this._GetFestivalLst();
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
      this.setData({
        currentTab: e.target.dataset.current
      })
      if(this.data.currentTab == 0){  
        this.setData({
          sp: 601,
          festivalFeatured:[]
        })
        this._GetFestivalLst();
      }else if(this.data.currentTab == 1){
        this.setData({
          sp: 600,
          festivalFeatured: []
        })
        this._GetFestivalLst();
      }else if(this.data.currentTab == 2){
        this.setData({
          sp: 602,
          festivalFeatured: []
        })
        this._GetFestivalLst();
      }
    }
  },
  _GetFestivalLst(){
    request({
      url: port.fuli.GetFestivalLst,
      data: { st: wx.getStorageSync("loginSessionKey"), page_index: this.data.pageIndex, page_size: this.data.pageSize,sp:this.data.sp }
    }).then(res => {
      console.log(res);
      this.setData({
        festivalFeatured: res.data.data
      })
    }).catch(error => {
      console.log(error);
    })
  },
  //生日领取
  _RcvFestivalPkg(e){
    request({
      url: port.fuli.RcvFestivalPkg,
      data: { st: wx.getStorageSync("loginSessionKey"), id: e.currentTarget.dataset['id']}
    }).then(res => {
      console.log(res);
      if (res.data.errCode == 0){
        wx.showToast({
          title: '成功',
          icon: 'none',
          duration: 2000
        });
        this._GetFestivalLst();
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
  },
  //普通领取
  _RcvPkg(e){
    request({
      url: port.fuli.RcvPkg,
      data: { st: wx.getStorageSync("loginSessionKey"), id: e.currentTarget.dataset['id'], pt: e.currentTarget.dataset['ptid'] }
    }).then(res => {
      console.log(res);
      if (res.data.errCode == 0) {
        wx.showToast({
          title: '成功',
          icon: 'none',
          duration: 2000
        });
        this._GetFestivalLst();
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    
    }).catch(error => {
      console.log(error);
    })
    
  }
})
