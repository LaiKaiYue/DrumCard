import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@/../public/js/fontawesome.js'
import './index.css'

createApp(App)
  .provide('store', store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
