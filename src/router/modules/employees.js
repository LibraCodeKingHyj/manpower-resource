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
      icon: 'people'
    }

  },
  {
    path: 'detail/:id', // query传参 动态路由传参
    component: () => import('@/views/employees/detail'),
    hidden: true, // 不在左侧菜单显示
    meta: {
      title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
    }
  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/components/print'),
    hidden: true,
    meta: {
      title: '打印',
      icon: 'people'
    }
  }]
}
