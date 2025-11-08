<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'

const input = ref('')
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})

const onSubmit = () => {
  console.log('submit!')
}
// 表格数据
interface User {
  date: string
  name: string
  address: string
}
const tableData: User[] = [
  {
    date: '2016-05-04',
    name: 'Aleyna Kutzner',
    address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    address: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    address: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
]

</script>

<template>
  <!-- 查询表单 -->
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="套餐名称">
        <el-input v-model="formInline.user" placeholder="请输入套餐名称" clearable />
      </el-form-item>
      <el-form-item label="套餐分类">
        <el-select v-model="formInline.region" placeholder="请输入套餐分类" clearable>
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="售卖状态">
        <el-date-picker v-model="formInline.date" type="date" placeholder="请选择" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 数据表格 -->
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column label="套餐名称" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="套餐分类" width="120" />
      <el-table-column property="address" label="use show-overflow-tooltip" width="240" show-overflow-tooltip />
      <el-table-column property="address" label="address" />
    </el-table>
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
