const BASE_URL = 'http://localhost:8082'
/**
 * 这是一个promise的 request
 * @param {Object} payload 会进行解构  */
export const myRequest = (payload) =>{
	return new Promise((resolve,reject)=>{
		uni.request({
			...payload,
			url:BASE_URL+payload.url,
			success: res => {
				resolve(res.data.message)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}