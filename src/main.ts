import { createApp } from 'vue'
import { createPinia } from 'pinia'
//Pinia 是 Vue.js 的状态管理库，是 Vuex 的现代化替代方案

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)

app.mount('#app')
