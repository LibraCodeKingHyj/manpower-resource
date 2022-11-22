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
const directiveList = [
  {
    imagerror: {
      // 会在当前的dom元素插入到节点之后执行
      inserted(dom, options) {
        // 当图片有地址，但是地址没有加载成功的时候，会触发一个错误事件 =>onerror
        dom.onerror = function() {
          // 图片加载错误
          dom.src = options.value
        }
      }
    }
  }
]
directiveList.forEach(item => {
  Vue.directive(Object.keys(item)[0], Object.values(item)[0])
})
// Vue.directive('imagerror', directiveList['imagerror'])
