<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
              <el-menu-item index="2-1">修改密码</el-menu-item>
              <el-menu-item index="2-2">退出登录</el-menu-item>
            </el-sub-menu>
          </el-menu>
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
