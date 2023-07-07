<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
import { menu } from '@/constants/menu'
import { userStore } from '../stores/user/userStore'

const store = userStore()
</script>

<template>
  <div
    class="fixed top-16 lg:left-0 z-40 lg:w-64 sm:w-16 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-300 dark:border-gray-600 shadow-xl"
  >
    <div class="h-full p-2 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
      <div v-if="!store.USER.user" class="w-full h-full py-32">
        <LoadingSpinner />
      </div>
      <div v-else class="space-y-2 font-medium">
        <router-link
          v-for="el in menu"
          :to="el.path"
          class="flex items-center p-2 pl-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
          :class="el.role.includes(store.USER.role) ? '' : 'hidden'"
        >
          <i :class="el.icon" class="text-2xl"></i>
          <span class="lg:block ml-3 sm:hidden">{{ el.name }}</span>
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
