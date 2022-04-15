// http://52.193.133.155:8888/muzimed_mobile			测试服务器
 // http://192.168.50.62:8888/muzimed_mobile			jsy服务器
 // const BASE_URL = 'http://f513z54511.51vip.biz/muzimed_mobile'
 const BASE_URL = 'http://192.168.50.62:8888/muzimed_mobile'

 export const api = (options) => {
 	const header_tmp = {
 		"Authorization": uni.getStorageSync("token"),
 		'Content-Type': options.contentType || 'application/json'
 	}
 	return new Promise((resolve, reject) => {
 		uni.request({
 			url: BASE_URL + options.url,
 			method: options.method || 'GET',
 			data: options.data || {},
 			header: header_tmp,
 			success: (res) => {
 				if (res.data.code === 20002) {
 					uni.removeStorage({ key: 'openid'})
 					uni.removeStorage({ key: 'token' })
 					uni.removeStorage({ key: 'user' })
					uni.removeStorage({ key: 'shiming' })
 					uni.showModal({
 						title: '登录时效已过期，请重新登录',
 						icon: 'fail',
 						showCancel: false,
 						success: () => {
 							uni.navigateTo({
 								url: '/pages/login/login'
 							})
 						}
 					})
 				} else {
 					resolve(res)
 				}
 			},
 			fail: (err) => {
 				reject(err)
 			}
 		})
 	})
 }
