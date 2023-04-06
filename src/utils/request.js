import axios from 'axios'
import { useStorage } from '@vueuse/core'

const https = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// 添加攜帶 jwt token 的攔截器
https.interceptors.request.use((config) => {
  const token = useStorage('jwt').value
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 添加錯誤攔截器
https.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error(`API Error: ${message}`)
    return Promise.reject(error)
  }
)

export default https
