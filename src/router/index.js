import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/Layout.vue'
import CutPaper from '../views/CutPaper.vue'
import MoveTransfer from '../views/MoveTransfer.vue'
import OldImgRepair from '../views/OldImgRepair.vue'
import OperaTransfer from '../views/OperaTransfer.vue'
import MusicTransfer from '../views/MusicTransfer.vue'
import PuppetTransfer from '../views/PuppetTransfer.vue'


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
      },
      {
        path:"/movetransfer",
        name:"movetransfer",
        component:MoveTransfer
      },
      {
        path:"/oldimgrepair",
        name:"oldimgrepair",
        component:OldImgRepair
      },
      {
        path:"/operatransfer",
        name:"operatransfer",
        component:OperaTransfer
      },
      {
        path:"/puppettransfer",
        name:'puppettransfer',
        component:PuppetTransfer
      },
      {
        path:"/musictransfer",
        name:'musictransfer',
        component:MusicTransfer
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
