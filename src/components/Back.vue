<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <button
    @click="() => router.go(-1)"
    class="dark:bg-blue-600 bg-blue-300 dark:text-white flex items-center gap-2 px-5 p-2 rounded-lg"
  >
    <i class="bx bx-left-arrow-alt text-xl"></i>
    BACK
  </button>
</template>
