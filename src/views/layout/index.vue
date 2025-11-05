<script setup lang="ts">
import { ref, reactive } from 'vue'
import { editpwd, type emppwd } from '@/api/emp.ts'
import router from '@/router'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
//修改密码,这个密码修改是修改登录管理员的密码
//修改密码功能，需要登录后获取管理员密码才能搞现在不能弄，我把右上角修改密码功能，混成修改员工密码了
//确认后正式提交，显示修改成功
//密码限制6-20位字母大小写、阿拉伯数字
// 不符合限制提示“密码格式不符，请输入6-20位字符”
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//话说这个如何确认这个旧密码是否正确？
//还有修改成功弹窗得搞一下
const form = reactive<emppwd>({
  empId: BigInt(0),//empId 被标记为 int64我这要不要改？
  newPassword: '',
  oldPassword: ''
})
//退出登录
const logOut = () => {
  localStorage.removeItem('loginUser')
  router.push('/login')
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header class="header">
        <div class="header-content">
          <!-- 这里以后放logo -->
          <!-- 这也太大了logo -->
          <!-- <img src="@/assets/logo.png" alt="Logo" class="header-logo" /> -->
          <span class="header-text">桔子外卖</span>

        </div>
        <div class="menu-right">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <el-sub-menu index="2">
              <template #title>管理员</template>
              <el-menu-item index="2-1" @click="dialogFormVisible = true">修改密码</el-menu-item>
              <el-menu-item index="2-2" @click="logOut">退出登录</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <!-- 将 el-dialog 移出 el-menu-item，放置在 el-menu 的同级位置,
           组件位置要注意，尤其是同级的，不然可能导致渲染不出来 -->
          <el-dialog v-model="dialogFormVisible" title="修改密码" width="500">
            <el-form :model="form">
              <el-form-item label="原始密码：" :label-width="formLabelWidth">
                <el-input v-model="form.oldPassword" autocomplete="off" />
              </el-form-item>
            </el-form>
            <el-form :model="form">
              <el-form-item label="新密码：" :label-width="formLabelWidth">
                <el-input v-model="form.newPassword" autocomplete="off" />
              </el-form-item>
            </el-form>
            <el-form :model="form">
              <el-form-item label="再次输入：" :label-width="formLabelWidth">
                <el-input v-model="form.newPassword" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                  确认
                </el-button>
              </div>
            </template>
          </el-dialog>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧区域 -->
        <el-aside width="270px">
          <el-scrollbar>
            <el-menu router>

              <el-menu-item index="/dashboard">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>工作台
                </template>
              </el-menu-item>
              <el-menu-item index="/category">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>分类管理
                </template>
              </el-menu-item>
              <el-menu-item index="/dish">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>菜品管理
                </template>
              </el-menu-item>
              <el-menu-item index="/order">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>订单管理
                </template>
              </el-menu-item>
              <el-menu-item index="/order">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>套餐管理
                </template>
              </el-menu-item>
              <el-menu-item index="/order">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>数据统计
                </template>
              </el-menu-item>
              <el-menu-item index="/emp">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon>员工管理
                </template>
              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.header {
  height: 80px;
  background-color: #FFA726;
  /* 桔子颜色 */
  color: white;
  display: flex;
  align-items: center;
  padding-left: 0 20px;
  font-size: 24px;
  font-weight: bold;
  justify-content: space-between
}

/* .header-content {
  display: flex;
  align-items: center;
} */
/* 为将来logo预留空间 */
/* .header-text {
  margin-left: 10px;
 
} */
.menu-right {
  margin-left: auto;
}
</style>
