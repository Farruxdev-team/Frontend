<script setup>
// MODULES
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import moment from 'moment'

// MY MODULES
import Loading from '@/components/Loading.vue'
import Back from '../components/Back.vue'
import AddNavbar from '../components/AddNavbar.vue'
import TimeBeauty from '../components/TimeBeauty.vue'
import DeleteModal from '../components/DeleteModal.vue'

import { testStore } from '../stores/tests/testStore'
import { questionStore } from '../stores/questions/questionStore'
import { answerStore } from '../stores/answers/answerStore'
import { subjectStore } from '@/stores/subjects/subjectStore'

const { id } = useRoute().params
const router = useRouter()

const store = testStore()
const store_question = questionStore()
const store_answers = answerStore()
const store_subject = subjectStore()

const addTestModal = ref(false)
const editTestsModal = ref(false)
const isDeleteTestsModal = ref(false)
const changeDeleteModalTest = () => (isDeleteTestsModal.value = !isDeleteTestsModal.value)
const changeModalTest = () => (addTestModal.value = !addTestModal.value)
const changeModalTests = () => (editTestsModal.value = !editTestsModal.value)

const alphas = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'

const newTest = reactive({
  question: '',
  answers: [{ text: '', isTrue: true }]
})

const newEditTests = reactive({
  name: '',
  subject: '',
  start_date: '',
  start_time: '',
  test_time: ''
})

