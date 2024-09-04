import { request } from '@/plugins/axios'

export interface PageData<T> {
  list: T[]
  page: number | string
  size: number | string
  total: number
}

export interface PexelList {
  [k: string]: string | number | string[]
  id: number
  tags: string[]
}

export interface QueryData {
  page: number
  size: number
}

/**
 * 获取pexels列表
 */
export const getPexelsList = (params: QueryData) => request.get<PageData<PexelList>>('/pexels/list', { params })
