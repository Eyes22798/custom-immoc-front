import { ALL_CATEGORY_ITEM } from '@/constants'

import { defineStore } from 'pinia'

export const useApp = defineStore('app', {
  state: (): Record<string, any> => {
    return {
      // 当前选中的分类
      currentCategory: ALL_CATEGORY_ITEM,
      // 搜索的文本
      searchText: '',
      // 路由跳转类型
      routerType: 'none'
    }
  },
  actions: {
    setDemo(data: IDemoState) {
      this.demo = data
    },
    /**
     * 切换选中分类
     */
    changeCurrentCategory(data: Record<string, any>) {
      this.currentCategory = data
    },
    /**
     * 修改 searchText
     */
    changeSearchText(data: string) {
      this.searchText = data
    },
    /**
     * 修改 routerType
     */
    changeRouterType(data: string) {
      this.routerType = data
    }
  }
})
