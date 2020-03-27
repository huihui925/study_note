// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({
  data: {
    orderList: [],
    tabsList: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      },
    ]
  },
  onShow: function () {
    const pages = getCurrentPages();
    const { type } = pages[pages.length - 1].options
    this.handleTabListChange(type - 1)
    //根据type发请求 获取数据 这里就不发了 直接模拟假数据
    // this.analogData(type)
  },
  analogData(type) {
    const orderList = [
      {
        id: 0,
        orderNum: 'HMDD20200319000000001101',
        orderPrice: 6660 + +type,
        orderTime: new Date(Date.now() - 1000 * 60 * 60 * 13).toLocaleString()
      },
      {
        id: 1,
        orderNum: 'HMDD20200319000000001101',
        orderPrice: 6644 + +type,
        orderTime: new Date(Date.now() - 1000 * 60 * 60 * 15).toLocaleString()
      },
      {
        id: 2,
        orderNum: 'HMDD20200319000000001101',
        orderPrice: 6633 + +type,
        orderTime: new Date(Date.now() - 1000 * 60 * 60 * 17).toLocaleString()
      },
      {
        id: 3,
        orderNum: 'HMDD20200319000000001101',
        orderPrice: 6622 + +type,
        orderTime: new Date(Date.now() - 1000 * 60 * 60 * 19).toLocaleString()
      },
      {
        id: 4,
        orderNum: 'HMDD20200319000000001101',
        orderPrice: 6611 + +type,
        orderTime: new Date(Date.now() - 1000 * 60 * 60 * 110).toLocaleString()
      }
    ]
    this.setData({
      orderList
    })
  },
  handleTabListChange(index) {
    const { tabsList } = this.data
    tabsList.forEach((v, i) => {
      i == index ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabsList
    })
  },
  handleItemChange(e) {
    const { index } = e.detail
    this.handleTabListChange(index)
    // this.analogData(index+1)
  }
})
