//定义前后端交互部分，就是基于request
import request from "@/utils/request"
//分页查询
//传入可选参数params防止get请求写死了
export const queryemp = (params?: { page?: number,pageSize?: number,name?: string}) => 
  request.get('/admin/emp/page',{params})//这里边简写了{}和return

   