import axios from 'axios'
// 创建axios实例
const service = axios.create({
  // 当执行 npm run dev => .env.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, //根据执行的命令选择是开发环境还是生产环境，选择不同的根地址
  timeout: 5 * 1000
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
  () => { },
  // 失败的回调
  () => { }
)
export default service
