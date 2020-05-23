// 1 引入vue
import Vue from 'vue'

// 2 引入vue-router
import VueRouter from 'vue-router'

// 引入路由所映射的组件
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import PersonalCenter from '@/views/personalCenter.vue'

// 3初始化路由
Vue.use(VueRouter)

// 4 创建路由对象
var router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'PersonalCenter',
      path: '/personal/:id',
      component: PersonalCenter
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path.indexOf('/personal/') === 0) {
    const token = localStorage.getItem('news_Authorization')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

// 6 暴露
export default router
