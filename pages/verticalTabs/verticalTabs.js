// pages/verticalNav/verticalNav.js
// const regeneratorRuntime = require('../../utils/runtime.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //列表
    tabCur: "", //左侧tab下标
    mainCur: "", //右侧tab下标
    leftTop: "", //左侧距离顶部
    rect: {
      leftHeight: "", //左边高度(用来计算居中)
      leftItem: [], //左边的每个item所需要的offsetTop和Height
      rightItem: [], //右边的每个item所需要的offsetTop和bottom
    }, //位置信息
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
    let index = e.currentTarget.dataset.index
    let leftItem = this.data.rect.leftItem
    let leftHeight = this.data.rect.leftHeight
    this.setData({
      tabCur: index,
      mainCur: index,
      leftTop: leftItem[index].offsetTop - leftHeight / 2 + leftItem[index].height / 2,
    })
  },
  scroll(e) {
    let rightItem = this.data.rect.rightItem
    let leftItem = this.data.rect.leftItem
    let leftHeight = this.data.rect.leftHeight
    let offsetTop = e.detail.scrollTop + 20
    rightItem.forEach((item, index) => {
      if (offsetTop > item.offsetTop && offsetTop < item.bottom) {
        if (this.data.tabCur != index) {
          console.log('进行改变')
          this.setData({
            tabCur: index,
            leftTop: leftItem[index].offsetTop - leftHeight / 2 + leftItem[index].height / 2,
          })
        } else {
          console.log('不进行改变')
        }
      }
    })
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
  //初始化左边
  async initLeft(e, selector) {
    var item = []
    for (let i = 0; i < e; i++) {
      await this.getRect(selector + i).then(res => {
        let obj = {}
        obj.offsetTop = res.top
        obj.height = res.height
        item.push(obj)
      })
    }
    return item
  },
  // 初始化右边
  async initRight(e, selector) {
    var item = []
    for (let i = 0; i < e; i++) {
      await this.getRect(selector + i).then(res => {
        let obj = {}
        obj.offsetTop = res.top
        obj.bottom = res.bottom
        item.push(obj)
      })
    }
    return item
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
  },


  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //初始化list数据
    this.initList()
    Promise.all([this.initLeft(this.data.list.length, "#left-"), this.initRight(this.data.list.length, "#right-"), this.getRect('#leftHeight')])
      .then(([left, right, leftHeight]) => {
        this.data.rect.leftItem = left
        this.data.rect.rightItem = right
        this.data.rect.leftHeight = leftHeight.height
        // console.log(this.data.rect.leftHeight)
        // console.log(this.data.rect)
        console.log(leftHeight)
        // console.log(left)
        // console.log(right)
      })
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