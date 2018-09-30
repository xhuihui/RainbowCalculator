//index.js
//获取应用实例
var app = getApp()
 var i=0
Page({
  data: {
    //金币单位索引
    jbdwIndex:0,
    zzdwIndex:0,
    dw:["无","K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz"],
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
    var jbdw = wx.getStorageSync('jbdw');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        jbdwIndex:jbdw,
        userInfo:userInfo
      })
    })
  },
  zzbindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zzdwIndex: e.detail.value
    })
    wx.setStorage({
      key: "zzdw",
      data: e.detail.value
    })
    this.zz2jb();
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jbdwIndex: e.detail.value
    })
    wx.setStorage({
      key: "jbdw",
      data: e.detail.value
    })
    this.jb2zz();
  },
  //金币改变
   changeName: function(e) {
     const value = e.detail.value;
     this.setData({
       jinbi: value,
     })
     this.jb2zz();
  },
  //金币转换豆子
  jb2zz:function(){
    let jb=this.data.jinbi;
    let dw = Math.pow(1000, this.data.jbdwIndex);
    let dz = 0.04 * Math.pow(jb * dw, 0.3787);
    let dzdw = this.jsdw(dz,0);

    this.setData({
      zhognzi: dzdw.value.toFixed(2)+""+dzdw.dw,
    })
    this.jb2zz300();
    this.jb2zz1200();
  },
  //金币转换豆子
  jb2zz300: function () {
    let jb = this.data.jinbi*0.8*6*2;
    let dw = Math.pow(1000, this.data.jbdwIndex);
    let dz = 0.04 * Math.pow(jb * dw, 0.3787);
    let dzdw = this.jsdw(dz, 0);

    this.setData({
      zhognzi300: dzdw.value.toFixed(2) + "" + dzdw.dw,
    })
  },
  //金币转换豆子
  jb2zz1200: function () {
    let jb = this.data.jinbi * 0.8 * 6 * 2*7;
    let dw = Math.pow(1000, this.data.jbdwIndex);
    let dz = 0.04 * Math.pow(jb * dw, 0.3787);
    let dzdw = this.jsdw(dz, 0);

    this.setData({
      zhognzi1200: dzdw.value.toFixed(2) + "" + dzdw.dw,
    })
  },
  
  //单位换算
  jsdw:function(v,i){
      if(v<1000){
        
        return { value: v, dw: this.data.dw[i]};
      }
      return this.jsdw(v/1000,++i);
  },
  //豆子变动
  changeName2: function (e) {
    let value = e.detail.value;
    this.setData({
      zzzhongzi: value,
    })
    this.zz2jb();
  },
  //种子转换金币
  zz2jb: function () {
    let zz = this.data.zzzhongzi;
    let dw = Math.pow(1000, this.data.zzdwIndex);
    let jinbi = Math.pow((1 / 0.04), 1 / 0.3787) * Math.pow(zz * dw, 1 / 0.3787)
    let jbdw = this.jsdw(jinbi, 0);

    this.setData({
      jinbi: jbdw.value.toFixed(2) + "" + jbdw.dw,
    })
  },
 
})
