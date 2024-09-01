import { defineStore } from 'pinia'
import { getCategory } from '@/api/category'
import { CATEGORY_NOMAR_DATA } from '@/constants/index'

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
      return this.categorys.findIndex((item) => item.id === this.currentCategory?.id)
    }
  },
  actions: {
    async setCategorys() {
      const { data } = await getCategory()

      this.categorys = data.categorys
    },
    /**
     * 切换选中分类
     */
    changeCurrentCategory(newCategory: Category) {
      this.currentCategory = newCategory
    }
  }
})
