<script setup>
import { onMounted, ref } from 'vue'
import Chart1 from '../components/Chart1.vue'
import Chart2 from '../components/Chart2.vue'
import Chart3 from '../components/Chart3.vue'
import { useStaff } from '../service/staff/index'
import { staffStore } from '../stores/staff/staffStore'
import { useStudents } from '../service/students/index'
import { studentStore } from '../stores/students/studentStore'
import { useSubjects } from '../service/subjects/index'
import { subjectStore } from '../stores/subjects/subjectStore'
import { useTests } from '../service/tests/index'
import { testStore } from '../stores/tests/testStore'

const staff_Store = staffStore()
const students_Store = studentStore()
const subjects_Store = subjectStore()
const test_Store = testStore()

const listUpdate = () => {
  useStaff.list().then((res) => {
    staff_Store.SET_LIST(res?.data)
  })

  useStudents.list().then((res) => {
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
  AOS.init()

  listUpdate()
})
</script>

<template>
  <div
    class="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-5"
    data-aos="fade-down"
    data-aos-delay="500"
  >
    <div
      class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white border border-gray-300 shadow-xl"
    >
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-xl font-bold">Xodimlar</h1>
        <h1 class="text-2xl font-extrabold">{{ staff_Store.LIST.length }}</h1>
      </div>
      <div class="w-20 h-20">
        <img src="/teacher.svg" class="rounded-xl h-full w-auto" alt="" />
      </div>
    </div>
    <div
      class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white border border-gray-300 shadow-xl"
    >
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-xl font-bold">Talabalar</h1>
        <h1 class="text-2xl font-extrabold">{{ students_Store.LIST.length }}</h1>
      </div>
      <div class="w-20 h-20">
        <img src="/student.png" class="rounded-xl h-full w-auto" alt="" />
      </div>
    </div>
    <div
      class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white border border-gray-300 shadow-xl"
    >
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-xl font-bold">Fanlar</h1>
        <h1 class="text-2xl font-extrabold">{{ subjects_Store.LIST.length }}</h1>
      </div>
      <div class="w-20 h-20">
        <img src="/subjects.jpeg" class="rounded-xl h-full w-auto" alt="" />
      </div>
    </div>
    <div
      class="flex items-center justify-between p-5 h-auto w-full rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white border border-gray-300 shadow-xl"
    >
      <div class="grid grid-cols-1 gap-1">
        <h1 class="text-xl font-bold">Testlar</h1>
        <h1 class="text-2xl font-extrabold">{{ test_Store.LIST.length }}</h1>
      </div>
      <div class="w-20 h-20">
        <img src="/test.png" class="h-full rounded-xl w-auto" alt="" />
      </div>
    </div>
  </div>

  <div class="grid lg:grid-cols-2 md:grid-cols-1 gap-5 mb-5">
    <Chart1 data-aos="flip-up" data-aos-delay="500" />
    <Chart2 data-aos="flip-up" data-aos-delay="500" />
  </div>
  <Chart3 />
</template>

<style lang="scss" scoped></style>
