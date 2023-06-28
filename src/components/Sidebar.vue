<script setup>
import { menu } from '@/constants/menu'
import { onMounted } from 'vue'
import { userStore } from '../stores/user/userStore'

onMounted(() => {
  AOS.init()
})
</script>

<template>
  <div
    id="sidebar-multi-level-sidebar"
    class="fixed top-16 lg:left-0 md:-left-64 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 dark:border-gray-600 shadow-xl"
    aria-label="Sidebar"
  >
    <div class="h-full p-2 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
      <div class="space-y-2 font-medium">
        <router-link
          v-for="el in menu"
          :to="el.path"
          class="flex items-center p-2 pl-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          <i :class="el.icon" class="text-xl"></i>
          <span class="ml-3">{{ el.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background: rgb(0, 0, 0, 0.3);
}
</style>
