const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
var dateTimePicker = require('./dateTimePicker.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    icon:'',
    k_level:0,
    k_value:0,
    yd_value:0,
    mobile:0,
    buttonDisabled: false,
    modalHidden: true,
    show: false,
    islogin:"",
    // 日期选择
    date: '2020-01-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    startYear: 1900,
    endYear: 2050,
    birthday:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   //debugger;
    this.setData({
      islogin: wx.getStorageSync("loginSessionKey")
    })
    if (this.data.islogin){
      this._GetUserInfo();
      // 获取完整的年月日 时分秒，以及默认显示的数组
      var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
      this.setData({
        dateTime: obj.dateTime,
        dateTimeArray: obj.dateTimeArray
      });
    }
  },
   //日期选择
  changeDate(e) {
    this.setData({ date: e.detail.value });
    console.log(this.data.date);
    if (this.data.date){
      request({
        url: port.my.BindBirthday,
        data: { st: wx.getStorageSync("loginSessionKey"), tm: this.data.date}
      }).then(res => {
        console.log(res);
        this._GetUserInfo();
        if (res.data.errCode == 0){
          wx.showToast({
            title: '设置生日成功'
          })
        }else{
          wx.showToast({
            title: res.data.msg
          })
        }
       
      }).catch(error => {
        console.log(error);
      })
    }
  },
  //日期选择
  _GetUserInfo(){
    request({
      url: port.my.GetUserInfo,
      data: { st: wx.getStorageSync("loginSessionKey")}
    }).then(res => {
      console.log(res);
      this.setData({
        userName:res.data.data.user_name,
        icon: res.data.data.icon,
        k_level: res.data.data.k_level,
        k_value: res.data.data.k_value,
        yd_value: res.data.data.yd_value,
        mobile: res.data.data.mobile,
        birthday:res.data.data.birthday

      })

    }).catch(error => {
       console.log(error);
    })

  },
  showModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  freeTell() {

    wx.makePhoneCall({
      phoneNumber: '021-23099155',

    })

  },
  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '您点击了【确认】按钮！',
      buttonDisabled: !this.data.buttonDisabled
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '您点击了【取消】按钮！'
    })
  },
  //点击登录 
  login(){
    var _that=this;
    if (wx.getStorageSync("loginSessionKey")) return;
    wx.login({
      success(res) {
        console.log(res.code);
        if (res.code) {
       // debugger;
          wx.request({
            url: 'https://passport.9211.com/webapi/wap/action?t=login&data={"Bid":1,"Code":' + res.code+'}&pt=wxmini',
            success: function (res) {
              console.log(res);
              if (!res.data.data){
                wx.showToast({
                  title: '您的微信还未绑定11账号,请立即去绑定!',
                  icon: 'none',
                  duration: 2500
                })
              }else{
                let token = res.data.data.st;
                console.log(token);
                wx.setStorage({
                  key: 'loginSessionKey',
                  data: token,
                  success: function () {
                    _that.onLoad();
                  },
                  fail: function () {
                    console.log('失败')
                  },
                  complete: function () {
                    _that.onLoad();
                  }
       
                })
              }
             
            },
            fail: function (error) {
              console.log(error)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  //退出
  exit(){
    var that=this;
    wx.removeStorage({
      key: 'loginSessionKey',
      success: function (res) {
        that.setData({
          islogin: '',
          yd_value:0,
          k_value:0
        });
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '我的', //转发的标题。当前小程序名称
      path: 'pages/my/my', //转发的路径
      imageUrl: 'https://img.5211game.com/Base/bg/kinglg.jpg',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})