// https://pinia.vuejs.org/ 不必采用高级的setup写法
import { createPinia, storeToRefs } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export interface IAppStore {
  useCategory: ReturnType<typeof useCategory>
  useTheme: ReturnType<typeof useTheme>
  useApp: ReturnType<typeof useApp>
  useSearch: ReturnType<typeof useSearch>
}

// 创建
const store = createPinia()
store.use(piniaPluginPersistedstate)

// 不必额外导入，直接使用此方法
export const getStoreRefs = (store: any) => {
  return storeToRefs(store) as any
}

import { useCategory } from './modules/category'
import { useTheme } from './modules/theme'
import { useApp } from './modules/app'
import { useSearch } from './modules/search'

export const appStore: IAppStore = {
  useCategory: useCategory(store),
  useTheme: useTheme(store),
  useApp: useApp(store),
  useSearch: useSearch(store)
} as IAppStore

export default store
