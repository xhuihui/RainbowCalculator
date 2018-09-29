//index.js
//获取应用实例
var app = getApp()
 var i=0
Page({
  data: {
    j:0.04,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
 
   changeName: function(e) {
     
    this.setData({
      zhognzi: 0.04 * Math.pow(e.detail.value, 0.3787)
    })
  },
  changeName2: function (e) {
   // y = ax ^ b  => x = (1 / a) ^ (1 / b)y ^ (1 / b)

    this.setData({
      jinbi: Math.pow((1 / 0.04), 1/0.3787) * Math.pow(e.detail.value, 1/0.3787)
    })
  }
 
})
