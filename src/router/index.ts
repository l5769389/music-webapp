import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/index.vue';
import Rank from '../views/Rank/index.vue';
import Singer from '../views/Singers/index.vue';
import Column from '@/views/Column/index.vue';
import My from '@/views/my/index.vue';
import Search from '@/views/search/index.vue';
import Layout from '../layout/index.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:'/rank',
        name:'Rank',
        component:Rank,
      },
      {
        path:'/singer',
        name:'Singer',
        component:Singer,
      },
      {
        path:'/',
        name:'Home',
        component:Home,
      },
    ]
  },
  {
    path:'/column/:id',
    name:'Column',
    component:Column,
  },
  {
    path:'/my',
    name:'My',
    component:My,
  },
  {
    path:'/search',
    name:'Search',
    component:Search
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
