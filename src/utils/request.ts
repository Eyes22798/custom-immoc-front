import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base api + request url
  timeout: 5000
})

// 请求拦截器

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.log(error)
  }
)

export default service
