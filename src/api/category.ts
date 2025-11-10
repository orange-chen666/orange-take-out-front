import request from '@/utils/request';
/**
 *
 * 分类管理
 *
 **/
export interface Category {
  id: string
  name: string
  sort: number
  type: number
}
// 查询分类列表接口
export const getCategoryPage = (params?: { page?: number,pageSize?: number,name?: string,type?: number}) => 
  request.get('/admin/category/page',{params})

// 删除当前列的接口
export const deleCategory = (params:{id: string}) =>
  request.delete('/admin/category/delete',{params})

// 修改接口
export const editCategory = (data: Category) => 
  request.put('/admin/category',data)

// 新增接口
export const addCategory = (data: Category) => 
  request.post('/admin/category',data)

// 修改---启用禁用接口
export const startOrStop =(status: string, id: string) =>
   request.post(`/admin/category/status/${status}`, {}, { params: { id } })
