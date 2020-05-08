import Vue from 'vue'
import App from './App'
import {
	myRequest
} from './request/ajax.js'
Vue.config.productionTip = false
Vue.prototype.$myRequest = myRequest
App.mpType = 'app'

Vue.filter("timeFormat", (data) => {
	return new Date(data).toLocaleDateString().replace(/\//g, '-')
})
const app = new Vue({
	...App
})
app.$mount()
