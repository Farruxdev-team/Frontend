<script setup>
import Back from '../components/Back.vue'
</script>

<template>
  <div
    class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
  >
    <Back />
    <div class="flex items-center gap-2">
      <i class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-lg text-white cursor-pointer"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
