import axios from 'axios';
import { useUserStore } from '@/stores/user';

const api = axios.create({
  baseURL:import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

apiAuth.interceptors.response(res => res, async error => {
  if (error.response) {
    if (error.response.data.message === '登入過期' && error.config.url !== '/user/refresh') {
      const user = useUserStore()
      try {
        const { data } = await apiAuth.patch('/user/refresh')
        user.token = data.result
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export const useAxios = () => {
  return { api, apiAuth }
}
