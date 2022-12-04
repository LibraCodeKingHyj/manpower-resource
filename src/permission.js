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
router.beforeEach(async(to, from, next) => {
  nProgress.start() // 开启进度条
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 访问的是登录页 跳到主页
      next('/')
    } else {
      // 其他页面放行
      // 有token且不是登录页
      // 如果当前vuex中有用户的id 标识已经有资料了，就不用获取了 ，没有就获取
      if (!store.state.user.userInfo.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // routes就是筛选得到的动态路由
        // 执行完addrouter必须rosmiisionm
        router.addRoutes(routes) // 添加动态路由到路由表
        next(to.path)// 相当于跳到对应的地址， 相当于多条了一个路由，
      }
      // await后面的代码都是异步的 ，所以一定会等信息获取完成之后再执行next
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
