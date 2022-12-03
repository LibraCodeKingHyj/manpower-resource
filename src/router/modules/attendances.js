// 员工路由规则
import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  component: Layout,
  children: [{
    // path为空  表示/employees路由的默认路由
    path: '',
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤', // 使用title是因为左侧导航读取了这里的title属性
      icon: 'skill'
    }
  }]
}
