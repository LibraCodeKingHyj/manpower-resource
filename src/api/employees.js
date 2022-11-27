import request from '@/utils/request'
// 获取简单员工信息列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
