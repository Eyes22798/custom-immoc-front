import axios from 'axios'

const service = axios.create({
  baseURL: '/api', // process.env.VUE_APP_BASE_API, // url = base api + request url
  timeout: 5000
})

export default service
