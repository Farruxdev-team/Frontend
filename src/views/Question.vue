<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import Back from '@/components/Back.vue'
import Loading from '@/components/Loading.vue'
import DeleteModal from '../components/DeleteModal.vue'

import { questionStore } from '@/stores/questions/questionStore'

const { id, question } = useRoute().params
const router = useRouter()

const store_question = questionStore()

const questions = ref([])
const isDelete = ref(false)

const deleteQuestion = async () => {
  await store_question.DELETE(question)
  toast.success("Muvaffaqiyatli o'chirildi", {
    autoClose: 1000
  })
  setTimeout(() => {
    router.push(`/tests/${id}`)
  }, 500)
}

onMounted(async () => {
  try {
    questions.value = await store_question.GET_ONE(question)
  } catch (error) {
    router.push(`/tests/${id}`)
  }
})
</script>

<template>
  <div>
    <!-- DELETE TESTS MODAL -->
    <DeleteModal
      :isDelete="isDelete"
      :changeDelete="() => (isDelete = false)"
      :deleteFunc="deleteQuestion"
    />

    <nav
      class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
    >
      <Back />
      <div class="flex items-center gap-2">
        <i
          class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-lg text-white cursor-pointer"
          @click="() => (isDelete = true)"
        ></i>
      </div>
    </nav>

    <Loading v-if="!questions.answers" />
    <div
      v-else
      class="w-full gap-5 bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-5 rounded-lg mb-5 shadow-xl dark:text-white"
    >
      <input
        class="w-full outline-none mb-5 dark:bg-gray-900 bg-gray-200 p-4 rounded-lg border-2 border-gray-400 shadow-xl focus:border-blue-500 dark:focus:border-blue-600"
        :value="questions.question"
      />
      <div class="grid grid-cols-2 gap-5">
        <div
          class="flex items-center pl-4 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 bg-gray-200 shadow-xl"
          v-for="el in questions.answers"
        >
          <input
            :id="el._id"
            type="checkbox"
            :value="el.is_true"
            name="answers"
            class="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-900 dark:border-gray-600"
            :checked="el.is_true"
            @change="(e) => console.log(e.target.value)"
          />
          <label
            :for="el._id"
            class="w-full ml-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              type="text"
              :value="el.answer"
              class="bg-inherit rounded-r-lg p-2 w-full border-gray-400"
            />
          </label>
        </div>
      </div>
      <button
        class="bg-green-500 hover:bg-green-700 focus:bg-green-700 mt-5 px-5 py-2 w-full rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 text-sm text-center mr-2"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>
