import { getStting, openSetting, chooseAddress, showModal ,showToast} from '../../utils/asyncWx.js'
Page({
  data: {
    address: {},
    car: [],
    checkAll: false,
    totalPrice: 0,
    totalNum: 0
  },
  onLoad() {
  },
  onShow: function () {
    const address = wx.getStorageSync('address') || {};
    const car = wx.getStorageSync("car") || [];
    this.setCart(car, { address })

  },
  async handleChooseAddress() {
    try {
      //1. 获取 权限状态
      const res1 = await getStting()
      const scopeAddress = res1.authSetting['scope.address']
      //2. 判断 权限状态
      if (scopeAddress === false) {
        //3. 诱导用户打开授权页面
        await openSetting()
      }
      //4.此时状态必然支持获取地址 所以直接写
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  handleItemChecked(e) {
    const goods_id = e.currentTarget.dataset.id
    let { car } = this.data
    const index = car.findIndex(v => v.goods_id == goods_id)
    car[index].isChecked = !car[index].isChecked
    this.setCart(car)

  },
  //设置购物车状态 同时 重新计算 底部工具栏的数据 全选 总价格 购买数量
  setCart(car, payload = {}) {
    let checkAll = true
    let totalPrice = 0
    let totalNum = 0
    car.forEach(v => {
      if (v.isChecked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        checkAll = false
      }
    })
    checkAll = car.length ? checkAll : false
    this.setData({
      car,
      checkAll,
      totalPrice,
      totalNum,
      ...payload
    })
    wx.setStorageSync("car", car);
  },
  handleCheckAllChange(e) {
    let { car, checkAll } = this.data
    checkAll = !checkAll
    car.forEach(v => v.isChecked = checkAll)
    this.setCart(car)
  },
  async handleNumEdit(e) {
    const { id, operation } = e.currentTarget.dataset
    const { car } = this.data
    const index = car.findIndex(v => v.goods_id == id)
    if (operation == -1 && car[index].num == 1) {
      const res = await showModal({ content: '您是否要删除该商品?' })
      if (res) {
        car.splice(index, 1)
        this.setCart(car)
      }
    } else {
      car[index].num += operation
      this.setCart(car)
    }
  },
  async handleBalance(){
    const {address,totalNum} = this.data
    if(!totalNum){
      await showToast({title: '您还没有选购商品'})
      return
    }
    if(!address.userName){
      await showToast({title: '您还没有选择收货地址'})
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });



  }

})

