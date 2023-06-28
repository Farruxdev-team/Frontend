<script setup>
import Loading from '@/components/Loading.vue'
import Back from '../components/Back.vue'
import AddNavbar from '../components/AddNavbar.vue'
import { useRoute } from 'vue-router'
import { testStore } from '../stores/tests/testStore'
import { ref, onMounted } from 'vue'
import moment from 'moment'

const store = testStore()
const currentTest = ref()
const { id } = useRoute().params

onMounted(async () => {
  currentTest.value = await store.GET_ONE(id)
})
</script>

<template>
  <div>
    <AddNavbar>
      <Back />
    </AddNavbar>

    <Loading v-if="store.LOAD" />

    <div v-else class="">
      <div
        class="w-full flex justify-between gap-5 items-center bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-4 px-5 rounded-xl mb-5 shadow-xl"
      >
        <div class="flex items-center gap-2">
          <h4
            class="dark:text-blue-200 dark:bg-blue-500/50 text-blue-900 bg-blue-500/50 px-2 rounded-md flex items-center gap-2 p-1"
          >
            <i class="bx bx-notepad text-xl"></i>
            <span> TEST: {{ currentTest?.name }} - {{ currentTest?.subject_id?.name }} </span>
          </h4>
          <h4
            class="flex items-center bg-gray-500/50 dark:text-white text-gray-900 rounded-full p-1 text-sm"
          >
            <i class="bx bx-timer text-xl"></i> {{ currentTest?.test_time }}
          </h4>
        </div>
        <h4
          class="px-2 p-1 rounded-md flex items-center gap-2"
          :class="
            new Date().getTime() < new Date(currentTest?.started).getTime()
              ? 'dark:text-green-200 text-green-800 bg-green-600/50'
              : 'line-through dark:text-red-200 text-red-800 bg-red-600/50'
          "
        >
          {{ moment(currentTest?.started).format('YYYY.MM.DD / hh:mm') }}
        </h4>
      </div>

      <div
        class="relative sm:rounded-xl border border-gray-300 dark:border-gray-600 shadow-xl"
        :class="!store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
      >
        <table class="w-full text-center text-gray-500 dark:text-gray-400 shadow-2xl">
          <thead
            class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-300"
          >
            <tr>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Savol matni</th>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Test fani</th>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Boshlanish sanasi</th>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Vaqti</th>
              <th scope="col" class="sr-only">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="el in store.LIST"
              class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ el.name }}
              </th>
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ el.subject_id.name }}
              </th>
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span
                  class="relative pl-8 inline-flex items-center justify-center gap-2 p-1 px-3 rounded-md"
                  :class="
                    new Date().getTime() < new Date(el.started).getTime()
                      ? 'dark:text-green-200 text-green-800 bg-green-600/50'
                      : 'line-through dark:text-red-200 text-red-800 bg-red-600/50'
                  "
                >
                  <i
                    class="absolute left-2 top-0.5 bx text-lg"
                    :class="
                      new Date().getTime() < new Date(el.started).getTime()
                        ? 'bxs-calendar-check'
                        : 'bxs-calendar-x'
                    "
                  ></i>
                  <span>
                    {{ moment(el.started).format('YYYY.MM.DD / hh:mm') }}
                  </span>
                </span>
              </th>
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span
                  class="bg-gray-500/50 gap-2 inline-flex px-3 rounded-md items-center justify-center"
                >
                  <i class="bx bx-timer text-2xl"></i>
                  {{ el.test_time }}
                </span>
              </th>
              <td class="px-6 py-4 text-right">
                <router-link
                  :to="`/tests/${el._id}`"
                  class="text-white bg-blue-500 rounded-lg text-sm px-3.5 py-2 text-center"
                >
                  Kirish
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
