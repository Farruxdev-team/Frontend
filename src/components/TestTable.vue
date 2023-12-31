<script setup>
import TimeBeauty from '../components/TimeBeauty.vue'
import { reactive } from 'vue'

const page = reactive({
  currentPage: 1,
  itemsPerPage: 5
})

const { heads, data } = defineProps(['heads', 'data'])
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
          v-for="(el, i) in data.slice(
            (page.currentPage - 1) * page.itemsPerPage,
            (page.currentPage - 1) * page.itemsPerPage + page.itemsPerPage
          )"
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
              :to="`/tests/${el._id}`"
              class="px-3 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-sm"
            >
              Kirish
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <nav class="w-full p-3 bg-gray-800" aria-label="Page navigation example">
      <div class="flex items-center -space-x-px h-10 text-base">
        <button
          class="flex items-center justify-center px-2 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="
            () => {
              page.currentPage > 1 ? page.currentPage-- : 0
            }
          "
        >
          <span class="sr-only">Previous</span>
          <i class="bx bx-chevron-left text-2xl"></i>
        </button>
        <button
          v-for="el in Math.ceil(data.length / page.itemsPerPage)"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="page.currentPage == el ? 'dark:bg-gray-900' : 'dark:bg-gray-800'"
          @click="() => (page.currentPage = el)"
        >
          {{ el }}
        </button>
        <button
          class="flex items-center justify-center px-2 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="
            () => {
              page.currentPage < Math.ceil(data.length / page.itemsPerPage) ? page.currentPage++ : 0
            }
          "
        >
          <span class="sr-only">Next</span>
          <i class="bx bx-chevron-right text-2xl"></i>
        </button>
      </div>
    </nav>
  </section>
</template>
