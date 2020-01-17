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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: '404' */ 'views/404')
  }
]

const router = new VueRouter({
  routes
})

export default router
