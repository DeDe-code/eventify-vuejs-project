import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// importing font-awesome icon component, library and free icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

// add font-awesome library
library.add(fas, faGoogle)
const app = createApp(App)
app.use(router)

// register the font-awesome component
app.component('fa-solid', FontAwesomeIcon)

app.mount('#app')
