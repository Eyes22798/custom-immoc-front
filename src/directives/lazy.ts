import { useIntersectionObserver } from '@vueuse/core'

export const lazy = {
  name: 'lazy',
  mounted(el: HTMLImageElement) {
    const imgSrc = el.src
    el.src = ''
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  }
}
