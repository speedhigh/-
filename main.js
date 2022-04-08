import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import { api } from '@/until/api.js'
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
...App
})
app.$mount() //挂载 Vue 实例