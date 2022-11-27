import request from '@/utils/request'
// 获取简单员工信息列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
/* 获取员工列表 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/* 删除功能实现 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
