//定义前后端交互部分，就是基于request
import request from "@/utils/request"
//分页查询
//传入可选参数params防止get请求写死了
export const queryemp = (params?: { page?: number,pageSize?: number,name?: string}) => 
  request.get('/admin/emp/page',{params})//这里边简写了{}和return
//添加员工
export interface empData {
  id: string
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
export const getempById = (id: string) => 
  request.get(`/admin/emp/${id}`)
//删除query参数是啥？这个没弄成可选的没问题吧
export const deleteById = (params:{id: string}) =>
  request.delete('/admin/emp/delete',{params})

//启用、禁用员工账号，这种方法不起效果
// export const startOrStop = (status: string,params:{id: string}) =>
//   request.post(`/admin/emp/status/${status}`,{params})
//使用的是 GET 请求
// Axios 会自动将 params 对象转换为 URL 查询参数
// 最终生成的请求URL类似于：/admin/emp/page?page=1&pageSize=10&name=张三
// GET 请求的 params 选项专门用于构建查询字符串，这是 Axios 的标准行为。
export const startOrStop = (status: string,id: string) =>
  request.post(`/admin/emp/status/${status}?id=${id}`)

//还有方法2
// 启用、禁用员工账号
// export const startOrStop = (status: string, id: string) =>
//   request.post(`/admin/emp/status/${status}`, {}, { params: { id } })
//第一个参数是URL（包含路径参数）
// 第二个参数是请求体（这里传空对象因为我们不需要请求体）
// 第三个参数是配置对象，其中的params会被转换为查询参数
//方法3
// export const startOrStop = (status: string, id: string) =>
//   request({ 
//     url: `/admin/emp/status/${status}`, 
//     method: 'post', 
//     params: { id }
//   })
