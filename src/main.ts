import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'
import router from './router'
import { useREM } from '@/utils/flexible'
import 'virtual:svg-icons-register'
import globalComponents from '@/libs/global'
import useTheme from './utils/theme'

// 初始化主题
useTheme()
useREM()

const app = createApp(App)

app.use(globalComponents)
app.use(router)
app.mount('#app')
