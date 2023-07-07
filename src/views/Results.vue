<script setup>
import { onMounted, ref } from 'vue'
import { Chart, initTE } from 'tw-elements'

import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { testResultsStore } from '@/stores/test_results/testResultsStore'
import { userStore } from '@/stores/user/userStore'

const store_results = testResultsStore()
const store_user = userStore()

const userResults = ref([])
const load = ref(true)

onMounted(async () => {
  await initTE({ Chart })
  await store_user.CHECK_USER()
  userResults.value = await store_results.GET_STUDENT(store_user.USER?.user?._id)
  load.value = false
})
</script>

<template>
  <div
    class="w-full bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 py-14 rounded-xl mb-5 shadow-lg"
  >
    <div v-if="load" class="w-full flex items-center justify-center py-20">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div v-if="!userResults.length">
        <h4 class="dark:text-white text-lg text-center">NO DATA</h4>
      </div>
      <div v-else class="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
        <div
          v-for="el in userResults"
          class="mb-5 flex items-center flex-wrap max-w-md px-10 dark:bg-gray-900 bg-gray-300 shadow hover:shadow-xl cursor-pointer rounded-2xl h-20"
          x-data="{ circumference: 50 * 2 * Math.PI, percent: 80 }"
        >
          <div
            class="relative flex items-center justify-center -m-6 overflow-hidden dark:bg-gray-900 bg-gray-300 rounded-full"
          >
            <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
              <circle
                class="text-gray-300"
                stroke-width="10"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
              <circle
                class="text-blue-600"
                stroke-width="10"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="circumference - (percent / 100) * circumference"
                stroke-linecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="60"
                cy="60"
              />
            </svg>
            <span class="absolute text-2xl text-blue-700" x-text="`${percent}%`"></span>
          </div>
          <p class="ml-10 font-medium text-gray-600 text-md overflow-x-auto">
            {{ el.test_group_id.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
