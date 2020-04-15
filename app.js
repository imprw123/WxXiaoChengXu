//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //获取用户地理位置

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              //console.log(res);
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseURL: 'https://yyking.5211game.com',
    loginInfor: wx.getStorageSync("loginSessionKey")
  }
})

// 测试地址：http://192.168.8.137:9294/YYKing    正式地址：https://yyking.5211game.com/  
//我的AQAAAOZPDhMAAAAAAAAAACoGoTzN4i0Kgz7VAl5Ghkvqfu*m6IJx1AGEq4Wzqc9GOoRh09fb5Pr/OYJlpcEqJ2D4PyO9YRzDIseRcNJTSFVg*D8jvWEcwyLHkXDSU0hVMeplR*mpMODbdeMlMIhuGmD4PyO9YRzDIseRcNJTSFU=

//慕润东的
//AQAAADlVShsAAAAAAAAAADtdD6Bu15rmWdH6O0Qv2PFIDe2gFVils6gJgJ2Pb6K0AU2K0j4CCkDuJ*iQDoh2oGD4PyO9YRzDIseRcNJTSFVg*D8jvWEcwyLHkXDSU0hVOJDXqklG*cxu/yArIohkMGD4PyO9YRzDIseRcNJTSFU=

//吕霖的
//AQAAAJOMwxsAAAAAAAAAAEBCqpzR5E3pxIzvk91O4NeKxYms0EG4LfnXX0J3BgrqYPg/I71hHMMix5Fw0lNIVWD4PyO9YRzDIseRcNJTSFVg*D8jvWEcwyLHkXDSU0hV3sxUjzfrCGdPrJTDPoCEi2D4PyO9YRzDIseRcNJTSFU=

//wx.getStorageSync("loginSessionKey")


//oppo
//AQAAAEcRnxsAAAAAAAAAALgE7ur2cOrneG1E*wdThXmqGrqV1RrBTWFWgyT5FUhhAIip3mC5oAxpvB4MG7WCWmD4PyO9YRzDIseRcNJTSFVg*D8jvWEcwyLHkXDSU0hVVtcHUnVgROa0TvLc2bIMemD4PyO9YRzDIseRcNJTSFU=