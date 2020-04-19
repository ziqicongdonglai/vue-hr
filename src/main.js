import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 导入全局样式
import './assets/css/global.css'
// 导入iconfont字体图标库
import './assets/fonts/iconfont.css'

import axios from 'axios'
// //设置后端请求的根路径
// axios.defaults.baseUrl = "http://localhost:8080/api/"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
