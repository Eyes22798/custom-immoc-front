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

export interface PexelDetail {
  [k: string]: string | number | string[]
  title: string
  photo: string
  url: string
  avatar: string
}

export interface QueryData {
  page: number
  size: number
}

/**
 * 获取pexels列表
 */
export const getPexelsList = (params: QueryData) =>
  request.get<PageData<PexelList>>('/pexels/list', {
    params
  })

/**
 * 获取搜索提示
 */
export const getHint = (params: Record<'q', string>) =>
  request.get<PageData<PexelList>>('/pexels/hit', {
    params
  })

/**
 * 获取推荐主题
 */
export const getThemes = () => request.get<Record<'theme', Array<Record<string, string>>>>('/pexels/themes')

/**
 * 获取详情数据
 */
export const getPexelsFromId = (id: string) => request.get<PexelDetail>(`/pexels/${id}`)
