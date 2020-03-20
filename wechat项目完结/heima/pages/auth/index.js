import { login } from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'
Page({
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      // const { code } = await login()//此为封装后的获取token值
      // const data = { encryptedData, rawData, iv, signature, code }
      // const res = await request({ url: "/users/wxlogin", method: "POST", data })
      //res.token可以拿到token值但微信支付有用户权限,仅企业用户可用,个人用户不可用 所以这里拿不到 我就假装拿到token值了
      
      //设置token
      wx.setStorageSync("token", "假token值");
      //设置好后返回上一个页面即支付页面 delta填1表示返回一层 填n即上n层
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
    }
  }
})