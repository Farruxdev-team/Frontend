<script setup>
import AddNavbar from "../components/AddNavbar.vue";
import Table from "../components/Table.vue";
import { onMounted } from "vue";
import { useStaff } from "../service/teacher/index.js";
import { staffsStore } from "../stores/teacher/staffStore.js";

const store = staffsStore();
const heads = ["i.f.o", "fan o'qituvchisi", "tel: raqami"];

const listUpdate = () => {
  useStaff.list().then((res) => {
    store.SET_LIST(res?.data);
  });
};

onMounted(() => {
  listUpdate();
});
// console.log(store.LIST, "teacher");
</script>

<template>
  <AddNavbar data="O'qituvchi" />
  <Table :message="heads" page="teacher" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
