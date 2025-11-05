<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { login, type loginData } from '@/api/emp'
//ai了个前端样式


const router = useRouter()
const loginDataRef = ref<FormInstance>()

const form = reactive<loginData>({
  username: '',
  password: ''
})

// 错误次数计数器
const errorCount = ref(0)
const maxAttempts = 5
const lockoutTime = 60 * 60 * 1000 // 1小时

// 检查是否被锁定
//像这种功能是不是需要后端来搞啊
const isLocked = () => {
  const lockoutEndTime = localStorage.getItem('lockoutEndTime')
  if (lockoutEndTime) {
    const remainingTime = parseInt(lockoutEndTime) - Date.now()
    if (remainingTime > 0) {
      return true
    } else {
      // 锁定时间已过，清除记录
      localStorage.removeItem('lockoutEndTime')
      errorCount.value = 0
      
    }
  }
  return false
}

// 设置锁定时间
const setLockout = () => {
  const lockoutEndTime = Date.now() + lockoutTime
  localStorage.setItem('lockoutEndTime', lockoutEndTime.toString())
}

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  // 检查是否被锁定
  if (isLocked()) {
    ElMessage.error('账号锁定，请1小时后重试！')
    return
  }

  // 表单验证组件，这种在前端写的验证真靠谱吗？
  //在代码中只看到了 valid 这个词，
  // 但它实际上是 Element Plus 表单验证回调函数的一个参数，用来指示表单验证的结果。
  //Element Plus 表单验证这么高级？
  await formEl.validate(async (valid) => {
    if (valid) {
      // 这里应该是调用登录 API 的地方
      // 暂时使用模拟登录
      const result: any = await login(form)
      if (result.code == 1) {//因为result没有加: any code爆红
          ElMessage.success('登录成功')
          //存储登录员工信息
          // localStorage.setItem('loginUser', typeof result.data === 'string' ? result.data : JSON.stringify(result.data))
           localStorage.setItem('loginUser', JSON.stringify(result.data))
          // 登录成功后跳转到工作台页面
          router.push('/dashboard')
        } else {
          errorCount.value++
          

          if (errorCount.value >= maxAttempts) {
            // 达到最大错误次数，锁定账号
            setLockout()
            ElMessage.error('账号锁定，请1小时后重试！')
          } else {
            // 显示剩余次数
            const remainingAttempts = maxAttempts - errorCount.value
            ElMessage.error(`输入有误请重试，还剩${remainingAttempts}次！`)
          }
        }
    } else {
      ElMessage.error('账号和密码不能为空')
    }
  })
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">
        <h2>桔子外卖</h2>
        <p>ORANGE TAKE OUT</p>
        <p class="hint">忘记账号密码请联系超级管理员</p>
      </div>

      <el-form ref="loginDataRef" :model="form" class="login-form" @keyup.enter="handleLogin(loginDataRef)">
        <el-form-item prop="username" :rules="[{ required: true, message: '账号不能为空', trigger: 'blur' }]">
          <el-input v-model="form.username" size="large" placeholder="请输入账号" prefix-icon="User" />
        </el-form-item>

        <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]">
          <el-input v-model="form.password" type="password" size="large" placeholder="请输入密码" prefix-icon="Lock"
            show-password />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" class="login-button" @click="handleLogin(loginDataRef)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #fff9f0 0%, #ffe0b2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(255, 167, 38, 0.3);
  background-color: white;
  text-align: center;
}

.login-title h2 {
  margin-bottom: 10px;
  color: #ff7043;
  font-size: 28px;
}

.login-title p {
  margin-bottom: 5px;
  color: #ffa726;
  font-size: 14px;
  letter-spacing: 1px;
}

.login-title .hint {
  margin-top: 20px;
  font-size: 12px;
  color: #999;
}

.login-form {
  margin-top: 30px;
}

.login-button {
  width: 100%;
  background-color: #ff7043;
  border-color: #ff7043;
  margin-top: 20px;
  height: 45px;
  font-size: 16px;
}

.login-button:hover {
  background-color: #ffa726;
  border-color: #ffa726;
}
</style>