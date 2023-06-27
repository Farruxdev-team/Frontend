<script setup>
import { onMounted, ref } from "vue";
import Chart from "../components/Chart.vue";
import { useHome } from "../service/home/index";
import { homeStore } from "../stores/home/homeStore";

const store = homeStore();

const listUpdate = () => {
  useHome.list_students().then((res) => {
    store.SET_LIST_STUDENTS(res?.data);
  });
  useHome.list_staff().then((res) => {
    store.SET_LIST_STAFF(res?.data);
  });
  useHome.list_groups().then((res) => {
    store.SET_LIST_GROUPS(res?.data);
  });
  useHome.list_tests().then((res) => {
    store.SET_LIST_TESTS(res?.data);
  });
  useHome.list_subjects().then((res) => {
    store.SET_LIST_SUBJECTS(res?.data);
  });
};

onMounted(() => {
  listUpdate();
});
</script>

<template>
  <Chart
    :data="{
      students: store.LIST_STUDENTS.length,
      staff: store.LIST_STAFF.length,
      groups: store.LIST_GROUPS.length,
      tests: store.LIST_TESTS.length,
      subjects: store.LIST_SUBJECTS.length,
    }"
  />
</template>

<style lang="scss" scoped></style>
