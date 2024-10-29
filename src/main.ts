import { createApp } from 'vue'
import '@/assets/styles/style.css'
import App from './App.vue'
import router from './router'
import { useREM } from '@/utils/flexible'
import 'virtual:svg-icons-register'
import globalComponents from '@/libs/global'
import useTheme from './utils/theme'
import * as directives from '@/directives/index'

// 初始化主题
useTheme()
useREM()

const app = createApp(App)

// 全局自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, directives[key as keyof typeof directives])
})

app.use(globalComponents)
app.use(router)
app.mount('#app')
