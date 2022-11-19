import { getToken, setToken, removeToken } from '@/utils/auth'
import {login} from '@/api/user'
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
const actions = {
  //调用登录接口
  async login(context,data){
    // //调用接口
    const res = await login(data)
    //res就是登录后拿到的信息
    //axios默认加了一层data
    if (res.data.success) {
      // success为true表示登录成功
      context.commit('setToken', res.data.data)
    }
    //.then写法
    // login(data).then(res=>{
    //   if (res.data.success) {
    //     context.commit('setToken', res.data.data)
    //   }
    // })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
