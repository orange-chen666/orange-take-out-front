import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/index.vue'
import CategoryView from '@/views/category/index.vue'
import OrderView from '@/views/order/index.vue'
import LayoutView from '@/views/layout/index.vue'
import LoginView from '@/views/login/index.vue'
import DishView from '@/views/dish/index.vue'
import EmpView from '@/views/emp/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //嵌套路由，解决登录界面嵌入式主界面
  routes: [
    {
      path: '/',
      name: 'main',
      component: LayoutView,
      redirect: '/dashboard',
      children: [
        {path: 'dashboard',
        name: 'dashboard',
        component: DashboardView
        },
        {path: 'category',
        name: 'category',
        component: CategoryView
        },
        {path: 'order',
        name: 'order',
        component: OrderView
        },
        {path: 'dish',
        name: 'dish',
        component: DishView
        },
        {
          path: 'emp',
          name: 'emp',
          component: EmpView
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }


  ]
})

export default router
