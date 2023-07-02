<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import Table from '../components/Table.vue'
import { onMounted } from 'vue'
import { staffsStore } from '../stores/teacher/staffStore.js'
import Loading from '../components/Loading.vue'

const store = staffsStore()

const heads = ['i.f.o', "fan o'qituvchisi", 'tel raqami', 'holati']
const keys = ['full_name', 'Matematika', 'phone', 'is_active']

onMounted(() => {
  store.SET_LIST()
})
</script>

<template>
  <AddNavbar>
    <span class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold">O'qituvchilari</span>
    <button
      @click="changeModal"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      O'qituvchi qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="store.LOAD" />
  <Table v-else :message="heads" :keys="keys" page="teachers" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
