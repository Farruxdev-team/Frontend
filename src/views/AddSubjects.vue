<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import Table from '../components/Table.vue'
import { onMounted } from 'vue'
import { useSubjects } from '../service/subjects/index.js'
import { subjectStore } from '../stores/subjects/subjectStore.js'

const store = subjectStore()
const heads = ['fan nomi', "fan o'qituvchilari soni", "fan o'tiladigan guruhlar soni"]

const listUpdate = () => {
  useSubjects.list().then((res) => {
    store.SET_LIST(res?.data)
  })
}

onMounted(() => {
  listUpdate()
})
// console.log(store.LIST, "subjects");
</script>

<template>
  <AddNavbar data="Fan" />
  <Table :message="heads" page="subjects" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
