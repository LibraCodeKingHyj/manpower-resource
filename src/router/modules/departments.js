// 员工路由规则
import Layout from '@/layout'
export default {
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [{
    // path为空  表示/employees路由的默认路由
    path: '',
    component: () => import('@/views/departments'),
    name: 'departments',
    meta: {
      title: '组织架构', // 使用title是因为左侧导航读取了这里的title属性
      icon: 'tree'
    }
  }]
}
