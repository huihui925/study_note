/**promise形式的 request
 * @param {Object} params 
 */
let ajaxTime = 0
export const request = (params) => {
  ajaxTime++
  //开启loading
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (error) => {
        reject(error)
      },
      //此函数时不管成功还是失败都会被调用
      complete:()=>{
        ajaxTime--
        //关闭loading
        if(ajaxTime==0){
          wx.hideLoading();
        }
      }
    });
  })
}