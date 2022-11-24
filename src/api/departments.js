import request from '@/utils/request'
// 获取部门信息
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除部门
export function delDpartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 新增部门
export function addDpartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
