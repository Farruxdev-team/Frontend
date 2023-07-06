<script setup>
import { onMounted } from 'vue'

import Loading from '@/components/Loading.vue'
import { testStore } from '@/stores/tests/testStore'
import { testResultsStore } from '@/stores/test_results/testResultsStore'

const store_test = testStore()
const store_results = testResultsStore()
import { Chart, initTE } from 'tw-elements'

onMounted(() => {
  initTE({ Chart })
})
</script>

<template>
  <div
    class="w-full bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg h-full"
  >
    <div class="mx-auto w-3/6 overflow-hidden">
      <canvas
        data-te-chart="pie"
        data-te-dataset-label="Traffic"
        data-te-labels="['Correct', 'Incorrect']"
        data-te-dataset-data="[20, 10]"
        data-te-dataset-background-color="['rgb(55, 255, 0, 0.7)', 'rgb(255, 17, 0, 0.7)']"
      >
      </canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
