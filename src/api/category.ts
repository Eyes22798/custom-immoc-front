import request from '@/utils/request'

/**
 * 获取分类列表
 */
export const getCategory = async () => {
  return request({
    url: '/category',
    method: 'get'
  })
}
