const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCode: null,
    flag: false,
    tip: '',
    isPhoneNumber: false,
    countdown: 60,
    btnVal: "获取验证码",
    isDisable: false,
    inCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  getCodeInput(e){
    this.setData({
      inCode: e.detail.value
    })
  },
  getSearchInput(e) {
    this.searchCode = e.detail.value;
    console.log(this.searchCode);
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (this.searchCode == "") {
      this.setData({
        tip: '',
        flag: false
      })
    } else if (!myreg.test(this.searchCode)) {
      this.setData({
        tip: '请输入正确手机号',
        flag: true
      })
    } else {

      wx.showToast({
        title: '填写正确',
        icon: 'success',
        duration: 1500
      })
      this.setData({
        tip: '',
        flag: false,
        isPhoneNumber: true
      })

    }
  },
  //获取验证码
  requestCode() {
    if (!this.data.isPhoneNumber) {
      wx.showToast({
        title: '请先填写正确手机号',
        icon: 'none',
        duration: 1500
      })
      return false
    } else {

      this._TelSendCode();
    }
  },
  _settime: function() {
    var _that = this;
    if (this.countdown == 0) {
      this.setData({
        isDisable: false,
        btnVal: "获取验证码",
        countdown: 60
      })
      return;
    } else {
      this.data.countdown--
        this.setData({
          isDisable: true,
          btnVal: "重新发送(" + this.data.countdown + ")",
        });
      setTimeout(
        function() {
          _that._settime();
        },
        1000
      );
    }
  },
  _TelSendCode() {
    request({
      url: "/King/TelSendCode",
      data: {
        st: wx.getStorageSync("loginSessionKey"),
        mobile: this.isPhoneNumber
      }
    }).then(response => {
      console.log(response);
      if (response.data.errCode == 1000) {
        wx.showToast({
          title: response.data.msg,
          icon: 'none',
          duration: 1500
        })
      } else if (response.data.errCode < 0) {
        wx.showToast({
          title: response.data.msg,
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.showToast({
          title: response.data.msg,
          icon: 'success',
          duration: 1500
        })
        this._settime();
      }

    }).catch(error => {
      console.log(error);
    })

  },
  //绑定手机
  _TelBindMobile() {
    if (!this.data.isPhoneNumber) {
      wx.showToast({
        title: '请先填写正确手机号',
        icon: 'none',
        duration: 1500
      })
      return false
    } else if (this.data.inCode == "") {
      wx.showToast({
        title: '请填写手机验证码',
        icon: 'none',
        duration: 1500
      })
      return false
    } else {
      request({
        url: "/King/TelBindMobile",
        data: {
          st: wx.getStorageSync("loginSessionKey"),
          code: this.data.inCode
        }
      }).then(response => {
        console.log(response);
        if (response.data.errCode == 0) {
          wx.showToast({
            title: '绑定成功!',
            icon: 'success',
            duration: 1500
          });
          wx.switchTab({
            url: '../my/my'
          })
          return false;
        } else {
          wx.showToast({
            title: response.data.msg,
            icon: 'none',
            duration: 1500
          })
         
          return false;
        }

      }).catch(error => {
        console.log(error);
      })

    }

  }
})