<script setup lang="ts">
import { deleCategory, getCategoryPage, startOrStop, type Category } from '@/api/category'
import router from '@/router'
import { ElMessage, type ComponentSize } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'
/**
 * 分类管理
 * 这个页面和员工管理几乎一样
 */
const formInline = reactive({
  name: '',
  type: '',
  id: '',
  sort: 0
})
//钩子函数
onMounted(() => {
  search();
})
const categorylist = ref([])
//分页查询
const search = async () => {
  try {
    const result: any = await getCategoryPage(
      {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: formInline.name || undefined,
        type: formInline.type ? Number(formInline.type) : undefined
      }
    );
    console.log('API Response:', result);
    console.log('category数组', ref)
    if (result.code) {
      categorylist.value = result.data.records
      total.value = result.data.total
    }
  } catch (error) {
    console.error('请求出错:', error);
  }
}
// 表格数据
interface User {
  date: string
  name: string
  address: string
}
// 分页
const total = ref()
const currentPage = ref(1)//默认响应页码
const pageSize = ref(10)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
const background = ref(false)
//添加分类
//跟视图有关的的涉及router
const goToAddEmployee = () => {
  router.push('emp/add')//push跳转，注意各个路径别搞错了
}

// 编辑分类
const gotToEditEmp = (row: any) => {
  router.push({
    path: 'emp/add',
    query: {
      id: row.id
    }
  })
}
//删除分类
const delemp = async (row: any) => {
  try {
    // const result: any = await deleteById(row.id)，(row.id)典型错误这是js
    const result: any = await deleCategory({ id: row.id })
    if (result.code) {
      ElMessage.success('删除成功')
      search()
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}
//修改状态
const setStatus = async (row: any) => {
  const newsatus = row.status === 1 ? '0' : '1'
  console.log(newsatus, '新状态')
  const result: any = await startOrStop(newsatus, row.id)
  try {
    if (result.code == 1) {
      ElMessage.success('状态修改成功')
      search()
    }
  } catch (error) {
    ElMessage.error('状态修改失败')
  }
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  search()//重新获取
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  search()
}
</script>

<template>
  <!-- 查询表单 -->
  <!-- <el-option label="菜品分类" value="1" /> - 这样绑定的是字符串 "1"
<el-option label="菜品分类" :value="1" /> - 这样绑定的是数字 1 -->
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="分类名称">
        <el-input v-model="formInline.name" placeholder="请输入分类名称" clearable />
      </el-form-item>
      <el-form-item label="分类类型">
        <el-select v-model="formInline.type" placeholder="请选择分类类型" clearable>
          <el-option label="菜品分类" value="1" />
          <el-option label="套餐分类" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="search">新增菜品分类</el-button>
        <el-button type="primary" @click="search">新增套餐分类</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 数据表格 -->
  <div>
    <el-table :data="categorylist" :border="true" style="width: 100%">
      <el-table-column prop="name" label="分类名称" width="150" />
      <el-table-column prop="type" label="分类类型" width="150">
        <template #default="scope">
          <span>{{ scope.row.type === 1 ? '菜品分类' : '套餐分类' }}</span>
        </template>
      </el-table-column> />
      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <span>{{ scope.row.status === 1 ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="操作时间" />
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button type="primary" @click="gotToEditEmp(scope.row)">修改</el-button>
          <el-button type="success" @click="setStatus(scope.row)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
          <el-button type="danger" @click="delemp(scope.row)">删除</el-button>
          <!-- handleDelete(scope.row) -->
        </template>

      </el-table-column>
    </el-table>
  </div>
  <!-- 分页 -->
  <div>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  </div>
</template>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
