<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

import Back from '@/components/Back.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { questionStore } from '@/stores/questions/questionStore'
import { userStore } from '@/stores/user/userStore'

const store_question = questionStore()
const user_store = userStore()

const { id } = useRoute().params
const questions = ref([])
const studentAnswers = ref([])
const currentTest = ref(0)
const time = ref(0)

const setStudentAnswer = (questionId, answerId) => {
  console.log(questionId, answerId)
  for (let i in studentAnswers.value) {
    console.log(studentAnswers.value[i], questionId)
    if (studentAnswers.value[i].question_id == questionId) {
      studentAnswers.value[i].answer_id = answerId
      console.log('SET')
    }
  }
}

const setTime = async () => {
  time.value = await questions.value[0].test_group_id.test_time
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
  for (let i in questions.value) {
    studentAnswers.value.push({
      question_id: questions.value[i]._id,
      answer_id: '',
      student_id: user_store.USER.user._id
    })
  }
})
</script>

<template>
  <div>
    <nav
      class="w-full flex justify justify-between items-center bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg"
    >
      <Back />
      <div
        class="p-2 px-4 border border-dashed rounded-xl dark:bg-gray-900 dark:text-white text-center w-32"
      >
        <LoadingSpinner v-if="!time" />
        <span v-else>{{ new Date(time * 1000).toISOString().substr(11, 8) }}</span>
      </div>
    </nav>

    <div
      class="w-full bg-white border-gray-400 dark:bg-gray-800 border dark:border-gray-600 p-5 rounded-lg mb-5 shadow-xl dark:text-white"
    >
      <LoadingSpinner v-if="!questions[0]" />
      <div class="w-[90%] pb-7 rounded-lg">
        <p
          class="mb-5 dark:bg-gray-900 bg-gray-300 p-3 rounded-lg border border-gray-400 dark:border-gray-600 shadow-xl"
        >
          {{ currentTest + 1 }}. {{ questions[currentTest]?.question }}
        </p>
        <div class="grid grid-cols-2 gap-5">
          <div
            v-for="answer in questions[currentTest]?.answers"
            class="flex items-center pl-4 border border-gray-400 rounded-lg dark:border-gray-600 dark:bg-gray-900 hover:shadow-xl bg-gray-300 shadow-xl"
          >
            <input
              :id="answer?._id"
              type="radio"
              value=""
              :name="questions[currentTest]?._id"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
              @change="() => setStudentAnswer(questions[currentTest]?._id, answer?._id)"
            />
            <label
              :for="answer?._id"
              class="cursor-pointer w-full py-4 ml-4 text-sm font-medium text-gray-900 dark:text-gray-300 hover:shadow-xl"
              >{{ answer?.answer }}</label
            >
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-12 gap-5">
        <button
          v-for="el in 10"
          class="w-full mb-5 p-3 rounded-lg block"
          :class="
            currentTest == el
              ? ''
              : 'bg-gray-300 dark:bg-gray-900 border dark:border-gray-600 border-gray-400'
          "
        >
          {{ el }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
