import svgIcon from '@/components/svg-icon/index.vue'

const allGlobalComponents: any = {
  svgIcon
}

export default {
  install(Vue: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      Vue.component(key, allGlobalComponents[key])
    })
  }
}
