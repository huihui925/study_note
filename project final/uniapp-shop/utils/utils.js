export const timeOut = (m=1000) =>{
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve()
		},m)
	})
	}