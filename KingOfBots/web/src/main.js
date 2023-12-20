import { createApp } from 'vue'
import App from './App.vue'

// we import the vue router from our router/index.js file
import router from './router'

import store from './store'

document.title='King Of Bots';
createApp(App).use(store).use(router).mount('#app')
