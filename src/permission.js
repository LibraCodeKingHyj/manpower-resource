// 避免从url进入系统

import router from './router'
import store from './store' // 引入store实例
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进入条样式
// 前置路由守卫
// to到哪去
// from从哪里来
// next()放行
// next(false)跳转终止
// naxt(地址)跳转到某个地址

// 定义白名单地址
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nProgress.start() // 开启进度条
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 访问的是登录页 跳到主页
      next('/')
    } else {
      // 其他页面放行
      next()
    }
  } else {
    // 无token
    if (whiteList.includes(to.path)) {
      // 要去的地址在白名单
      next()
    } else {
      // 不在跳转登录页
      next('/login')
    }
  }
  nProgress.done() // 手动强制关闭进度条 解决手动切换地址时，进度条不关闭的问题
})
// 后置路由守卫
router.afterEach(() => {
  nProgress.done() // 关闭进度条
})
