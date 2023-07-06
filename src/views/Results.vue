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
    class="w-full bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg"
  >
    <div v-if="load" class="w-full flex items-center justify-center py-20">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div v-if="!userResults.length">
        <h4 class="text-white text-lg text-center">NO DATA</h4>
      </div>
      <div v-else class="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
        <div v-for="el in userResults" class="dark:bg-gray-900 bg-gray-300 rounded-lg px-5 py-2">
          <canvas
            data-te-chart="pie"
            data-te-dataset-label="Traffic"
            data-te-labels="['Correct', 'Incorrect']"
            data-te-dataset-data="[20, 10]"
            data-te-dataset-background-color="['rgb(55, 255, 0, 0.7)', 'rgb(255, 17, 0, 0.7)']"
          >
          </canvas>
          <router-link
            :to="`results/${el._id}`"
            class="text-sm dark:bg-gray-800 bg-white dark:text-white text-center my-2 rounded-lg p-1 flex items-center justify-center gap-2"
          >
            {{ el?.test_group_id?.name }}
            <i class="bx bx-right-arrow-alt text-lg"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
