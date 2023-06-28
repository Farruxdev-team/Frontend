<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import Table from '../components/Table.vue'
import { onMounted } from 'vue'
import { subjectStore } from '../stores/subjects/subjectStore.js'

const store = subjectStore()
const heads = ['fan nomi', "fan o'qituvchilari soni", "fan o'tiladigan guruhlar soni"]

onMounted(() => {
  store.SET_LIST()
})
</script>

<template>
  <AddNavbar data="Fan" />
  <Table :message="heads" page="subjects" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
