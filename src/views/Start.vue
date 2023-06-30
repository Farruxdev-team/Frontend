<script setup>
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import moment from 'moment'

import Loading from '@/components/Loading.vue'
import { testStore } from '@/stores/tests/testStore'
import { subjectStore } from '@/stores/subjects/subjectStore'
import { questionStore } from '@/stores/questions/questionStore'

const store = testStore()
const store_subject = subjectStore()
const store_question = questionStore()

const fromNow = (time, space) => {
  space = new Date(space * 60000).getTime()
  const now = new Date()
  const deadline = new Date(time)
  const isAgo = new Date().getTime() < new Date(time).getTime()
  if (!isAgo && new Date().getTime() < new Date(time).getTime() + space) {
    return {
      color: 'dark:text-blue-200 text-blue-800 bg-blue-700/50 cursor-pointer',
      msg: 'BOSHLASH'
    }
  }

  const plus = (num) => Math.abs(num).toString().padStart(2, '0')
  const format = (one, two, min = '') => {
    return `${min}${plus(one.getDay() - two.getDay())}:${plus(
      one.getHours() - two.getHours()
    )}:${plus(one.getMinutes() - two.getMinutes())}`
  }
  if (isAgo) {
    return {
      color: 'dark:text-green-200 text-green-800 bg-green-700/50',
      msg: format(deadline, now)
    }
  } else {
    return {
      color: 'dark:text-red-200 text-red-800 bg-red-700/50',
      msg: format(now, deadline, '-')
    }
  }
}

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
