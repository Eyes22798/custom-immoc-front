import { defineStore } from 'pinia'
import { getCategory } from '@/api/category'
import { CATEGORY_NOMAR_DATA, ALL_CATEGORY_ITEM } from '@/constants/index'

interface Category {
  id: number | string
  name: string
}

interface ICategories {
  categorys: Array<Category>
  currentCategory: Category
}

export const useCategory = defineStore('category', {
  state: (): ICategories => {
    return {
      categorys: CATEGORY_NOMAR_DATA as unknown as Array<Category>,
      currentCategory: { id: 'all', name: '全部' }
    }
  },
  getters: {
    getCategory(): Array<Category> {
      return this.categorys
    },
    /**
     * category选中项下标
     */
    currentCategoryIndex(): number {
      return this.categorys.findIndex((item) => item.id === this.currentCategory.id) ?? 0
    }
  },
  actions: {
    async setCategorys() {
      const { data } = await getCategory()

      this.categorys = [ALL_CATEGORY_ITEM, ...data.categorys]
    },
    /**
     * 切换选中分类
     */
    changeCurrentCategory(newCategory: Category) {
      this.currentCategory = newCategory
    }
  },
  // 开始数据持久化
  persist: {
    key: 'imooc-front', // 修改存储的键名，默认为当前 Store 的 id
    paths: ['category'], // 需要保存的模块
    storage: window.sessionStorage // 存储位置修改为 sessionStorage
  }
})
