import { createApp } from 'vue'
import App from './App.vue'

import './main.css'
import router from './router'
import store from './store'
import VueFinalModal from 'vue-final-modal'

createApp(App)
  .use(store)
  .use(router)
  .use(VueFinalModal())
  .mount('#app')
