import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/dashboard/index.vue'
import Cetegory from '@/views/category/index.vue'
import Oreadr from '@/views/order/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //嵌套路由，解决登录界面嵌入式主界面
  routes: [
    {path: '/dashboard',name: 'dashboard',component: Dashboard},
    {path: '/category',name: 'category',component: Cetegory},
    {path: '/order',name: 'order',component: Oreadr}
  ]
})

export default router
