let contexts = require.context('.', false, /\.vue$/)
// 存储组件列表
const components = contexts
  .keys()
  .map(component => contexts(component).default)
  .map(component => {
    component.install = Vue => {
      Vue.component(component.name, component)
    }
    return component
  })
console.log('components', components)

// 定义 install 方法, 接收 Vue 作为参数. 如果使用 use 注册插件, 则所有的组件都将被注册
const install = Vue => {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.forEach(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  console.log('window', window)
  install(window.Vue)
}
export default {
  // 导出的对象必须具有 install, 才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  ...Object.fromEntries(components.map(component => [component.name, component]))
}
