import { request } from '../../request/index.js'
Page({
  data: {
    //左边菜单数据
    menuLeft: [],
    //右边详情数据
    contentRight: [],
    currentIndex: 0,
    flag:0
  },
  //全部数据
  categoryList: [],
  onLoad: function (options) {
    const categoryList = wx.getStorageSync('categoryList');
    if (!categoryList) {
      this.getCategoryList()
    } else {
      if (Date.now() - categoryList.time <= 1000 * 60 * 60 * 600) {
        this.categoryList = categoryList.data
        let menuLeft = this.categoryList.map(v => v.cat_name)
        let contentRight = this.categoryList[0].children
        this.setData({
          menuLeft,
          contentRight
        })
      }else{
        this.getCategoryList()
      }
    }
  },
  async getCategoryList() {
    let result = await request({ url: '/categories' })
    this.categoryList = result
    wx.setStorageSync('categoryList',{time: Date.now(),data: this.categoryList});
    let menuLeft = this.categoryList.map(v => v.cat_name)
    let contentRight = this.categoryList[0].children
    this.setData({
      menuLeft,
      contentRight
    })
  },
  handleTap(e) {
    const { currentindex } = e.currentTarget.dataset
    this.setData({
      currentIndex: currentindex,
      contentRight: this.categoryList[currentindex].children,
      flag:0
    })
  }
})