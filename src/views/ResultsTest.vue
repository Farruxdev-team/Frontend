<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Loading from '@/components/Loading.vue'
import { testResultsStore } from '@/stores/test_results/testResultsStore'
import { userStore } from '@/stores/user/userStore'
import { testStore } from '../stores/tests/testStore'

const store_results = testResultsStore()
const store_user = userStore()

const role = ref(store_user.USER?.user?.role_id.name)
const { id } = useRoute().params

const groupTest = ref([])
const load = ref(true)

onMounted(async () => {
  await store_user.CHECK_USER()
  console.log(id)
  groupTest.value = await store_results.GET_GROUP(id)
  load.value = false
})
const heads = ['I.F.SH', 'Tel:raqam', "To'gri javoblari", 'batafsil']
</script>

<template>
  <div class="">
    <Loading v-if="load" />
    <section
      v-else
      :class="!groupTest.LIST ? 'overflow-x-hidden' : 'overflow-x-auto'"
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
            v-for="(el, i) in groupTest"
            class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span class="bg-green-500/30 px-5 rounded-md">{{ el.student_id.full_name }}</span>
            </th>
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span class="bg-blue-500/30 px-5 rounded-md">{{ el.student_id.phone }}</span>
            </th>
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm px-5">
              <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  class="text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  :style="`width: ${el.test_group_id.tests_count / (el.correct_count * 100) || 0}%`"
                  :class="el.correct_count == 0 ? 'bg-red-600' : 'bg-blue-600'"
                >
                  {{ el.test_group_id.tests_count / (el.correct_count * 100) || 0 }}%
                </div>
              </div>
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
  </div>
</template>

<style lang="scss" scoped></style>
