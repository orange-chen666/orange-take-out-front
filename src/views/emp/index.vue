<script setup lang="ts">
//格式化有问题
import { reactive, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
// 表单数据
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const onSubmit = () => {
  console.log('submit!')
}
// 表格数据
const tableData = [
  {
    date: '',
    name: '管理员',
    address: '',
  },
  {
    date: '',
    name: '管理员',
    address: '',
  },
  {
    date: '',
    name: '管理员',
    address: '',
  },
  {
    date: '',
    name: '管理员',
    address: '',
  },
]
// 分页
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
const background = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工姓名">
        <el-input v-model="formInline.user" placeholder="请输入员工姓名" clearable />
     </el-form-item>
     <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加员工</el-button>
    </el-form-item>
    </el-form>
  </div>
  <div>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="员工姓名" width="180" />
    <el-table-column prop="name" label="账号" width="150" />
    <el-table-column prop="address" label="手机号" width="180" />
    <el-table-column prop="address" label="账号状态" width="100" />
    <el-table-column prop="address" label="最后操作时间" width="100" />
    <el-table-column prop="address" label="操作" > 
      <template #default="scope">
        <el-button type="primary">修改</el-button>
        <el-button type="success">启用</el-button>
        <el-button type="danger">删除</el-button>
      </template>

    </el-table-column>
    </el-table>
  </div>
  <div>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<style scoped></style>
