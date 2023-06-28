<script setup>
import Loading from '@/components/Loading.vue'
import AddNavbar from '../components/AddNavbar.vue'
import { ref, reactive, onMounted } from 'vue'
import { testStore } from '@/stores/tests/testStore'
import { subjectStore } from '@/stores/subjects/subjectStore'
import { toast } from 'vue3-toastify'
import moment from 'moment'

const store = testStore()
const store_subject = subjectStore()

const addTestModal = ref(false)
const addTestsModal = ref(false)
const changeModalTest = () => (addTestModal.value = !addTestModal.value)
const changeModalTests = () => (addTestsModal.value = !addTestsModal.value)

const alphas = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'

const newTests = reactive({
  name: '',
  subject: '',
  start_date: '',
  start_time: '',
  test_time: ''
})

const newTest = reactive({
  question: '',
  answers: [{ text: '', isTrue: true }]
})
>>>>>>> origin/main

const addTests = async () => {
  try {
    for (let i in newTests) {
      newTests[i] = newTests[i].toString().trim()
    }
    if (!newTests.name.length || !newTests.test_time.length) {
      toast.error("Forma to'ldirilish shart", {
        autoClose: 1000
      })
      return
    }
    const addTest = {
      subject_id: newTests.subject,
      tests_count: 0,
      name: newTests.name,
      test_time: newTests.test_time,
      started: `${moment(newTests.start_date + 'T' + newTests.start_time).format()}`
    }
    store.ADD_LIST(addTest)
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const addTest = async () => {
  try {
    newTest.subject = newTest.subject.trim();
    newTest.question = newTest.question.trim();
    if (newTest.subject.length && newTest.question.length) {
      for (let i in newTest.answers) {
        newTest.answers[i].text = newTest.answers[i].text.trim()
        if (!newTest.answers[i].text.length) {
          toast.error("Variantlarni to'ldiring", {
            theme: 'dark',
            autoClose: 2000
          })
          return
        }
      }

      await store.ADD_LIST({ ...newTest })
      toast.success('Added Successfully', {
        autoClose: 1000
      })
      resetFormTest()
    } else {
      toast.error("Forma to'ldirilishi shart", {
        autoClose: 1000
      })
    }
  } catch (error) {}
};

const resetFormTests = () => {
  newTests.name = ''
  newTests.subject = ''
  newTests.start_date = ''
  newTests.start_time = ''
  newTests.test_time = ''
  changeModalTests()
}

const resetFormTest = () => {
  newTest.subject = ''
  newTest.question = ''
  newTest.answers = [{ text: '', isTrue: true }]
  changeModalTest()
}

const addAnswer = () => {
  if (newTest.answers.length < 25) {
    newTest.answers.push({ text: "", isTrue: false });
  }
};
const removeAnswer = (i) => {
  if (newTest.answers.length > 1) {
    newTest.answers.splice(i, 1);
  }
};

const cutText = (str, len) => {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
};

onMounted(() => {
  store.SET_LIST()
  store_subject.SET_LIST()
})
</script>

<template>
  <section>
    <!-- ADD TEST MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
      :class="addTestsModal ? '' : 'hidden'"
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
              Yangi Test qo'shish
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
                    v-model="newTests.name"
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
                    @change="(e) => (newTests.subject = e.target.value)"
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
                    v-model="newTests.start_date"
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
                    v-model="newTests.start_time"
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
                    v-model="newTests.test_time"
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
                  @click="addTests"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- ADD TEST MODAL -->
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
      <span class="text-lg text-blue-600 font-bold">Testlar</span>
      <button
        @click="changeModalTests"
        class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
      >
        Test qo'shish
      </button>
    </AddNavbar>
    <Loading v-if="store.LOAD" />
    <div
      v-else
      class="relative sm:rounded-xl border border-gray-300 dark:border-gray-600 shadow-xl"
      :class="!store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    >
      <table class="w-full text-center text-gray-500 dark:text-gray-400 shadow-2xl">
        <thead
          class="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Test nomi</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Test fani</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Boshlanish sanasi</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Vaqti</th>
            <th scope="col" class="sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in store.LIST"
            class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ el.name }}
            </th>
            <th
              scope="row"
              class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ el.subject_id.name }}
            </th>
            <th
              scope="row"
              class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                class="relative pl-8 inline-flex items-center justify-center gap-2 p-1 px-3 rounded-md"
                :class="
                  new Date().getTime() < new Date(el.started).getTime()
                    ? 'dark:text-green-200 text-green-800 bg-green-600/50'
                    : 'line-through dark:text-red-200 text-red-800 bg-red-600/50'
                "
              >
                <i
                  class="absolute left-2 top-0.5 bx text-lg"
                  :class="
                    new Date().getTime() < new Date(el.started).getTime()
                      ? 'bxs-calendar-check'
                      : 'bxs-calendar-x'
                  "
                ></i>
                <span>
                  {{ moment(el.started).format("YYYY.MM.DD / hh:mm") }}
                </span>
              </span>
            </th>
            <th
              scope="row"
              class="font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                class="bg-gray-500/50 gap-2 inline-flex px-3 rounded-md items-center justify-center"
              >
                <i class="bx bx-timer text-2xl"></i>
                {{ el.test_time }}
              </span>
            </th>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="`/tests/${el._id}`"
                class="text-white bg-blue-500 rounded-lg text-sm px-3.5 py-2 text-center"
              >
                Kirish
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
