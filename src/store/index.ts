// https://pinia.vuejs.org/ 不必采用高级的setup写法
import { createPinia, storeToRefs } from 'pinia'

// 创建
const store = createPinia()

// 不必额外导入，直接使用此方法
export const getStoreRefs = (store: any) => {
  return storeToRefs(store)
}

import { useCategory } from './modules/category'

export interface IAppStore {
  useCategory: ReturnType<typeof useCategory>
}

export const appStore: IAppStore = {
  useCategory: useCategory(store)
} as IAppStore

export default store