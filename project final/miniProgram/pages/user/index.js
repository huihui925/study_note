// pages/user/index.js
Page({
  data:{
    userInfoFlag:false,
    collectNum:0,
    userInfo:{}
  },
  onShow(){
    const userInfo  = wx.getStorageSync('userInfo') || {};
    
    const collectList  = wx.getStorageSync('collectList') || [];

    if(userInfo.nickName){
      this.setData({userInfoFlag:true,collectNum:collectList.length,userInfo})
    }else{
      this.setData({userInfoFlag:false,collectNum:collectList.length})
    }
  }
})