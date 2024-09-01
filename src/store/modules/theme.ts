import { defineStore } from 'pinia'
import { THEME_LIGHT } from '@/constants'

export const useTheme = defineStore('theme', {
  state: () => {
    return {
      // 主题模式
      themeType: THEME_LIGHT
    }
  },
  getters: {
    // 获取主题模式
    getThemeType(): string {
      return this.themeType
    }
  },
  actions: {
    /**
     *  切换主题模式
     */
    changeThemeType(newTheme: string) {
      this.themeType = newTheme
    }
  }
})
