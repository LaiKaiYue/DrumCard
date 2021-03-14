import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

createApp(App)
  .provide('store', store)
  .use(router)
  .mount('#app')
