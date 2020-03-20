import { getStting, openSetting, chooseAddress, showModal, showToast, navigateTo, requestPayment } from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'
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
    let car = wx.getStorageSync("car") || [];
    car = car.filter(v => v.isChecked)

    let totalPrice = 0
    let totalNum = 0
    car.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      car,
      totalPrice,
      totalNum,
      address
    })
  },
  //设置购物车状态 同时 重新计算 底部工具栏的数据 全选 总价格 购买数量
  async handleOrderPay() {
    try {
      //获取本地缓存的token值
      const token = wx.getStorageSync("token");
      //如果没有token 跳珠到授权页面获取token 那边获取到了token存到本地存储再wx.navigateBack({delta: 1});返回到支付页面继续操作
      if (!token) {
        navigateTo({ url: '/pages/auth/index' })
        return
      }
      const header = { 'Authorization': 'token' }
      let { totalPrice: order_price, car, address } = this.data
      const consignee_addr = address.all
      const goods = car.map(v => ({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const data = { order_price, consignee_addr, goods }
      //获取订单号res.order_number
      //前面token由于权限原因拿不到 所以这里肯定拿不到订单号 我就假设拿到了 然后按正常流程走 
      // const res = await request({ url: "/my/orders/create", method: "POST", header, data })
      //根据订单编号和token获取支付参数pay
      //正常来说应该是res.token
      // const result = await request({ url: "/my/orders/req_unifiedorder", method: "POST", header, data: { order_number: res } })
      // console.log(result.pay)这是pay参数
      //发起微信支付 这些参数都是pay里面的 正常来说应该把result.pay传进去
      // await requestPayment(result)
      // //支付后 查询订单状态看有没有支付成功
      // const status = await request({url:"/my/orders/chkOrder",method:"POST", header,data:{order_number:res}})
      //成功后弹窗提示并跳转到订单页面
      await showToast({ title: "支付成功",icon:"success",mask:true})
      await new Promise(resolve=>{
        setTimeout(function(params) {
          resolve()
        },1000)
      })
      //跳转到个人中心页面
      wx.switchTab({
        url: '/pages/user/index',
      });
      let newcar = wx.getStorageSync("car") || [];
       newcar = newcar.filter(v=>!v.isChecked)
       wx.setStorageSync("car", newcar);
       wx.setStorageSync("orderCar",this.data.car );
    } catch (error) {
      await showToast({ title: "支付失败" })
      console.log(error)
    }
  }
})

