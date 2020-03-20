import { request } from '../../request/index.js'
Page({
  data: {
    goods: [],
    isFocus: false,
    inpValue:''
  },
  TimeId: -1,
  handleCancel(){
    this.setData({
      goods: [],
      isFocus: false,
      inpValue:''
    })
  },
  handleInput(e) {

    //1. 获取输入框值
    const { value } = e.detail
    //2. 检测合法性 判断去除两端空格后的结果
    if (!value.trim()) {
      //不合法 return 不往下执行
      this.setData({
        goods: [],
        isFocus: false
      })
      clearTimeout(this.TimeId)
      return
    }
    this.setData({
      isFocus: true
    })
    //3.准备发送请求获取数据
    //有关异步请求的最好用async函数，但是不能将handleInput函数设为async函数，因为async函数执行完后会返回一个promise,而handleInput事件本身特点就是会用处理函数的返回值替换掉输入框的内容。所以这里把函数单独写出去
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
        this.getSearchRes(value)
    }, 1000);

  },
  //发送请求获取搜索建议的数据
  async getSearchRes(query) {
    const goods = await request({ url: "/goods/qsearch", data: { query } })
    this.setData({
      goods
    })
  }
})