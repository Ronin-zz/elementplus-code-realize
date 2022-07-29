import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ElMessage } from '@/components/ElMessage'

const app = createApp(App)
app.use(router)
app.use(ElMessage)
app.mount('#app')
