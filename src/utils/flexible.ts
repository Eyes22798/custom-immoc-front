import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '../constants'

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  const { width } = useWindowSize()
  return (
    width.value < PC_DEVICE_WIDTH &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
})
