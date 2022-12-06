import Vue from 'vue'
// 管理所有的对象
// const imagerror = {
//   // 会在当前的dom元素插入到节点之后执行
//   inserted(dom, options) {
//     // 当图片有地址，但是地址没有加载成功的时候，会触发一个错误事件 =>onerror
//     dom.onerror = function() {
//       // 图片加载错误
//       dom.src = options.value
//     }
//   }
// }
import store from '@/store'
const directives =
  {
    imagerror: {
      // 会在当前的dom元素插入到节点之后执行
      inserted(dom, options) {
        // 当图片有地址，但是地址没有加载成功的时候，会触发一个错误事件 =>onerror
        dom.src = dom.src || options.value
        dom.onerror = function() {
          // 图片加载错误
          dom.src = options.value
        }
      },
      // 在当前组件更新时作用到组件，数据执行完毕之后执行
      componentUpdated(dom, options) {
        dom.src = dom.src || options.value
      }
    },
    check: {
      inserted(dom, options) {
        store.state.user.userInfo.roles.points.length
      }
    }
  }

Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
// Vue.directive('imagerror', directiveList['imagerror'])
