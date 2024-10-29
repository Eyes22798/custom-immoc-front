import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import AxiosConfig from '@/config/axiosConfig'
import Cookie from '@/utils/cookie'
import Storage from '@/utils/storage'
import Log from '@/utils/log'
import RouterConfig from '@/config/routerConfig'
import Router from '@/router'
import { cookieKey } from '@/constants'

// 定义状态码处理函数
const handleStatusCode = async (status: number) => {
  if (/^4\d{2}/.test(String(status))) {
    Cookie.clearCookie()
    Storage.clearSessionStorage()
    const toUrl = status === 404 ? RouterConfig.route404 : RouterConfig.route403
    await Router.replace({ path: toUrl })
  } else if (/^3\d{2}/.test(String(status))) {
    await Router.replace({ path: RouterConfig.routeRoot })
  } else if (/^5\d{2}/.test(String(status))) {
    // 处理5xx服务器错误
  }
}

// 记录和显示错误
function errorLog(err: Error) {
  // 添加到日志

  // 打印到控制台
  if (import.meta.env.VITE_NODE_ENV === 'development') {
    Log.danger('>>>>>> Error >>>>>>')
    Log.danger(err)
  }
  // // 显示提示
  // ElMessage({
  //   message: err.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // })
}

// 创建一个错误
function errorCreate(msg: string | undefined) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 定义后端接口code处理函数
const handleResponseCode = (resp: any) => {
  const { code, message } = resp
  if (code === null || code === undefined) {
    return resp
  }
  switch (code) {
    case 0:
      return resp
    case 200:
      return resp
    case 400:
      errorCreate(`${message}`)
      return resp
    default:
      errorCreate(`${message}`)
      return resp
  }
}

// 定义错误消息处理函数
const handleErrorMessage = (status: number) => {
  const messages: { [key: number]: string } = {
    400: '请求错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求地址出错',
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
  }
  return messages[status] || '未知错误'
}

const defaultHeader: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_API, // url = base api + request url
  timeout: AxiosConfig.timeout,
  timeoutErrorMessage: AxiosConfig.timeoutMsg,
  withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest' // 必须为ajax请求
  }
}

const http: AxiosInstance = axios.create(defaultHeader)

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 设置 token
    if (Cookie.getCookie(cookieKey.token)) {
      // @ts-ignore
      config.headers['token'] = 'Bearer ' + Cookie.getCookie(cookieKey.token)
      // @ts-ignore
      config.headers['Authorization'] = 'Bearer ' + Cookie.getCookie(cookieKey.token)
    }

    if (config.method?.toLowerCase() === 'get' && config.data) {
      config.params = config.data
    }
    return config
  },
  async (error) => {
    const config = error.config
    if (!config || !config.retry) return Promise.reject(error)
    // 失败后重试多少次
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) return Promise.reject(error)
    config.__retryCount += 1
    const backOff = new Promise((resolve: any) => {
      setTimeout(() => {
        resolve()
      }, AxiosConfig.timeout || 1)
    })
    await backOff
    return axios(config)
  }
)

// 响应拦截器
http.interceptors.response.use(
  async (response: AxiosResponse) => {
    const resp = response.data || null
    const status = response.status || 200

    if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
      return response.data
    }

    await handleStatusCode(status)

    return handleResponseCode(resp)
  },
  async (error) => {
    if (error && error.response) {
      const errorMessage = handleErrorMessage(error.response.status)
      error.message = errorMessage

      if (!Cookie.getCookie(cookieKey.token)) {
        await Router.replace({ path: RouterConfig.routeLogin })
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default http
