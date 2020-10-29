// pages/verticalNav/verticalNav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //列表
    tabCur: "", //左侧tab下标
    mainCur: "", //右侧tab下标
    tabCur: ""
  },

  //获取元素属性方法
  getRect(e) {
    return new Promise(function(resolve, reject) {
      wx.createSelectorQuery().select(e).boundingClientRect(res => {
        resolve(res)
      }).exec()
    })
  },


  //左侧点击方法
  getTab(e) {
    this.setData({
      tabCur: e.currentTarget.dataset.index,
      mainCur: e.currentTarget.dataset.index,
    })
  },
  scroll(e) {
    console.log(e)
    let list = this.data.list
    let offsetTop = e.detail.scrollTop + 20
    for (let i = 0; i < list.length; i++) {
      if (offsetTop > list[i].offsetTop && offsetTop < list[i].itemBottom) {
        console.log(i)
        this.setData({
          tabCur: i
        })
      }
    }
  },

  //初始化数组
  initList() {
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      // 将 Unicode 编码转为一个字符
      list[i].name = String.fromCharCode(65 + i); //生成26个字母
      list[i].id = i;
    }
    this.setData({
      list: list,
    })
  },

  //初始化项目
  initItem(e, selector) {
    // return new Promise((resolve, reject) => {
    e.forEach((item, index) => {
      this.getRect(selector + index).then(res => {
        item.offsetTop = res.top
        item.itemBottom = res.bottom
      })
    })
    //   resolve(e)
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //初始化list数据
    this.initList()
    //给list增加两个属性
    this.initItem(this.data.list, "#right-")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})