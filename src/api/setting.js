import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 获取公司详情信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
// 更新角色信息
export function updateRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
