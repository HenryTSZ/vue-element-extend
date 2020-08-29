/*
 * @Author: HenryTSZ
 * @Date: 2020-01-16 15:23:37
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-26 12:16:51
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入封装组件
import packages from 'packages'
Vue.use(packages)

import 'echarts'
import Echarts from 'vue-echarts'
Vue.component('chart', Echarts)

import CanvasPoster from 'vue-canvas-poster'
Vue.use(CanvasPoster)

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
