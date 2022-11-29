import PageTools from './PageTools'
import UploadExcel from './uploadExcel'
export default {
  // Vue.use的原理就是调用这个对象的install方法
  install(Vue) {
    //  注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)

    Vue.component('UploadExcel', UploadExcel)
  }
}
