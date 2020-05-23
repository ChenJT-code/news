import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'

// 引入重置样式
import '@/styles/reset.less'

// 引入icon图标
import '@/assets/icon/iconfont.css'

// 引入vant组件
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
