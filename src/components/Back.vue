<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div
    class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5   shadow-xl"
  >
    <div class="flex gap-8 items-center">
      <button
        @click="() => router.go(-1)"
        class="bg-blue-500 flex items-center gap-2 px-6 p-2 rounded-lg"
      >
        <i class="bx bx-arrow-left text-2xl"></i>
        BACK
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
