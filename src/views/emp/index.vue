<script setup lang="ts">
//格式化有问题
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, type ComponentSize } from 'element-plus'
import { deleteById, queryemp, startOrStop } from '@/api/emp'
import router from '@/router';

// import axios from 'axios'
//以后全部通requstjin进行异步请求

//页面加载完毕会调用钩子函数

onMounted(() => {
  search();
})
// const search = async () => {
//   const result = await axios.get('http://127.0.0.1:4523/m1/7308750-7037677-default/admin/employee/page');
//   console.log('API Response:', result.data);
//   if(result.data.code == 1) {
//     emplist.value = result.data.data.records;
//   }
// }
//这里js中 == 1 直接去掉
// 表单数据 
// const search = async () => {
//   const result : any = await queryemp();//后面加了:
//   if (result.code) {
//     emplist.value = result.data.records
//   }
// }

const search = async () => {
  try {
    const result: any = await queryemp(
      {
        page: currentPage.value,
        pageSize: pageSize.value,
        name: formInline.user || undefined
      }
    );
    console.log('API Response:', result);
    console.log('emplist数组', ref)
    if (result.code) {
      emplist.value = result.data.records
      total.value = result.data.total
    }
  } catch (error) {
    console.error('请求出错:', error);
  }//遇到跨域问题了(被cors给)阻止了
  // 已被跨源资源共享（CORS）策略阻止：所请求的资源上没有“Access-Control-Allow-Origin”标头。
  //如果没有 try...catch，当 API 请求失败时，错误会向上冒泡，
  // 可能导致整个组件或应用程序出现未处理的异常，影响用户体验。有了这个错误处理机制，即使请求失败，
  // 其他功能仍然可以正常使用。
}
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const onSubmit = () => {
  console.log('submit!')
}
// 表格数据
const emplist = ref([])

// 分页
const total = ref()
const currentPage = ref(1)//默认响应页码
const pageSize = ref(10)
const size = ref<ComponentSize>('default')
const disabled = ref(false)
const background = ref(false)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  search()//重新获取
}
//添加员工
//跟视图有关的的涉及router
const goToAddEmployee = () => {
  router.push('emp/add')//push跳转，注意各个路径别搞错了
}

// 编辑员工
const gotToEditEmp = (row: any) => {
  router.push({
    path: 'emp/add',
    query: {
      id: row.id
    }
  })
}
//删除员工
const delemp = async (row: any) => {
  try {
    // const result: any = await deleteById(row.id)，(row.id)典型错误这是js
    const result: any = await deleteById({ id: row.id })
    if (result.code) {
      ElMessage.success('删除成功')
      search()
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}
//修改员工状态
// const status = async (row: any) => {

//   const result = await startOrStop()
// }

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  search()
}
</script>

<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="员工姓名">
        <el-input v-model="formInline.user" placeholder="请输入员工姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="goToAddEmployee">添加员工</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- scope 是 Element Plus 表格插槽传递的对象，它包含了当前行的所有信息
scope.row 就是当前行对应的实际数据对象，也就是 emplist 数组中的一个元素 -->
  <div>
    <el-table :data="emplist" :border="true" style="width: 100%">
      <el-table-column prop="name" label="员工姓名" width="150" />
      <el-table-column prop="username" label="账号" width="150" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="status" label="账号状态" width="100" />
      <el-table-column prop="updateTime" label="最后操作时间" />
      <el-table-column prop="id" label="操作" width="300">
        <template #default="scope">
          <el-button type="primary" @click="gotToEditEmp(scope.row)">修改</el-button>
          <el-button type="success" >启用</el-button>
          <el-button type="danger" @click="delemp(scope.row)">删除</el-button>
          <!-- handleDelete(scope.row) -->
        </template>

      </el-table-column>
    </el-table>
  </div>
  <div>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

  </div>
</template>

<style scoped></style>
