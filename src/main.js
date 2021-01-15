import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import VueFinalModal from 'vue-final-modal'
import VueTippy from 'vue-tippy'

import './main.css'
import 'tippy.js/animations/scale.css'

createApp(App)
  .use(store)
  .use(router)
  .use(VueTippy)
  .use(VueFinalModal())
  .mount('#app')