const addTest = async () => {
  const correct_answers = newTest.answers.filter((i) => i.isTrue)
  try {
    const res = await store_question.ADD_LIST({
      test_group_id: id,
      question: newTest.question,
      correct_answers: correct_answers.length
    })
    try {
      for (let i in newTest.answers) {
        let result = await store_answers.ADD_LIST({
          answer: newTest.answers[i].text,
          is_true: newTest.answers[i].isTrue,
          question_id: res._id
        })
        await store_question.SET_ANSWER(store_question.LIST.length - 1, result)
      }
      await setQuestionsAnswers()
      resetFormTest()
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteTests = async () => {
  store.DELETE_TESTS(id)
  toast.success("Muvaffaqiyatli o'chirildi", {
    autoClose: 1000
  })
  setTimeout(() => {
    router.push('/tests')
  }, 500)
}

const editTests = () => {}

const resetFormTest = () => {
  newTest.question = ''
  newTest.answers = [{ text: '', isTrue: true }]
  changeModalTest()
}

const resetFormTests = () => {
  newEditTests.name = ''
  newEditTests.subject = ''
  newEditTests.start_date = ''
  newEditTests.start_time = ''
  newEditTests.test_time = ''
  changeModalTests()
}

const addAnswer = () => {
  if (newTest.answers.length < 25) {
    newTest.answers.push({ text: '', isTrue: false })
  }
}
const removeAnswer = (i) => {
  if (newTest.answers.length > 1) {
    newTest.answers.splice(i, 1)
  }
}

onMounted(async () => {
  try {
    await store.GET_ONE(id)
  } catch (error) {
    router.push('/tests')
  }
  await store_question.SET_LIST()
  await store_subject.SET_LIST()
})
</script>

<template>
  <div>
    <!-- DELETE TESTS MODAL -->
    <DeleteModal
      :isDelete="isDeleteTestsModal"
      :changeDelete="changeDeleteModalTest"
      :deleteFunc="deleteTests"
    />

    <!-- EDIT TESTS MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
      :class="editTestsModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            @click="resetFormTests"
          >
            <i class="bx bx-x text-2xl px-1"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Testni o'zgartirish
            </h3>
            <form @submit.prevent="" class="space-y-6" action="#">
              <div class="grid grid-cols-2 gap-5">
                <div class="col-span-2">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Test nomi
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="O'tilganlarni mustahkamlash"
                    required
                    v-model="newEditTests.name"
                  />
                </div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Test fani
                  </label>
                  <select
                    id="countries"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    @change="(e) => (newEditTests.subject = e.target.value)"
                  >
                    <option disabled selected>Fanlardan birini tanlang</option>
                    <option v-for="subject in store_subject.LIST" :value="subject._id">
                      {{ subject.name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Boshlanish kuni
                  </label>
                  <input
                    type="date"
                    :min="moment().format('yyyy-MM-DD')"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="O'tilganlarni
                  mustahkamlash"
                    required
                    v-model="newEditTests.start_date"
                  />
                </div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Boshlanish vaqti
                  </label>
                  <input
                    type="time"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="O'tilganlarni mustahkamlash"
                    required
                    v-model="newEditTests.start_time"
                  />
                </div>
                <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Qancha vaqt beriladi (min)
                  </label>
                  <input
                    type="number"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="60"
                    required
                    v-model="newEditTests.test_time"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="reset"
                  class="w-40 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-800"
                  @click="resetFormTests"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  @click="editTests"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD QUESTION MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
      :class="addTestModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click="resetFormTest"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <i class="bx bx-x text-2xl px-1"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Yangi savol qo'shish
            </h3>
            <form @submit.prevent="" class="space-y-6" action="#">
              <div class="">
                <div
                  for="countries"
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Savol matni
                </div>
                <textarea
                  id="message"
                  rows="3"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Savolni yozing..."
                  v-model="newTest.question"
                  required="true"
                ></textarea>
              </div>
              <div
                for="countries"
                class="block text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                Variantlarni kiriting
              </div>
              <div class="grid grid-cols-1 gap-5">
                <div class="relative" v-for="(el, i) in newTest.answers">
                  <div class="relative flex">
                    <button
                      class="flex items-center bg-red-500 text-blue-100 px-2 rounded-l-md"
                      @click="() => removeAnswer(i)"
                    >
                      <i class="bx bx-trash"></i>
                    </button>
                    <input
                      type="input"
                      id="default-search"
                      class="block p-2 px-2 h-full w-full text-sm text-gray-900 border border-gray-300 outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :placeholder="`${alphas[i]} - variant`"
                      v-model="el.text"
                      required="true"
                    />
                    <label
                      class="relative inline-flex items-center cursor-pointer p-1 rounded-r-lg"
                      :class="el.isTrue ? 'bg-green-500' : 'bg-red-500'"
                    >
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        :checked="el.isTrue"
                        @change="() => (el.isTrue = !el.isTrue)"
                      />
                      <div
                        class="w-9 h-5 bg-gray-200 rounded-full dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2.5 after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
                      ></div>
                      <span
                        class="w-[70px] text-center ml-2 text-xs font- text-gray-900 dark:text-gray-300 pr-1"
                      >
                        {{ el.isTrue ? "To'g'ri" : "Noto'g'ri" }}
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  class="h-9 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-1 rounded-lg text-white"
                  @click="addAnswer"
                >
                  <i class="bx bx-plus"></i>Variant qo'shish
                </button>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="reset"
                  class="w-40 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-800"
                  @click="resetFormTest"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  @click="addTest"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <AddNavbar>
      <Back />
      <button
        @click="changeModalTest"
        class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
      >
        Savol qo'shish
      </button>
    </AddNavbar>
    <Loading v-if="store.EL_LOAD" />
    <div v-else class="">
      <div
        class="w-full flex justify-between gap-5 items-center bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-600 p-4 px-5 rounded-lg mb-5 shadow-xl"
      >
        <div class="flex items-center gap-2">
          <h4
            class="dark:text-blue-100 dark:bg-blue-500/50 text-blue-900 bg-blue-500/50 px-6 rounded-lg flex items-center gap-2 p-1 pl-4"
          >
            <i class="bx bx-notepad text-lg"></i>
            <span> TEST: {{ store.ELEMENT?.name }} - {{ store.ELEMENT?.subject_id?.name }} </span>
            <span
              class="flex items-center dark:bg-gray-700 bg-white border border-gray-500 shadow-xl dark:text-white text-gray-900 rounded-full px-2 gap-1 text-sm"
            >
              <i class="bx bx-timer text-lg"></i> {{ store.ELEMENT?.test_time }}
            </span>
          </h4>
          <TimeBeauty :started="store.ELEMENT?.started" :test_time="store.ELEMENT?.test_time" />
        </div>
        <div class="flex items-center gap-2">
          <i
            class="bx bx-pencil text-xl bg-green-500 px-2 p-1 rounded-full text-white cursor-pointer"
            @click="resetFormTests"
          ></i>
          <i
            class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-full text-white cursor-pointer"
            @click="changeDeleteModalTest"
          ></i>
        </div>
      </div>

      <div
        class="relative rounded-xl border border-gray-300 dark:border-gray-600 shadow-xl"
        :class="!store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
      >
        <table class="w-full text-center text-gray-500 dark:text-gray-400 shadow-2xl">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
          >
            <tr>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Savol matni</th>
              <th scope="col" class="py-4 px-10 text-sm uppercase">Variantlar soni</th>
              <th scope="col" class="py-4 px-10 text-sm uppercase">To'g'ri javoblar</th>
              <th scope="col" class="sr-only">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="el in store_question.LIST"
              class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
              v-show="el.test_group_id._id == id"
            >
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ el?.question }}
              </th>
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ el?.answers?.length }}
              </th>
              <th scope="row" class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ el?.answers.length ? el?.answers?.filter((i) => i.is_true)?.length : 0 }}
              </th>
              <td class="px-6 py-4 flex items-center justify-center gap-2 text-right">
                <router-link
                  :to="`/tests/${id}/${el._id}`"
                  class="text-white bg-blue-500 rounded-lg text-sm px-3.5 py-2 text-center"
                >
                  Kirish
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
