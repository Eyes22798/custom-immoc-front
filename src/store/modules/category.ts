import { defineStore } from 'pinia'
import { getCategory } from '@/api/category'
import { CATEGORY_NOMAR_DATA } from '@/constants/index'

interface Category {
  id: number
  name: string
}

export const useCategory = defineStore('category', {
  state: (): { categorys: Array<Category> } => {
    return {
      categorys: CATEGORY_NOMAR_DATA as unknown as Array<Category>
    }
  },
  actions: {
    async setCategorys() {
      const { data } = await getCategory()

      this.categorys = data.categorys
    }
  }
})
