<script setup>
import { ref, reactive, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import moment from 'moment'

import Loading from '@/components/Loading.vue'
import AddNavbar from '../components/AddNavbar.vue'
import TestTable from '../components/TestTable.vue'
import { testStore } from '@/stores/tests/testStore'
import { subjectStore } from '@/stores/subjects/subjectStore'

const store = testStore()
const store_subject = subjectStore()

const addTestsModal = ref(false)
const changeModalTests = () => (addTestsModal.value = !addTestsModal.value)

const newTests = reactive({
  name: '',
  subject: '',
  start_date: '',
  start_time: '',
  test_time: ''
})

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
    resetFormTests()
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}
const resetFormTests = () => {
  newTests.name = ''
  newTests.subject = ''
  newTests.start_date = ''
  newTests.start_time = ''
  newTests.test_time = ''
  changeModalTests()
}

onMounted(() => {
  store.SET_LIST()
  store_subject.SET_LIST()
  store.trueLoad()
})

const heads = ['test nomi', 'test fani', 'boshlanishi', 'vaqti', 'batafsil']
</script>

<template>
  <div>
    <!-- ADD TESTS MODAL -->
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
              Yangi test qo'shish
            </h3>
            <form @submit.prevent="" class="space-y-6" action="#">
              <div class="grid grid-cols-2 gap-5">
                <div class="col-span-2">
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                  >
                    Test mavzusi
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

    <AddNavbar>
      <span class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold">Testlar</span>
      <button
        @click="changeModalTests"
        class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
      >
        Test qo'shish
      </button>
    </AddNavbar>

    <Loading v-if="store.LOAD" />
    <TestTable v-else :heads="heads" :data="store.LIST" />
  </div>
</template>

<style lang="scss" scoped></style>
