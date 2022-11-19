import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken() //设置token ,初始化vuex的时候，从缓存中读取token
}
const mutations = {
  setToken(state, token) {
    state.token = token //将数据设置给state里面的token
    setToken(token)//将token同步给缓存
  },
  removeToken(state) {
    state.token = null //将缓存置空
    removeToken()//将token同步给缓存
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
