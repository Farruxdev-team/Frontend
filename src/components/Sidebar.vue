<script setup>
import { menu } from '@/constants/menu'
</script>

<template>
  <aside
    id="sidebar-multi-level-sidebar"
    class="fixed top-14 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <div class="space-y-2 font-medium">
        <router-link v-for="el in menu" to="/">
          <a
            href="#"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i :class="el.icon" class="text-xl"></i>
            <span class="ml-3">{{ el.name }}</span>
          </a>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped></style>
