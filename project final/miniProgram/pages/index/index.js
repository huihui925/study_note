//Page Object
import {request} from '../../request/index.js'
Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[],
  },
  //页面加载时触发的第一个钩子函数,通常在这里发起异步请求获取数据
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  //获取轮播图数据
  getSwiperList(){
    request({url: '/home/swiperdata'}).then(result=>{
      result.forEach(v => {
        v.navigator_url=v.navigator_url.replace(/main\?/g,'index?')
      });
      this.setData({
        swiperList:result
      })
    })
  },
  //获取导航数据
  getCateList(){
    request({url:'/home/catitems'}).then(result=>{
      this.setData({
        cateList:result
      })
    })
  },
  //获取楼层数据
  getFloorList(){
    request({url:'/home/floordata'}).then(result=>{
      result.forEach(v => {
        v.product_list.forEach(el => {
            el.navigator_url=el.navigator_url.replace(/goods_list\?/g,'goods_list/index?')
      });
      });
      this.setData({
        floorList:result
      })
    })
  }
});