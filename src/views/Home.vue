<script setup>

import { onMounted, ref } from "vue";
import Chart1 from "../components/Chart1.vue";
import Chart2 from "../components/Chart2.vue";
import Chart3 from "../components/Chart3.vue";
import { useStaff } from "../service/staff/index"
import { staffStore } from "../stores/staff/staffStore"
import { useStudents } from "../service/students/index"
import { studentStore } from "../stores/students/studentStore"
import { useSubjects } from "../service/subjects/index"
import { subjectStore } from "../stores/subjects/subjectStore"
import { useTests } from "../service/tests/index"
import { testStore } from "../stores/tests/testStore"

const staff_Store = staffStore()
const students_Store = studentStore()
const subjects_Store = subjectStore()
const test_Store = testStore()

const listUpdate = () => {
  useStaff.list().then((res) => {
    staff_Store.SET_LIST(res?.data);
  });

  useStudents.list() .then((res) => {
    students_Store.SET_LIST(res?.data)
  })

  useSubjects.list().then((res) => {
    subjects_Store.SET_LIST(res?.data)
  })

  useTests.list().then((res) => {
    test_Store.SET_LIST(res?.data)
  })
}

onMounted(() => {
  AOS.init();

  listUpdate();
});
</script>

<template>

  <div class="flex justify-between items-center gap-4 mb-7" data-aos="fade-down" data-aos-delay="750">
    <div class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white">
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-[30px] font-bold">Xodimlar</h1>
        <h1 class="text-[40px] font-extrabold">{{ staff_Store.LIST.length }}</h1>
      </div>
      <div class="w-[100px] h-[100px]">
        <img src="teacher.svg" class="h-full w-auto" alt="">
      </div>
    </div>
    <div class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white">
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-[30px] font-bold">Talabalar</h1>
        <h1 class="text-[40px] font-extrabold">{{ students_Store.LIST.length }}</h1>
      </div>
      <div class="w-[100px] h-[100px]">
        <img src="student.png" class="h-full w-auto" alt="">
      </div>
    </div>
    <div class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white">
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-[30px] font-bold">Fanlar</h1>
        <h1 class="text-[40px] font-extrabold">{{ subjects_Store.LIST.length }}</h1>
      </div>
      <div class="w-[100px] h-[100px]">
        <img src="subjects.jpeg" class="h-full w-auto" alt="">
      </div>
    </div>
    <div class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white">
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-[30px] font-bold">Testlar</h1>
        <h1 class="text-[40px] font-extrabold">{{ test_Store.LIST.length }}</h1>
      </div>
      <div class="w-[100px] h-[100px]">
        <img src="test.png" class="h-full w-auto" alt="">
      </div>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 48% 48%;" class="gap-[64px] mb-7">
    <Chart1 />
    <Chart2 />
  </div>
  <Chart3 />
</template>


<style lang="scss" scoped>

</style>