const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsApi: "https://cmsapi.5211game.com/NewsService/YYService/YYNews.ashx",
    newsId:'',
    news_Title:'',
    item_Name:'',
    news_Content:'',
    addDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      newsId: options.News_Id, //72996
    })
    this.getNewsDetail();
  },
  getNewsDetail(){
    var _that=this;
    wx.request({
      dataType: 'jsonp',
      jsonp: "callback",
      jsonpCallback: "QQmap",
      url: this.data.newsApi +
        "?op=QueryNewsById&NewsId=" +
        this.data.newsId,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _that.setData({
          news_Title: JSON.parse(res.data).News_Title,
          item_Name: JSON.parse(res.data).Item_Name,
          news_Content: JSON.parse(res.data).News_Content,
          addDate: JSON.parse(res.data).AddDate
        })
    
      },
      fail: function (error) {
        console.log(error);
      }
    })
  
  },
  onShareAppMessage: function (res) {
    return {
      title: '新闻详情', //转发的标题。当前小程序名称
      path: 'pages/newsDetail/newsDetail?News_Id= ' + this.data.newsId+' ', //转发的路径
      imageUrl: 'https://img.5211game.com/Base/bg/kinglg.jpg',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
  
})