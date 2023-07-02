<script setup>
import { staffsStore } from '../stores/teacher/staffStore.js'
import { studentStore } from '../stores/students/studentStore'
import { subjectStore } from '../stores/subjects/subjectStore.js'

const props = defineProps(['data', 'page', 'message'])

let store

if (props.page == 'teachers') store = staffsStore()
else if (props.page == 'students') store = studentStore()
else store = subjectStore()
</script>
<template>
  <section
    :class="!store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    class="relative shadow-xl rounded-xl"
  >
    <table class="w-full text-center text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-white border-b border-gray-400 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th v-for="msg in props.message" scope="col" class="py-4 text-sm uppercase">
            {{ msg }}
          </th>
          <th scope="col" class="py-4 text-sm uppercase">batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in props.data"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span v-if="props.page != 'subjects'">{{ el.full_name }}</span>
            <span v-else>{{ el.name }}</span>
          </th>
          <td class="py-4 text-sm">
            <span
              v-if="props.page == 'teacher'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
              >o'qituvchining fani
            </span>
            <span
              v-if="props.page == 'student'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
              >o'quvchining guruhi
            </span>
            <span
              v-if="props.page == 'subjects'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
              >24
            </span>
          </td>
          <td class="py-4 text-sm">
            <span
              v-if="props.page != 'subjects'"
              class="bg-red-300 py-0.5 dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium px-3 rounded"
              >{{ el.phone }}</span
            >
            <span
              v-else
              class="bg-red-300 py-0.5 dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium px-3 rounded"
              >19</span
            >
          </td>
          <td class="py-4 text-sm">
            <span
              v-if="el.is_active"
              class="bg-green-300 py-0.5 dark:bg-green-900/50 dark:text-green-300 text-green-900 font-medium px-3 rounded"
              >active</span
            >
            <span
              v-else
              class="bg-pink-300 py-0.5 dark:bg-pink-900/50 dark:text-pink-300 text-pink-900 font-medium px-3 rounded"
              >inactive</span
            >
          </td>
          <td class="py-4">
            <router-link
              :to="`${props.page}/${el._id}`"
              class="px-3 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-sm"
            >
              Kirish
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped></style>
