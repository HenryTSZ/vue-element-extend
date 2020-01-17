import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/:rootPath/:path',
        component: Home
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ 'views/404')
  }
]

const router = new VueRouter({
  routes
})

export default router
