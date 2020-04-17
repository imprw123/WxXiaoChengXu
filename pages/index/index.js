//index.js
//获取应用实例
const app = getApp();
import request from '../../service/network.js';
import port from '../../service/port.js';

Page({
  data: {
    defaultBanner: [
      // {
      //   img: "https://img.5211game.com/Base/bg/banner01.png",
      //   url: "/yao",
      //   privilege_type: "default"
      // },
      {
        img: "https://img.5211game.com/Base/bg/banner02.png",
        url: "/pages/rpg/Gifts/gifts",
        privilege_type: "default"
      },
      {
        img: "https://img.5211game.com/Base/bg/banner03.png",
        url: "/pages/vip/vip",
        privilege_type: "default"
      }
    ],
    pageIndex:1,
    id: "1,2,3,4",
    banners:[],
    newsList:[],
    recommends: [{ 'icon': '../../pages/images/libao.png', 'textKey': '游戏礼包' }, { 'icon': '../../pages/images/jierifuli.png', 'textKey': '节日福利' }, { 'icon': '../../pages/images/youhuiquan.png', 'textKey': '优惠券' }, { 'icon': '../../pages/images/huodong.png', 'textKey': '热门活动' }]
  },
  onLoad: function () {
    this._getBanner();
    this._getlistNews();
  },
  //获取轮播图信息
  _getBanner(){
    request({
      url: port.home.GetBanner
    }).then(res=>{
     // console.log(res);
      if (res.data.data == null || res.data.data.length == 0) {
        this.setData({
          banners: this.data.defaultBanner
          })
      } else {
        this.setData({
          banners: res.data.data 
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  },
  //获取新闻接口
  _getlistNews(){
    const newapi ='https://cmsapi.5211game.com/NewsService/YYService/YYNews.ashx';
    const _url = newapi + '?op=NewsListByPage&PageSize=6&PageIndex=' + this.data.pageIndex + '&CategoryIds=' + this.data.id +'&itemIds=4,12,71' 
    wx.request({
      type: "get",
      dataType: 'jsonp',
      header: {
        'content-type': 'application/json'
      },
      jsonp: "callback",
      jsonpCallback: "newsMap",
      url: _url,
      success: (res)=> {
        console.log(JSON.parse(res.data).NewsList);
        this.setData({
          newsList: JSON.parse(res.data).NewsList
        })
      },
      fail: function (error) {
        console.log(error)
      },
    })

  },
  errorTip(){
    wx.showToast({
      title:"敬请期待!",
      icon: 'none',
      duration: 1500
    });
    return false;
  },
  onShareAppMessage: function () {
    return {
      title:'妖妖King会员首页', //转发的标题。当前小程序名称
      path: 'pages/index/index', //转发的路径
      imageUrl: 'https://img.5211game.com/Base/bg/kinglg.jpg',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
  
})
