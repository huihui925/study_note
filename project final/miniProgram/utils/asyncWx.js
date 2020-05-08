/* promise形式的 getSetting*/
export const getStting = () =>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}
/* promise形式的 openSetting*/
export const openSetting = () =>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}
/* promise形式的 chooseAddress*/
export const chooseAddress = () =>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    })
  })
}
/* promise形式的 showModal*/
export const showModal = (payload) =>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      ...payload,
      success (res) {
        resolve(res.confirm) 
      },
      fail(err){
        reject(err)
      }
    })
  })
}
/* promise形式的 showToast*/
export const showToast = (payload) =>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      icon: 'none',
      mask:true,
      ...payload,
      success (res) {
        resolve(res) 
      },
      fail(err){
        reject(err)
      }
    })
  })
}
/**
 * promise形式的 navigateTo
 * @param {Object} payload 会直接将参数对象解构传入
 */
export const navigateTo = (payload) =>{
  return new Promise((resolve,reject)=>{
    wx.navigateTo({
      ...payload,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}
/**
 * promise形式的 login
 * @param {Object} payload 会直接将参数对象解构传入
 */
export const login = (payload) =>{
  return new Promise((resolve,reject)=>{
    wx-login
    wx.login({
      timeout:10000,
      ...payload,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}
/**
 * promise形式的 requestPayment
 * @param {Object} payload 会直接将参数对象解构传入
 */
export const requestPayment = (payload) =>{
  return new Promise((resolve,reject)=>{
    wx.requestPayment({
      ...payload,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
    });
  })
}

