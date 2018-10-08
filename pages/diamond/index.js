//index.js
//获取应用实例
var app = getApp()
var i = 0
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({
  data: {
    //金币单位索引
    jbdwIndex: 0,
    zzdwIndex: 0,
    dw: ["无", "K", "M", "B", "T", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz", "Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp", "Qq", "Rr", "Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz"],
    j: 0.04009,
    k: 0.37869,
    userInfo:{}
  },


  onLoad: function () {
    console.log('onLoad')
    var jbdw = wx.getStorageSync('jbdw');
    var zzdw = wx.getStorageSync('zzdw');
    var D5dw = wx.getStorageSync('D5dw');
    var that = this
    //更新数据
    that.setData({
      jbdwIndex: jbdw,
      zzdwIndex: zzdw,
      d5dwIndex: D5dw,
      jinbi:0,
      zzJinbi:0,
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
  bindPickerChangeD5: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      d5dwIndex: e.detail.value
    })
    wx.setStorage({
      key: "D5dw",
      data: e.detail.value
    })
    this.jb2zz();
  },
  bindPickerChangeZZ: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      zzdwIndex: e.detail.value
    })
    wx.setStorage({
      key: "zzdw",
      data: e.detail.value
    })
    this.zz2jb();
    this.jb2zz();
  },
  //金币改变
  changeJB: function (e) {
    const value = e.detail.value;
    this.setData({
      jinbi: value,
    })
    this.jb2zz();
  },
  //金币改变
  changeD5: function (e) {
    const value = e.detail.value;
    this.setData({
      D5: value,
    })
    this.jb2zz();
  },
  //金币转换豆子
  jb2zz: function () {
    this.jb2zz300();
    this.jb2zz1200();
  },
  //金币转换豆子
  jb2zz300: function () {
    let jb = this.data.D5 * 0.8 * 6 * 2;
    let d5dw = Math.pow(1000, this.data.d5dwIndex);
    let jbdw = Math.pow(1000, this.data.jbdwIndex);
    let allJb = jb * d5dw + this.data.jinbi * jbdw + this.data.zzJinbi;

    let dz = this.data.j * Math.pow(allJb, this.data.k);
    let dzdw = this.jsdw(dz, 0);

    this.setData({
      zhognzi300: dzdw.value.toFixed(2) + "" + dzdw.dw,
    })
  },
  allJb:function(){
      let d5300jb=this.data.D5/5*24*2;
      
  },
  //金币转换豆子
  jb2zz1200: function () {
    let jb = this.data.D5 * 0.8 * 6 * 2*7;
    let d5dw = Math.pow(1000, this.data.d5dwIndex);
    let jbdw = Math.pow(1000, this.data.jbdwIndex);
    let allJb = jb * d5dw + this.data.jinbi * jbdw + this.data.zzJinbi;

    let dz = this.data.j * Math.pow(allJb, this.data.k);
    let dzdw = this.jsdw(dz, 0);

    this.setData({
      zhognzi1200: dzdw.value.toFixed(2) + "" + dzdw.dw,
    })
  },

  //单位换算
  jsdw: function (v, i) {
    if (v < 1000) {

      return { value: v, dw: this.data.dw[i] };
    }
    return this.jsdw(v / 1000, ++i);
  },
  //豆子变动
  changeZZ: function (e) {
    let value = e.detail.value;
    this.setData({
      zzzhongzi: value,
    })
    this.zz2jb();
    this.jb2zz();
  },
  //种子转换金币
  zz2jb: function () {
    let zz = this.data.zzzhongzi;
    let dw = Math.pow(1000, this.data.zzdwIndex);
    let jinbi = Math.pow((1 / this.data.j), 1 / this.data.k) * Math.pow(zz * dw, 1 / this.data.k)
    this.setData({
      zzJinbi: jinbi,
    })
  },
  //滑动事件
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },

  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        //this.move2left();
        moveFlag = false;
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件

  },

  move2right() {
    wx.navigateTo({
      url: '../index/index'
    })
  },

})
