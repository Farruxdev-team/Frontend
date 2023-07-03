<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import Table from '../components/Table.vue'
import { onMounted, ref } from 'vue'
import { subjectStore } from '../stores/subjects/subjectStore.js'
import Loading from '../components/Loading.vue'

const store = subjectStore()
const addModal = ref(false)
const changeModal = () => (addModal.value = !addModal.value)

const heads = ['fan nomi', "fan o'qituvchilari soni", "fan o'tiladigan guruhlar soni", 'holati']
const keys = ['name', '24', '19', 'is_active']

onMounted(() => {
  store.SET_LIST()
})
</script>

<template>
  <AddNavbar>
    <span class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold">Fanlar</span>
    <button
      @click="changeModal"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      Fan qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="store.LOAD" />
  <Table v-else :message="heads" :keys="keys" page="subjects" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
