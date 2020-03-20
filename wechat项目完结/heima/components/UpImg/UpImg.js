// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgsrc: {
      type: String,
      value: ''
    },
    imgindex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClearImg(e) {
      this.triggerEvent("clear", { imgindex: this.data.imgindex })
    }
  }
})
