import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// importing font-awesome icon component, library and free icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import UUID from 'vue3-uuid'

// add font-awesome library
library.add(fas)
const app = createApp(App)
app.use(router)
app.use(UUID)

// register the font-awesome component
app.component('fa-solid', FontAwesomeIcon)

app.mount('#app')
