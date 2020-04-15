const app = getApp();
const BaseURL = app.globalData.baseURL;
export default function request(option){
   return new Promise((resolve,reject)=>{
     wx.showLoading({
       title: '加载中……',
     })
     wx.request({
       url: BaseURL+option.url,
       method: option.method || 'get',
       data: option.data || {},
       success: function (res) {
         wx.hideLoading();
         resolve(res);
       },
       fail:function(error){
         wx.hideLoading();
         reject(error);
       },
       complete: function () {
         wx.hideLoading();
       }
     })
   })
  
}