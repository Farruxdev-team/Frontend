<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

import Back from '@/components/Back.vue'
import { questionStore } from '@/stores/questions/questionStore'

const store_question = questionStore()

const { id } = useRoute().params
const questions = ref([])
const student_answers = ref([])
const time = ref(0)

const setTime = async () => {
  time.value = await questions.value[0].test_group_id.test_time
  console.log(time.value)
}

const changeTime = () => {
  time.value -= 1
}
setInterval(() => {
  changeTime()
}, 1000)

onMounted(async () => {
  questions.value = await store_question.GET_GROUP(id)
  await setTime()
})
</script>

<template>
  <div>
    <nav
      class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
    >
      <Back />
      <div class="p-2 px-4 border border-dashed rounded-xl dark:bg-gray-900 dark:text-white">
        <span v-if="time">{{ new Date(time * 1000).toISOString().substr(11, 8) }}</span>
      </div>
    </nav>

    <div
      class="w-full bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-5 rounded-xl mb-5 shadow-xl dark:text-white"
    >
      <div v-for="(el, i) in questions" class="pb-7 rounded-lg">
        <p
          class="mb-5 dark:bg-gray-900 bg-gray-200 p-3 rounded-lg border border-gray-300 dark:border-gray-600 shadow-xl"
        >
          {{ i + 1 }}. {{ el.question }}
        </p>
        <div class="grid grid-cols-2 gap-5">
          <div
            v-for="answer in el.answers"
            class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          >
            {{ answer }}
            <input
              :id="answer._id"
              type="radio"
              value=""
              :name="el._id"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            />
            <label
              :for="answer._id"
              class="cursor-pointer w-full py-4 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ answer.answer }}</label
            >
          </div>
        </div>
        <hr v-if="el != 4" class="h-px mt-7 bg-gray-300 border-0 dark:bg-gray-600" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
