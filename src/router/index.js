// 1 引入vue
import Vue from 'vue'

// 2 引入vue-router
import VueRouter from 'vue-router'

// 引入路由所映射的组件
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import PersonalCenter from '@/views/personalCenter.vue'
import EditPersonal from '@/views/editPersonal.vue'
import Index from '@/views/index.vue'

// 3初始化路由
Vue.use(VueRouter)

// 4 创建路由对象
var router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'default',
      path: '/',
      // 默认打开index首页，为了提高用户体验
      redirect: { name: 'Index' }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'PersonalCenter',
      path: '/personal/:id',
      component: PersonalCenter
    },
    {
      name: 'EditPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    }
  ]
})

// 5. 添加路由导航的前置守卫
// to:跳转的目的地路由
// from:从那里来
// next:继续管道中下一个操作--钩子
router.beforeEach((to, from, next) => {
  // 当你访问一些需要授权的页面时，判断是否有登陆的标识，如果有，就继续访问，否则就重定向到登陆页
  // 所有路由跳转都会经过这个守卫
  // console.log(to)
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
