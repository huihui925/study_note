import { login } from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'
Page({
  async handleGetUserInfo(e) {
    try {
     const userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo',userInfo);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error)
    }
  }
})