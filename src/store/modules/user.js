import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 设置token ,初始化vuex的时候，从缓存中读取token
  userInfo: {} // 为什么定义空对象？ 为了防止在getters里面读info里面的变量时会报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给state里面的token
    setToken(token)// 将token同步给缓存
  },
  removeToken(state) {
    state.token = null // 将缓存置空
    removeToken()// 将token同步给缓存
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 调用登录接口
  async login(context, data) {
    // //调用接口
    const res = await login(data)
    // res就是登录后拿到的信息
    // axios默认加了一层data

    // if (data.success) {
    //   // success为true表示登录成功
    //   context.commit('setToken', res.data.data)
    // }
    // 当能走到这里 就证明数据已经获取成功 在响应拦截器已经验证，所以直接commit
    context.commit('setToken', res)
    // .then写法
    // login(data).then(res=>{
    //   if (res.data.success) {
    //     context.commit('setToken', res.data.data)
    //   }
    // })
  },
  // 调用获取用户信息的接口
  async getUserInfo(context) {
    const res = await getUserInfo() // 不包含头像信息
    const baseInfo = await getUserDetailById(res.userId) // 头像信息
    context.commit('setUserInfo', { ...res, ...baseInfo })
    // return res // 为什么返回res 为了给后期做权限的时候用
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
