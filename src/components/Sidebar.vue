<script setup>
import { menu } from '@/constants/menu'
</script>

<template>
  <aside
    id="sidebar-multi-level-sidebar"
    class="fixed top-16 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 shadow-xl"
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
  </aside>
</template>

<style scoped>
.router-link-exact-active {
  background: rgb(51, 51, 51, 0.2);
}
</style>
