<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
})
//rules好像是定规则
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})
//按钮事件
const goBack = () => {
  router.push("/emp")
}
</script>

<template>
  添加员工
  <el-form
    ref="ruleFormRef"
    style="max-width: 400px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="员工姓名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="手机号" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="性别" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio value="Sponsorship">男</el-radio>
        <el-radio value="Venue">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
  
  </el-form>
  <el-button type="primary">保存</el-button>
  <el-button type="success" size="large">保存并继续添加员工</el-button>
  <el-button type="info" @click="goBack">返回</el-button>
</template>

<style scoped></style>
