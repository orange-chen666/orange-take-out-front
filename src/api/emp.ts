//定义前后端交互部分，就是基于request
import request from "@/utils/request"
//分页查询
//传入可选参数params防止get请求写死了
export const queryemp = (params?: { page?: number,pageSize?: number,name?: string}) => 
  request.get('/admin/emp/page',{params})//这里边简写了{}和return
//添加员工
export interface empData {
  id: bigint
  idNumber: string
  name: string
  phone: string
  sex: string
  username: string
}
export const addemp = (data: empData) => 
  request.post('/admin/emp',data)   
 //修改密码
export interface emppwd {
  empId:  BigInt//empId 被标记为 int64
  newPassword: string
  oldPassword: string
}
export const editpwd = (data: emppwd) =>
  request.put('/admin/emp/editPassword',data)
//修改员工
export const editemp = (data: empData) => 
  request.put('/admin/emp',data)
//员工登录
export interface loginData {
  password: string
  username: string
}
export const login = (data: loginData) =>
  request.post('/admin/emp/login',data)

// 根据ID获取员工信息
export const getempById = (id: bigint) => 
  request.get(`/admin/emp/${id}`)
//删除query参数是啥？这个没弄成可选的没问题吧
export const deleteById = (params:{id: bigint}) =>
  request.delete('/admin/delete',{params})