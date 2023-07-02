<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

import Back from '@/components/Back.vue'
import { questionStore } from '@/stores/questions/questionStore'
import { answerStore } from '@/stores/answers/answerStore'

const store_question = questionStore()
const store_answer = answerStore()

const { id } = useRoute().params
const questions = ref([])

const setAnswers = async () => {
  for (let i in questions) {
    console.log(questions[i]._id)
    // const res = store_answer.GET_QUESTIONS(questions[i]._id)
    // console.log(res)
  }
}

onMounted(async () => {
  const res = await store_question.GET_GROUP(id)
  questions.value = res
  await setAnswers()
})
</script>

<template>
  <div>
    {{ questions }}
    <nav
      class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
    >
      <Back />
      <div class="p-2 px-4 border border-dashed rounded-xl dark:bg-gray-900 dark:text-white">
        <span class="text-lg">00:10:00</span>
      </div>
    </nav>

    <div
      class="w-full bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-5 rounded-xl mb-5 shadow-xl dark:text-white"
    >
      <div v-for="el in 4" class="pb-7 rounded-lg">
        <p
          class="mb-5 dark:bg-gray-900 bg-gray-200 p-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-xl"
        >
          {{ el }}. Bir haftada necha kun bor ?
        </p>
        <div class="grid grid-cols-2 gap-5">
          <div
            class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          >
            <input
              id="bordered-radio-1"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            />
            <label
              for="bordered-radio-1"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >14 kun</label
            >
          </div>
          <div
            class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          >
            <input
              checked
              id="bordered-radio-2"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            />
            <label
              for="bordered-radio-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >7 kun</label
            >
          </div>
          <div
            class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          >
            <input
              checked
              id="bordered-radio-2"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            />
            <label
              for="bordered-radio-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >5 kun</label
            >
          </div>
          <div
            class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          >
            <input
              checked
              id="bordered-radio-2"
              type="radio"
              value=""
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            />
            <label
              for="bordered-radio-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >9 kun</label
            >
          </div>
        </div>
        <hr v-if="el != 4" class="h-px mt-7 bg-gray-300 border-0 dark:bg-gray-600" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
