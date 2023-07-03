<script setup>
import { toast } from 'vue3-toastify'
import { onMounted, ref, reactive } from 'vue'
import Table from '../components/Table.vue'
import AddNavbar from '../components/AddNavbar.vue'
import Loading from '../components/Loading.vue'
import { subjectStore } from '../stores/subjects/subjectStore'
import { staffsStore } from '../stores/teacher/staffStore.js'

const heads = ['i.f.o', "fan o'qituvchisi", 'tel: raqami']

const subject_store = subjectStore()
const staff_store = staffsStore()

const addTeachersModal = ref(false)
const changeModalTeachers = () => (addTeachersModal.value = !addTeachersModal.value)

const newTeachers = reactive({
  full_name: '',
  phone: '',
  login: '',
  password: '',
  tg_name: ''
})

const addStudents = async () => {
  try {
    for (let i in newTeachers) newTeachers[i] = newTeachers[i].toString().trim()
    console.log(newTeachers.full_name)
    console.log(newTeachers.phone)
    console.log(newTeachers.login)
    console.log(newTeachers.password)
    console.log(newTeachers.tg_name)
    if (
      !newTeachers.full_name.length ||
      !newTeachers.phone.length ||
      !newTeachers.login.length ||
      !newTeachers.password.length ||
      !newTeachers.tg_name.length
    ) {
      toast.error("Forma to'ldirilish shart", {
        autoClose: 1000
      })
      return
    }
    const addStudent = {
      full_name: newTeachers.full_name,
      phone: newTeachers.phone,
      login: newTeachers.login,
      password: newTeachers.password,
      tg_name: newTeachers.tg_name
    }
    staff_store.ADD_LIST(addStudent)
    changeModalTeachers()
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const resetFormStudents = () => {
  newTeachers.full_name = 'Teacher'
  newTeachers.image = ''
  newTeachers.phone = ''
  newTeachers.login = ''
  newTeachers.password = ''
  newTeachers.tg_name = ''
  changeModalTeachers()
}

onMounted(() => {
  subject_store.SET_LIST()
  staff_store.SET_LIST()
})
</script>

<template>
  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full mx-auto overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
    :class="addTeachersModal ? '' : 'hidden'"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="resetFormStudents"
        >
          <i class="bx bx-x text-2xl px-1"></i>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Yangi o'qituvchi qo'shish
          </h3>
          <form @submit.prevent="" class="space-y-6" action="#">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  To'liq ismi (I.F.O)
                </label>
                <input
                  type="text"
                  id="full_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: I.F.O"
                  required
                  v-model="newTeachers.full_name"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Tel: raqami
                </label>
                <input
                  type="tel"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: O'qituvchi telefon raqami"
                  required
                  v-model="newTeachers.phone"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Login
                </label>
                <input
                  type="text"
                  id="login"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: O'qituvchi logini"
                  required
                  v-model="newTeachers.login"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Parol
                </label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  required
                  v-model="newTeachers.password"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  O'qituvchi guruh raqami
                </label>
                <select
                  id="subject"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @change="(e) => (newTeachers.subject_id = e.target.value)"
                >
                  <option disabled selected>Fanlardan birini tanlang</option>
                  <option v-for="subject in subject_store.LIST" :value="subject._id">
                    {{ subject.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                type="reset"
                class="w-40 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-800"
                @click="resetFormStudents"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                @click="addStudents"
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
    <span class="text-lg text-blue-600 font-bold">O'qituvchilar</span>
    <button
      @click="changeModalTeachers"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      O'qituvchi qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="staff_store.LOAD" />
  <Table v-else :message="heads" page="teacher" :data="staff_store.LIST" />
</template>

<style lang="scss" scoped></style>
