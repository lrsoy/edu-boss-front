import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// 使用传统方式引入课程组件 必然被访问的组件使用传统方式进行引入
import Course from '@/views/course/index'

Vue.use(VueRouter)

const routes = [
  {
    // 登录组件
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index')
  },
  {
    // 课程组件
    path: '/',
    name: 'course',
    component: Course
  },
  {
    // 学习页面
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: "learn" */ '../views/learn/index'),
    // 设置路由源信息，标记当前页面取药登录
    meta: { requiresAuth: true }
  },
  {
    // 用户组件
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    // 设置页面
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: "courseinfo" */ '../views/course-info'),
    props: true
  },
  {
    // 设置页面
    path: '/Coursevideo/:lessonId',
    name: 'Coursevideo',
    component: () => import(/* webpackChunkName: "Coursevideo" */ '../views/course-info/Coursevideo'),
    props: true
  },
  {
    // 支付页面
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: "error-page" */ '../views/pay'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    // 错误页面
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: "error-page" */ '../views/error-page/index')
  },
  {
    // 设置页面
    path: '/user/UserSetting',
    name: 'UserSetting',
    component: () => import(/* webpackChunkName: "UserSetting" */ '../views/user/UserSetting')
  }
]

const router = new VueRouter({
  routes
})

// ( 一 ) 设置导航守卫，对登录进行检测
router.beforeEach((to, from, next) => {
  // - 判断去的页面是不是需要登录（验证to属性）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // - 验证vuex的store中的储存的登录信息
    if (!store.state.user) {
      // - 验证没有信息，就跳转到登录页面
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    // - 如果不需要，就继续向下
    next()
  } else {
    // 如果不需要，就想下继续展示
    next()
  }
})

export default router
