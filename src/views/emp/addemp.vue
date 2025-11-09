<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import router from '@/router'
import { addemp, editemp, getempById, type empData } from '@/api/emp'
import { useRoute } from 'vue-router'
//功能待完善,现在只是完成输入正确的表单内容，点击保存就能向数据库添加员工信息
//1.缺少表单验证：在提交前需要先验证表单数据
//2.缺少错误处理：应该处理 API 调用的错误情况
//3.添加表单验证：在提交前调用 validate() 方法
//4.添加错误处理：使用 try-catch 处理可能的错误
//5.完善成功处理：在成功添加后重置表单，以便继续添加新员工
//我建议跟element-plus官网的来我这个empDataRef都没用上

const route = useRoute()
const empDataRef = ref<FormInstance>()

//这里创建了一个 ref，用于引用一个表单组件实例。
// 类型是 FormInstance（通常是 Element Plus 或类似 UI 库的表单类型）。
//empDataRef.value 有值（表单实例存在
const empForm = reactive<empData>({
  //其实有无Partial或者id有没有值也没事，因为后端添加在mapper层没有用的id,
  //但是编辑一定要把id: 0n顶掉不然胡乱编辑了
  id: '',
  idNumber: '',
  name: '',
  phone: '',
  sex: '',
  username: ''
})
// 判断是否为编辑模式
const isEditMode = ref(false)
const currentEmpId = ref<string>('')//(null)设置初值
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
     { required: true, message: '身份证号码不能为空', trigger: 'blur' },
    { min: 18, max: 18, message: '身份证号码长度必须为18位', trigger: 'blur' },
    { pattern: /^\d{17}(\d|x|X)$/, message: '身份证号码不正确', trigger: 'blur' }
  ]
})
//组件挂载时检查是否是编辑模式
onMounted(async () => {
  if (route.query.id) {
    isEditMode.value = true;
    console.log(route.query.id, "route.query.id")
    // 确保我们处理的是字符串而不是数组
    const id = Array.isArray(route.query.id) ? route.query.id[0] : route.query.id;
    if (id) {
      currentEmpId.value = id;
    }
    try {
      // 获取员工详细信息
      const result: any = await getempById(currentEmpId.value)
      if (result.code) {
        const emp = result.data
        empForm.idNumber = emp.idNumber
        empForm.name = emp.name
        empForm.phone = emp.phone
        empForm.sex = emp.sex
        empForm.username = emp.username
      }
    } catch (error) {
      ElMessage.error('获取员工信息失败')
      console.error(error)
    }
  }
})
//按钮事件

const goBack = () => {
  router.push("/emp")
}
//保存并继续添加员工
// const onSubmit = async() => {
//   const result: any = await addemp(
//     empForm
//   )
//   if(result.code) {
//     ElMessage.success("添加员工成功")
//     empForm.idNumber = ''
//     empForm.name = ''
//     empForm.phone = ''
//     empForm.sex = ''
//     empForm.username = ''
//     console.log("添加员工成功")
//   }
// }
//empDataRef.value其实就是FormInstance.我用官方推荐方法
const saveEmp = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      let result: any
      if (isEditMode.value) {
        //编辑功能       
        if (currentEmpId.value !== '') {//绝对要不能为0除非后端自己设置为0，哪怕主键只增id也是从1开始
          result = await editemp({ ...empForm, id: currentEmpId.value })
        }
        if (result.code) {
          ElMessage.success("修改成功")
        }
      } else {
        //添加功能
        result = await addemp(empForm)
        if (result.code) {
          ElMessage.success("添加员工成功")
        }
      }
    } else {
      ElMessage.error("未按要求填写")
      //不需要重置表单防止胡传，校验没通过和valid为false,异步请求不了。
    }
  })
}
const onSubmit1 = async () => {
  const result: any = await addemp(
    empForm
  )
  if (result.code) {
    ElMessage.success("添加员工成功")
    console.log("添加员工成功")
  }

}


</script>
<!-- 注意：在 <el-form-item> 中，prop 属性的值应该对应 rules 对象中的键名 -->
<template>
  <el-form ref="empDataRef" style="max-width: 400px" :model="empForm" :rules="rules" label-width="auto">
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
  <el-button type="primary" @click="saveEmp(empDataRef)">保存</el-button>
  <el-button type="success" size="large" @click="saveEmp(empDataRef)">保存并继续添加员工</el-button>
  <el-button type="info" @click="goBack">返回</el-button>
</template>

<style scoped></style>
