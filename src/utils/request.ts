import axios from "axios";
//发起请求拦截响应
//创建实例
const request = axios.create({
  baseURL : '/api',//带api访问后端，不带就访问静态资源
  timeout : 60000
})
//axios 的响应response 拦截器
request.interceptors.response.use(
  (response) => {//成功回调
    return response.data//简化代码
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request