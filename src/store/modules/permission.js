import { constantRoutes, asyncRoutes } from '@/router'
// 之所以用vuex模块来定义路由，是因为左侧菜单是需要一个响应式的，而直接的路由对象是一个静态的路由。
export default {
  namespaced: true,
  state: {
    routes: [...constantRoutes] // 当前用户拥有所有的路由数据
  },
  mutations: {
    // 定义修改routes的mutation
    // 2.动态路由从哪来，在所有的路由中筛选出来的
    setRoutes(state, newRoutes) {
      state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由的基础上加新的路由
    }
  },
  actions: {
    // 第二个参数menus是权限点数组
    filterRoutes(context, menus) {
      const routes = []
      menus.forEach(item => {
        routes.push(...asyncRoutes.filter(obj => obj.name === item)) // 得到一个数组
      })
      context.commit('setRoutes', routes)
      return routes // 这里return是因为给路由addroutes用的 上面的routes是给左侧导航栏用的
    }
  }
}
