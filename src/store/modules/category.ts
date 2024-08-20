import { defineStore } from 'pinia'
import { getCategory } from '@/api/category'
import { CATEGORY_NOMAR_DATA } from '@/constants/index'

interface Category {
  id: number
  name: string
}

interface ICategories {
  categorys: Array<Category>
}

export const useCategory = defineStore('category', {
  state: (): ICategories => {
    return {
      categorys: CATEGORY_NOMAR_DATA as unknown as Array<Category>
    }
  },
  getters: {
    getCategory(): Array<Category> {
      return this.categorys
    }
  },
  actions: {
    async setCategorys() {
      const { data } = await getCategory()

      this.categorys = data.categorys
    }
  }
})
