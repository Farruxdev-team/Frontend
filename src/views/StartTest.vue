<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

import Back from '@/components/Back.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { questionStore } from '@/stores/questions/questionStore'
import { userStore } from '@/stores/user/userStore'
import { checkedTestStore } from '@/stores/checked_test/checkedTestStore'
import { testResultsStore } from '@/stores/test_results/testResultsStore'

const store_question = questionStore()
const store_user = userStore()
const store_checked_test = checkedTestStore()
const store_test_results = testResultsStore()

const { id } = useRoute().params
const router = useRouter()

const questions = ref([])
const studentAnswers = ref([])
const time = ref(0)

const setStudentAnswer = (questionId, answerId) => {
  for (let i in studentAnswers.value) {
    if (studentAnswers.value[i].question_id == questionId) {
      studentAnswers.value[i].answer_id.push(answerId)
    }
  }
}

const isMultiple = (arr) => {
  return arr.filter((i) => i.is_true).length > 1
}

const setTime = async () => {
  const test_time = new Date(questions.value[0]?.test_group_id.test_time * 60000).getTime()
  const started_time = questions.value[0].test_group_id.started
  const deadline = new Date(started_time).getTime() + test_time
  time.value = new Date(deadline - new Date().getTime())
}

const checkedAnswers = async () => {
  if (confirm('Testni tugatmoqchimisiz ?')) {
    for (let i in studentAnswers.value) {
      for (const j in studentAnswers.value[i].answer_id) {
        const res = await store_checked_test.ADD_LIST({
          ...studentAnswers.value[i],
          answer_id: studentAnswers.value[i].answer_id[j]
        })
      }
    }
    store_test_results.ADD_LIST({
      test_group_id: questions.value[0].test_group_id._id,
      student_id: store_user.USER?.user?._id,
      correct_count: 0
    })
    toast.success(`Muvaffaqiyatli testni yakunladingiz`, {
      autoClose: 1000
    })
    setTimeout(() => {
      router.push('/results')
    }, 1000)
  }
}

const changeTime = () => {
  if (time.value > 0) {
    time.value -= 1000
  }
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
      answer_id: [],
      student_id: store_user.USER?.user?._id
    })
  }
})
window.onbeforeunload = checkedAnswers()
</script>

<template>
  <div>
    <nav
      class="w-full flex justify justify-between items-center bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg"
    >
      <div class="flex items-center gap-5">
        <Back />
        <button
          @click="checkedAnswers"
          class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
        >
          Testni tugatish
        </button>
      </div>
      <div
        class="p-2 px-4 border border-dashed rounded-xl dark:bg-gray-900 dark:text-white text-center w-36"
      >
        <LoadingSpinner v-if="!time" />
        <span v-else class="text-center w-full">{{
          new Date(time).toISOString().slice(11, 19)
        }}</span>
      </div>
    </nav>

    <div
      class="w-full bg-white border-gray-400 dark:bg-gray-800 border dark:border-gray-600 p-5 rounded-lg mb-5 shadow-xl dark:text-white"
    >
      <LoadingSpinner v-if="!questions[0]" />
      <div v-else v-for="(el, i) in questions" class="pb-5 rounded-lg">
        <p
          class="mb-5 dark:bg-gray-900 bg-gray-300 p-4 px-5 rounded-lg border border-gray-400 dark:border-gray-600 shadow-xl"
        >
          {{ i + 1 }}. {{ el?.question }}
        </p>
        <div class="grid grid-cols-2 gap-5">
          <div
            v-for="answer in el?.answers"
            class="flex items-center pl-4 border border-gray-400 rounded-lg dark:border-gray-600 dark:bg-gray-900 hover:shadow-xl bg-gray-300 shadow-xl"
          >
            <input
              :type="isMultiple(el?.answers) ? 'checkbox' : 'radio'"
              :id="answer?._id"
              :name="el?._id"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
              :class="isMultiple(el?.answers) ? 'rounded' : ''"
              @change="() => setStudentAnswer(el?._id, answer?._id)"
            />
            <label
              :for="answer?._id"
              class="cursor-pointer w-full py-4 ml-4 text-md font-medium text-gray-900 dark:text-gray-300 hover:shadow-xl"
              >{{ answer?.answer }}</label
            >
          </div>
        </div>
      </div>
      <div class="w-full grid md:grid-cols-12 lg:gap-3 md:gap-2">
        <button
          v-for="el in studentAnswers.length"
          class="w-full p-2 rounded-lg text-center block border dark:border-gray-600 border-gray-400"
          :class="
            studentAnswers[el - 1]?.answer_id.length
              ? 'bg-green-400 dark:bg-green-600 '
              : 'bg-gray-300 dark:bg-gray-900 '
          "
        >
          {{ el }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
