import request from '@/utils/request'

// 登录接口
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/*
  获取用户信息
*/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
  return request({
    // {}或者冒号:这种形式，代表表达是一个动态路径的url
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
