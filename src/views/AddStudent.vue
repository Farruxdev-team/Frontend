<script setup>
import AddNavbar from "../components/AddNavbar.vue";
import Table from "../components/Table.vue";
import { onMounted, ref } from "vue";
import { useStudent } from "../service/student/index";
import { studentStore } from "../stores/student/studentStore";

const store = studentStore();
const heads = ["i.f.o", "guruh talabasi", "tel: raqami"];
// const path = ["full_name", "group_id", "phone", "name"];

const listUpdate = () => {
  useStudent.list().then((res) => {
    store.SET_LIST(res?.data);
  });
};

onMounted(() => {
  listUpdate();
});
// console.log(store.LIST);
</script>

<template>
  <AddNavbar data="Talaba" />
  <Table :message="heads" page="student" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
