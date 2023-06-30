<script setup>
// MODULES
import { useRoute } from 'vue-router'
import Back from '@/components/Back.vue'

const { id } = useRoute().params
</script>

<template>
  <div
    class="w-full bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-4 px-5 rounded-lg mb-5 shadow-xl dark:text-white"
  >
    <Back />
    <div class="py-5 pt-10">
      <div class="bg-gray-900">
        
        {{ id }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
