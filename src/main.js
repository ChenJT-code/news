import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

// 引入vant组件
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
