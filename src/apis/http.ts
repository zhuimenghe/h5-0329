import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN
axios.defaults.timeout = 6000

axios.interceptors.request.use(async function(conf){
  return conf
},function(error){
  return Promise.reject(error)
})

axios.interceptors.response.use(function(resp){
  if(resp.data.code !== 200){
    return Promise.reject(resp);
  }
  return resp
},function(error){
  return Promise.reject(error)
})