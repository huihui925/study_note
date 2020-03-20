import { request } from '../../request/index.js'
import {showToast} from '../../utils/asyncWx'
Page({
  data: {
    goodsObj:{},
    isCollect:false
  },
  fullGoodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages = getCurrentPages();
    const {goods_id} =pages[pages.length-1].options
    this.getGoodsDetail(goods_id)
    
  },
  async getGoodsDetail(goods_id){
    let goodsObj = await request({url:"/goods/detail",data:{goods_id}})
    this.fullGoodsObj = goodsObj

    const collectList = wx.getStorageSync("collectList") || [];
    const isCollect = collectList.some(v=>v.goods_id == goods_id)
    
    this.setData({
      isCollect,
      goodsObj:{
        goods_price:goodsObj.goods_price,
        goods_name:goodsObj.goods_name,
        pics:goodsObj.pics,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
      }
    })
  },
  handleCollectChange(){
    const collectList = wx.getStorageSync("collectList") || [];
    const index = collectList.findIndex(v=>v.goods_id==this.fullGoodsObj.goods_id)
    if(index == -1){
      collectList.push(this.fullGoodsObj)
      showToast({title:"收藏成功",icon:"success",mask:true})
    }else{
      collectList.splice(index,1)
      showToast({title:"取消收藏",icon:"success",mask:true})
    }
    wx.setStorageSync("collectList", collectList);
      this.setData({isCollect:!this.data.isCollect})
    
  },
  handlePreviewImage(e){
    const urls = this.data.goodsObj.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.src
    wx.previewImage({
      current, 
      urls 
    })
  },
  handleCarAdd(){
    //取本地存储数据购物车 数组,若无值会返回空字符串,布尔值表false,这里进行处理返回[] 避免数组循环报错
    const car = wx.getStorageSync("car") || [];
    //当前商品信息
    const fullGoodsObj = this.fullGoodsObj
    //判断购物车有无此商品
    const index = car.findIndex(v=>v.goods_id==fullGoodsObj.goods_id)
    //若无此商品
    if(index===-1){
      fullGoodsObj.num=1
      fullGoodsObj.isChecked=true
      car.push(fullGoodsObj)
    }else{
      //若有此商品
      car[index].num++
    }
    //不管有没有都需重新设置到本地存储中
    wx.setStorageSync('car', car);
    //添加成功后弹出提示框
    wx.showToast({
      title: '添加成功',
      icon:"success",
      mask: true,
    });
  }

})