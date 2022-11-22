// 员工路由规则
import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    // path为空  表示/employees路由的默认路由
    path: '',
    component: () => import('@/views/social'),
    meta: {
      title: '社保' // 使用title是因为左侧导航读取了这里的title属性
    }
  }]
}
