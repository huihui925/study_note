// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({
  /**
 * 页面的初始数据
 */
  data: {
    goodsList: [],
    tabsList: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ]
  },
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  fullPageTotal:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cid||''
    this.queryParams.query=options.query||''
    this.getGoodsList()
  },
  async getGoodsList() {
    let res = await request({ url: '/goods/search',data: this.queryParams})
    this.fullPageTotal = Math.ceil(res.total / this.queryParams.pagesize)
    this.setData({
      goodsList: this.data.goodsList.concat(res.goods) 
    })
      wx.stopPullDownRefresh()
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
  onReachBottom(){
    if(this.queryParams.pagenum >= this.fullPageTotal){
      wx.showToast({
        title: '已经触底了',
      });
    }else{
      this.queryParams.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh(){
    //1.将之前请求的数据清空，
    //原因：之前为实现触底加载下一页功能 数据是用concat拼接的，若不清空，数据有问题，正常刷新应该从第一页开始
    this.setData({
      goodsList:[]
    })
    //2.将页码设置为初始值
    this.queryParams.pagenum = 1
    //3.发新请求 请求数据
    this.getGoodsList()
  }
})
