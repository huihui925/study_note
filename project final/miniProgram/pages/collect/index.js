
import { request } from '../../request/index.js'
Page({

  data: {
    collectList: [],
    tabsList: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ]
  },

  onShow: function () {
    const collectList = wx.getStorageSync("collectList");
    this.setData({
      collectList
    })
  },
  handleItemChange(e) {
    const { index } = e.detail
    const { tabsList } = this.data
    tabsList.forEach((v, i) => {
      i == index ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabsList
    })
  },
})
