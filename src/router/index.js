import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddYasai from '../views/AddYasai.vue'
import UpdeYasai from '../views/UpdeYasai.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddYasai',
    component: AddYasai
  },
  {
    path: '/update',
    name: 'UpdeYasai',
    component: UpdeYasai
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
