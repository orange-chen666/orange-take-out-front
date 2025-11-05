import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
//发起请求拦截响应
//创建实例
const request = axios.create({
  baseURL : '/api',//带api访问后端，不带就访问静态资源
  timeout : 60000
})
//axios 的响应response 拦截器
request.interceptors.request.use(
  (config) => {
    console.log(config,'config')
    //获取token，添加到请求头
    console.log(localStorage.getItem('loginUser'),'loginUser')
    const loginUserObj = localStorage.getItem('loginUser');
    if (loginUserObj) {
      const loginUser: any = JSON.parse(loginUserObj);
      if (loginUser && loginUser.token) {
       config.headers.token = loginUser.token
       //将token值放在一个名为"token"的自定义HTTP请求头中后端需要通过读取名为"token"的请求头来获取认证信息
        // config.headers.Authorization = `Bearer ${loginUser.token}`
        // //和上面功能意义只是好像比较标准，不行垃圾代码，sbAi差点用了，这玩意放进Authorization我提取token都提取不到
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
  //return Promise.reject(error) 是一种在 Promise 链中传递错误的机制。它的作用是：

// 保持错误传播：当在 Promise 链中捕获到一个错误时，如果不处理它或者想把它传递给下一个错误处理程序，
// 就需要使用 Promise.reject(error)。
// 维持异步错误处理流程：在 axios 拦截器中，如果发生了错误，使用 return Promise.reject(error) 
// 可以确保调用该 API 的地方能够通过 .catch() 或者 try/catch 捕获到这个错误。
  //如果你不使用 return Promise.reject(error)，而是简单地 console.log(error) 
  // 或者什么都不做，那么调用 API 的地方就无法知道发生了错误，也无法进行相应的错误处理。


)
//esponse和config有啥区别,
//还必须返回 config和response
//成功回调的意义有啥？
request.interceptors.response.use(
  (response) => {//成功回调
    console.log(response)
    console.log(response.data)
    return response.data//简化代码
  },
  (error) => {
    console.log(error,'error')
    if (error.status === 401) {//全等//== 是会进行隐式类型转换
      ElMessage.error('登录超时，请重新登录')
      router.push('/login')
    } else {
      ElMessage.error('接口访问失败')
    }
    return Promise.reject(error)
  },
)
//axios 响应response拦截器

export default request