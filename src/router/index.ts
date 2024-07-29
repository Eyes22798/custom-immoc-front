import { createRouter, createMemoryHistory } from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import mobileTerminalRoutes from './module/mobile-routes'
import pcTerminalRoutes from './module/pc-routes'

const router = createRouter({
  history: createMemoryHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

export default router
