import { useUserStore } from "@/stores/user";
import axios from "axios";

const api = axios.create({
  baseURL:import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.Authorization = 'Bearer' + user.token
  return config
})

export const useAxios = () => {
  return { api, apiAuth }
}
