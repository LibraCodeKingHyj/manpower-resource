import axios from 'axios'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  // 当执行 npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, //根据执行的命令选择是开发环境还是生产环境，选择不同的根地址
  timeout: 5 * 1000
  /* 
    页面一定有基础地址
  */
})
// 请求拦截器(成功和失败的回调函数)
service.interceptors.request.use(
  // 成功的回调
  () => { },
  // 失败的回调函数
  () => { }
)
// 响应拦截器
service.interceptors.response.use(
  // 成功的回调
  (response) => {
    const { success, data, message } = response.data
    //要根据success的成功与否决定接下来的操作
    if (success) {
      return data
    } else {
      //业务错误，进入catch
      Message.error(message) //提示错误消息
      return Promise.reject(new Error(message))//因为没有错误对象，人为提示错误信息
    }
  },
  // 失败的回调
  (error) => {
    //失败提示错误信息
    Message.error(error.Message)
    //返回执行错误，让当前的执行链跳出成功，让请求直接进入catch
    return Promise.reject(error)
  }
)
export default service
