<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import Loading from '../components/Loading.vue'
import { toast } from 'vue3-toastify'
import { onMounted, ref, reactive } from 'vue'
import { studentStore } from '../stores/students/studentStore'
import { groupStore } from '../stores/groups/groupStore'

const student_store = studentStore()
const group_store = groupStore()

const addStudentModal = ref(false)
const changeModalSubjects = () => (addStudentModal.value = !addStudentModal.value)
const page = reactive({
  currentPage: 1,
  itemsPerPage: 5
})

const newStudent = reactive({
  full_name: '',
  phone: '',
  login: '',
  password: '',
  group_id: '',
  is_active: true,
  image: 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360'
})

const addStudents = async () => {
  try {
    for (let i in newStudent) newStudent[i] = newStudent[i].toString().trim()
    if (!newStudent.full_name.length) {
      toast.error("Forma to'ldirilish shart", {
        autoClose: 1000
      })
      return
    }
    student_store.ADD_LIST(newStudent)
    toast.success("O'quvchi qo'shildi", {
      autoClose: 1000
    })

    changeModalSubjects()
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const resetFormStudents = () => {
  for (let i in newStudent) newStudent[i] = ''
  changeModalSubjects()
}

onMounted(() => {
  student_store.SET_LIST()
  group_store.SET_LIST()
})
</script>

<template>
  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full mx-auto overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
    :class="addStudentModal ? '' : 'hidden'"
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
            Yangi o'quvchi qo'shish
          </h3>
          <form @submit.prevent="" class="grid grid-cols-2 gap-5" action="#">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                O'quvchi To'liq ismi
              </label>
              <input
                type="text"
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Toshmat Eshmatov"
                required
                v-model="newStudent.full_name"
              />
            </div>
            <div>
              <label
                class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                Telefon raqam
              </label>
              <input
                type="text"
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="887038006"
                required
                v-model="newStudent.phone"
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
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="login"
                required
                v-model="newStudent.login"
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
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="**********"
                required
                minlength="8"
                v-model="newStudent.password"
              />
            </div>
            <div class="col-span-2">
              <label
                class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                Guruhini tanlang </label
              ><select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                @change="(e) => (newStudent.group_id = e.target.value)"
              >
                <option v-for="el in group_store.LIST" :value="el._id">{{ el.name }}</option>
              </select>
            </div>
            <div class="col-span-2 flex items-center justify-between">
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
    <span class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold">O'quvchilar</span>
    <button
      @click="changeModalSubjects"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      O'quvchi qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="student_store.LOAD" />
  <section
    v-else
    :class="!student_store.LIST.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    class="relative shadow-xl rounded-xl w-full"
  >
    <table class="w-full text-center text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-white border-b border-gray-400 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th scope="col" class="py-4 text-sm uppercase">I.F.SH</th>
          <th scope="col" class="py-4 text-sm uppercase">Guruhi</th>
          <th scope="col" class="py-4 text-sm uppercase">Tel: raqami</th>
          <th scope="col" class="py-4 text-sm uppercase">holati</th>
          <th scope="col" class="py-4 text-sm uppercase">batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in student_store.LIST.slice(
            (page.currentPage - 1) * page.itemsPerPage,
            (page.currentPage - 1) * page.itemsPerPage + page.itemsPerPage
          )"
          class="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th class="px-10 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span>
              {{ el.full_name }}
            </span>
          </th>
          <th class="px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              class="bg-indigo-300 block dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
            >
              {{ el.group_id?.name || 0 }}
            </span>
          </th>

          <th class="px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              class="bg-red-300 block dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium px-3 rounded"
              >{{ el.phone || 0 }}</span
            >
          </th>
          <th class="px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              class="bg-green-300 dark:bg-green-900/50 dark:text-green-300 text-green-900 font-medium px-5 rounded"
              >active</span
            >
          </th>

          <td class="px-6 py-4 text-center">
            <router-link
              :to="`students/${el._id}`"
              class="px-5 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-sm"
            >
              Kirish
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full p-3 bg-gray-800">
      <div class="flex items-center -space-x-px h-10 text-base">
        <button
          class="flex items-center justify-center px-2 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="
            () => {
              page.currentPage > 1 ? page.currentPage-- : 0
            }
          "
        >
          <span class="sr-only">Previous</span>
          <i class="bx bx-chevron-left text-2xl"></i>
        </button>
        <button
          v-for="el in Math.ceil(student_store.LIST.length / page.itemsPerPage)"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="page.currentPage == el ? 'dark:bg-gray-900' : 'dark:bg-gray-800'"
          @click="() => (page.currentPage = el)"
        >
          {{ el }}
        </button>
        <button
          class="flex items-center justify-center px-2 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="
            () => {
              page.currentPage < Math.ceil(student_store.LIST.length / page.itemsPerPage)
                ? page.currentPage++
                : 0
            }
          "
        >
          <span class="sr-only">Next</span>
          <i class="bx bx-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
