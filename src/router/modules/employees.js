// 员工路由规则
import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [{
    // path为空  表示/employees路由的默认路由
    path: '',
    component: () => import('@/views/employees'), // 路由的懒加载
    meta: {
      title: '员工管理', // 使用title是因为左侧导航读取了这里的title属性
      icon:'people'
    }
  }]
}
