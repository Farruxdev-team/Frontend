<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
</script>

<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <Header />
    <div class="pt-14">
      <Sidebar />
      <router-view></router-view>
    </div>
  </div>
</template>
