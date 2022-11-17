import axios from 'axios'
// 创建axios实例
const service = axios.create()
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
  () => { },
  // 失败的回调
  () => { }
)
export default service
