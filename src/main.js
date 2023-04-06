
import { createApp } from 'vue'
import App from './App.vue'
import { stores } from './stores'
import router from './router'
import globalDirectives from '@/directives'
import globalErrorPlugin from '@/plugins/globalErrorPlugin'
import '@/assets/scss/main.scss'

const app = createApp(App)

app.use(globalDirectives)
app.use(globalErrorPlugin)
app.use(router)
app.use(stores)
app.mount('#app')
