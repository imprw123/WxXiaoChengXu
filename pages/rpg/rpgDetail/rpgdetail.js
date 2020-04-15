const app = getApp();
import request from '../../../service/network.js';
import port from '../../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pt:'',
    id:'',
    b_img:'',
    show_name:'',
    show_desc:'',
    constraint:'',
    yd:'',
    rcv_flg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      pt:options.pt,
      id:options.id
    })
    this._PkgDetail();
  },
  _PkgDetail(){
    request({
      url: port.gifts.PkgDetail,
      data: { pt: this.data.pt, id: this.data.id, st: wx.getStorageSync("loginSessionKey") }
    }).then(response => {
      console.log(response);
      if (response.data.errCode == 0){
        this.setData({
          b_img: response.data.data.b_img,
          show_name: response.data.data.show_name,
          show_desc: response.data.data.show_desc,
          constraint: response.data.data.constraint,
          yd: response.data.data.yd,
          rcv_flg: response.data.data.rcv_flg
        })
      }

    }).catch(error => {
      console.log(error);
    })
  },
  _RcvPkg(){
    request({
      url: port.gifts.RcvPkg,
      data: { pt: this.data.pt, id: this.data.id, st: wx.getStorageSync("loginSessionKey") }
    }).then(response => {
      console.log(response);
     
      if (response.data.errCode == 0) {
        wx.showToast({
          title: "成功",
          icon: 'none',
          duration: 2000
        });
         this._PkgDetail();
      }else{
        wx.showToast({
          title: response.data.msg,
          icon: 'none',
          duration: 2000
        })
      }

     

    }).catch(error => {
      console.log(error);
    })
  }
})