import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 1.5 * 3600 * 1000
// 创建axios实例
const service = axios.create({
  // 当执行 npm run dev => .env.development => /api => 跨域代理
  // 根据执行的命令选择是开发环境还是生产环境，选择不同的根地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5 * 1000
  /*
    页面一定有基础地址
  */
})
// 请求拦截器(成功和失败的回调函数)------>就是为了对请求配置(config)进行加工
service.interceptors.request.use(
  // 成功的回调
  // token注入
  config => {
    // 判断token是否存在
    if (store.getters.token) {
      // 判断token是否超时
      if (checkTimeOut()) {
        // token
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('身份信息过期'))
      }
      // 存在的话进行token注入
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    // 返回config配置
    return config
  },
  // 失败的回调函数
  error => Promise.reject(error)
)
// 响应拦截器
service.interceptors.response.use(
  // 成功的回调
  (response) => {
    // 银行卡插入atm机成功
    // response 是axios处理后的结果
    const { success, data, message } = response.data
    // 要根据success的成功与否决定接下来的操作
    if (success) {
      // 取钱成功
      // 业务处理成功
      return data
    } else {
      // 钱不够
      // 业务错误，进入catch
      // 提示错误消息
      Message.error(message)
      // 因为没有错误对象，人为提示错误信息
      return Promise.reject(new Error(message))
    }
  },
  // 失败的回调
  (error) => {
    // error信息里面有response的对象
    if (error?.response?.data.code === 10002) {
      // code===10002标识token超时(后端告诉我们超时了)
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      // 银行卡插入atm机失败
      // error 是axios处理后的错误对象
      // 失败提示错误信息
      Message.error(error.message)
      // 返回执行错误，让当前的执行链跳出成功，让请求直接进入catch
    }
    return Promise.reject(error)
  }
)

// 检查token是否超时的方法
function checkTimeOut() {
  return Date.now() - getTimeStamp() > TimeOut
}

export default service

/*
  响应拦截器{
    成功回调(response){
      // 接口相应成功
        判断data里面的success是否成功
        成功：返回数据
        失败：抛出错误对象
    }
    失败的回调(error){
      //接口调用失败
      返回错误对象
    }
  }
*/
