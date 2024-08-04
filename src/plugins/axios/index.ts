import type { AxiosRequestConfig } from 'axios'
import http from './http'

export interface Response<T = any> {
  message: string
  code: number
  data: T
  success: boolean
}

export const request = {
  post<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return http.post(url, data, config)
  },
  put<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return http.put(url, data, config)
  },
  get<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return http.get(url, config)
  },
  delete<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return http.delete(url, config)
  }
}
