import axios from 'axios'
import { Message } from 'element-ui'
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
// 请求拦截器(成功和失败的回调函数)
service.interceptors.request.use(
  // 成功的回调
  (config) => { return config },
  // 失败的回调函数
  () => { }
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
    // 银行卡插入atm机失败
    // error 是axios处理后的错误对象
    // 失败提示错误信息
    Message.error(error.Message)
    // 返回执行错误，让当前的执行链跳出成功，让请求直接进入catch
    return Promise.reject(error)
  }
)

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
