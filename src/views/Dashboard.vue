<script setup>
import Sidebar from "../components/Sidebar.vue";
import Header from "../components/Header.vue";
</script>

<template>
  <div class="antialiased h-screen bg-gray-50 dark:bg-gray-900">
    <Header />
    <div class="pt-14 h-full">
      <Sidebar />
      <div class="p-4 sm:ml-64 h-full">
        <div
          class="p-4 overflow-x-hidden border-2 border-dotted border-gray-300 rounded-lg dark:border-gray-700 h-full"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
