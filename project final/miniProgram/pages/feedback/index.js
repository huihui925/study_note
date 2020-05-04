// pages/goods_list/index.js
import { request } from '../../request/index.js'
import { showToast } from '../../utils/asyncWx'
Page({

  data: {
    tabsList: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    chooseImages: [],
    textValue: ''
  },
  //外网的图片路径数组
  UpLoadImgs: [],
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
  handleUpImg() {
    wx.chooseImage({
      //最多可以选择的图片张数
      count: 9,
      //图片格式    原图        压缩
      sizeType: ['original', 'compressed'],
      //图片来源     相册       相机
      sourceType: ['album', 'camera'],
      //成功的回调
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res);
        
        const tempFilePaths = res.tempFilePaths
        this.setData({
          chooseImages: this.data.chooseImages.concat(tempFilePaths)
        })
      }
    })
  },
  handleClearImg(e) {
    const { imgindex } = e.detail
    let { chooseImages } = this.data
    chooseImages.splice(imgindex, 1)
    this.setData({
      chooseImages
    })
  },
  handleTextInput(e) {
    const { value } = e.detail
    this.setData({
      textValue: value
    })
  },
  async handleFormSubmit() {
    const { textValue, chooseImages } = this.data
    if (!textValue.trim()) {
      await showToast({
        title: "问题描述不能为空"
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });
    if(chooseImages.length !=0){
      chooseImages.forEach((v, i) => {
        var upTask = wx.uploadFile({
          url: 'https://images.ac.cn/',
          filePath: v,
          name: 'file',
          formData: {
          },
          success: (res) => {
            //图床接口用不了 所以用假数据 模拟获取的外网链接
            const url = 'https://ae01.alicdn.com/kf/H55244c722ba74c11b8681dd2b1a10e6aU.jpg'
            this.UpLoadImgs.push(url)
            //外网图片链接全部都获取到后才触发
            if (i == chooseImages.length - 1) {
              // console.log('将文本域内容和外网图片数组 上传到服务器中')
              //所有都提交成功
              //重置清空数据
              wx.hideLoading();
              this.setData({
                chooseImages: [],
                textValue: ''
              })
              this.UpLoadImgs=[]
              //跳转 到上一个页面
              wx.navigateBack({
                delta: 1
              });
            }
          }
        });
      })
    }else{
      // console.log('只提交了文本')
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      });
    }
  }
})
