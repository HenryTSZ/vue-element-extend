import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'echarts'
import Echarts from 'vue-echarts'
Vue.component('chart', Echarts)

import 'assets/iconfont/iconfont.css'
import 'assets/reset.css'
import 'assets/style.less'

import utils from 'utils'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
