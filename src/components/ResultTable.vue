<script setup>
import TimeBeauty from '../components/TimeBeauty.vue'

const { heads, data, role } = defineProps(['heads', 'data', 'role'])
</script>

<template>
  <section
    :class="!data.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    class="relative shadow-xl rounded-xl"
  >
    <table class="w-full text-center text-gray-500 dark:text-gray-400 shadow-2xl">
      <thead
        class="text-xs text-gray-700 uppercase bg-white border-b border-gray-400 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th scope="col" v-for="el in heads" class="py-4 px-10 text-sm uppercase">{{ el }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(el, i) in data"
          class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
        >
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ el.name }}
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ el.subject_id.name }}
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm">
            <TimeBeauty :started="el.started" :test_time="el.test_time" />
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              class="bg-gray-500/50 gap-2 inline-flex px-3 rounded-md items-center justify-center"
            >
              <i class="bx bx-timer text-2xl"></i>
              {{ el.test_time }}
            </span>
          </th>
          <td class="px-6 py-4 text-center">
            <router-link
              :to="`/results/${el._id}`"
              class="px-3 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-sm"
            >
              Natijalar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
