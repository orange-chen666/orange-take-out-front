<script setup lang="ts">
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
      </el-header>
      <el-container>
        <!-- 左侧区域 -->
        <el-aside width="270px">
          <el-scrollbar>
        <el-menu router>
          
          <el-menu-item index="/dashboard">
            <template #title>
              <el-icon><message /></el-icon>工作台
            </template>        
          </el-menu-item>
          <el-menu-item index="/category">
            <template #title>
              <el-icon><message /></el-icon>分类管理
            </template>        
          </el-menu-item>
          <el-menu-item index="/dish">
            <template #title>
              <el-icon><message /></el-icon>菜品管理
            </template>        
          </el-menu-item>
          <el-menu-item index="/order">
            <template #title>
              <el-icon><message /></el-icon>订单管理
            </template>        
          </el-menu-item>
          <el-menu-item index="/order">
            <template #title>
              <el-icon><message /></el-icon>套餐管理
            </template>        
          </el-menu-item>
          <el-menu-item index="/order">
            <template #title>
              <el-icon><message /></el-icon>数据统计
            </template>        
          </el-menu-item>
          <el-menu-item index="/emp">
            <template #title>
              <el-icon><message /></el-icon>员工管理
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
  background-color: #FFA726; /* 桔子颜色 */
  color: white;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-size: 24px;
  font-weight: bold;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-text {
  margin-left: 10px; /* 为将来logo预留空间 */
}
</style>
