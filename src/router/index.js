import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout.vue'
import CutPaper from '../views/CutPaper.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children:[
      {
        path:"/cutpaper",
        name:"cutpaper",
        component:CutPaper
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
