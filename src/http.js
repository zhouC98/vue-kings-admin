import axios from 'axios'
import Vue from  'vue'
import router from  './router'
const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})
//axios请求拦截器
http.interceptors.request.use(function(config){
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token 
  }
  return config;
},function(err){
  return Promise.reject(err)
})
//axios响应拦截器 拦截服务端返回的异常状态码 在页面上提示出来 通过element UI 的$message把错误信息弹出来
http.interceptors.response.use(res=>{
  return res;
},err=>{
  if(err.response.data.message){
    Vue.prototype.$message({
      type:'error',
      message:err.response.data.message
    })
  }
  if(err.response.status == 401){
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http;