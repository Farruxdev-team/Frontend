<script setup>
import Back from '../components/Back.vue'
import AddNavbar from '../components/AddNavbar.vue'
import { useRoute } from 'vue-router'

const { id } = useRoute().params
console.log(id)
</script>

<template>
  <div>
    <AddNavbar>
      <Back />
      <span class="text-lg text-blue-600 font-bold">Testlar</span>
    </AddNavbar>
    <div
      class="overflow-x-auto rounded-xl text-white p-4 shadow-xl bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
    >
      {{ id }}
      salom
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
