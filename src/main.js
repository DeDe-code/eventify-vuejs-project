import '@fontsource/roboto/100.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// importing font-awesome icon component, library and free icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// add font-awesome library
library.add(fas, fab)
const app = createApp(App)
app.use(router)

// register the font-awesome component
app.component('fa', FontAwesomeIcon)

app.mount('#app')
