import { request } from '@/plugins/axios'

export interface Category {
  id: number
  name: string
  urlname: string
  col: string
}

/**
 * 获取分类列表
 */
export const getCategory = () => request.get<{ categorys: Category[] }>('/category')
