import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 注册全局自定义指令
import '@/directives'
import checkPermission from '@/mixin/checkPermission'
Vue.mixin(checkPermission)
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import * as filters from '@/filters' // 引入工具类
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// 注册打印的插件
import Print from 'vue-print-nb'
Vue.use(Print)
Vue.config.productionTip = false
import Component from '@/components'
Vue.use(Component)
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this // 事件总线
  },
  render: h => h(App)
})
