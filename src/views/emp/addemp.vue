<script setup lang="ts">
import { reactive, ref } from 'vue'

import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import router from '@/router'
import{ addemp, type empData } from '@/api/emp'
//功能待完善,现在只是完成输入正确的表单内容，点击保存就能向数据库添加员工信息
//1.缺少表单验证：在提交前需要先验证表单数据
//2.缺少错误处理：应该处理 API 调用的错误情况
//3.添加表单验证：在提交前调用 validate() 方法
//4.添加错误处理：使用 try-catch 处理可能的错误
//5.完善成功处理：在成功添加后重置表单，以便继续添加新员工
//我建议跟element-plus官网的来我这个empDataRef都没用上


const empDataRef = ref<FormInstance>()
const empForm = reactive<empData>({
  idNumber: '',
  name: '',
  phone: '',
  sex: '',
  username: ''
})
//rules好像是定规则
const rules = reactive<FormRules<empData>>({
 username: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '账号输入不符，请输入3-20个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '账号只能包含字母大小写和阿拉伯数字', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '员工姓名不能为空', trigger: 'blur' },
    { min: 1, max: 12, message: '员工姓名长度应在1-12个字符之间', trigger: 'blur' },
    { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '员工姓名只能包含汉字、字母大小写', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '性别不能为空', trigger: 'change' }
  ],
  idNumber: [
    { min: 18, max: 18, message: '身份证号码长度必须为18位', trigger: 'blur' },
    { pattern: /^\d{17}(\d|x|X)$/, message: '身份证号码不正确', trigger: 'blur' }
  ]
})
//按钮事件
const goBack = () => {
  router.push("/emp")
}
//保存并继续添加员工
const onSubmit = async() => {
  const result: any = await addemp(
    empForm
  )
  if(result.code) {
    ElMessage.success("添加员工成功")
    empForm.idNumber = ''
    empForm.name = ''
    empForm.phone = ''
    empForm.sex = ''
    empForm.username = ''
    console.log("添加员工成功")
  }
  
}
const onSubmit1 = async() => {
  const result: any = await addemp(
    empForm
  )
  if(result.code) {
    ElMessage.success("添加员工成功")
    console.log("添加员工成功")
  }
  
}


</script>
<!-- 注意：在 <el-form-item> 中，prop 属性的值应该对应 rules 对象中的键名 -->
<template>
  添加员工
  <el-form
    ref="empDataRef"
    style="max-width: 400px"
    :model="empForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="empForm.username" />
    </el-form-item>
    <el-form-item label="员工姓名" prop="name">
      <el-input v-model="empForm.name" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="empForm.phone" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="empForm.sex">
        <el-radio value="男">男</el-radio>
        <el-radio value="女">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="身份证号" prop="idNumber">
      <el-input v-model="empForm.idNumber" />
    </el-form-item>
  
  </el-form>
  <el-button type="primary" @click="onSubmit1">保存</el-button>
  <el-button type="success" size="large" @click="onSubmit">保存并继续添加员工</el-button>
  <el-button type="info" @click="goBack">返回</el-button>
</template>

<style scoped></style>
