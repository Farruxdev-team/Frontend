<script setup>
import { onMounted } from 'vue'

import Loading from '@/components/Loading.vue'
import { testStore } from '@/stores/tests/testStore'
import { subjectStore } from '@/stores/subjects/subjectStore'
import { questionStore } from '@/stores/questions/questionStore'
import { fromNow } from '../helpers/fromNow'

const store = testStore()
const store_subject = subjectStore()
const store_question = questionStore()

onMounted(() => {
  store.SET_LIST()
  store_subject.SET_LIST()
  store.trueLoad()
})
</script>

<template>
  <div>
    <Loading v-if="store.LOAD" />
    <section
      v-else
      class="relative rounded-lg border border-gray-300 dark:border-gray-600 shadow-xl"
      :class="!store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    >
      <table class="w-full text-center text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300 border-b border-gray-400"
        >
          <tr>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Test nomi</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Test fani</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Vaqti</th>
            <th scope="col" class="py-4 px-10 sr-only">Boshlanish sanasi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in store.LIST"
            class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ el.name }}
            </th>
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {{ el.subject_id.name }}
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
                class="relative gap-2 p-2 px-4 text-sm rounded-md"
                :class="fromNow(el.started, el.test_time).color"
                :to="fromNow(el.started, el.test_time).msg == 'BOSHLASH' ? `start/${el._id}` : ''"
              >
                {{ fromNow(el.started, el.test_time).msg }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
