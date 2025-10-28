<script setup lang="ts">
</script>

<template>
 <div class="common-layout">
    <el-container>
      <!-- header -->
      <el-header style="height: 80px;">桔子外卖</el-header>
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
          <el-sub-menu>
            <template #title>
              <el-icon><icon-menu /></el-icon>订单管理
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="/order">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu>
            <template #title>
              <el-icon><setting /></el-icon>分类管理
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="/category">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
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

<style scoped></style>
