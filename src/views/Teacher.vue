<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import Back from '../components/Back.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { staffsStore } from '../stores/teacher/staffStore'
import { subjectStore } from '../stores/subjects/subjectStore'
import { groupStore } from '../stores/groups/groupStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { id } = useRoute().params
const router = useRouter()
const store_staff = staffsStore()
const group_store = groupStore()
const subject_store = subjectStore()

const isDelete = ref(false)
const changeDeleteModal = () => (isDelete.value = !isDelete.value)

let editedTeacher = reactive({
  full_name: '',
  image: '',
  phone: '',
  login: '',
  password: '',
  role_id: '649b9cb84c15d387bb7515eb',
  email: '',
  is_active: true,
  tg_name: ''
})
const load = ref(true)

const editStudent = () => {
  try {
    console.log(id, editedTeacher)
    store_staff.EDIT_STAFF(id, editedTeacher)
    toast.success("O'qituvchi tahrirlandi", {
      autoClose: 1000
    })
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const deleteStaff = async () => {
  store_staff.DELETE(id)
  toast.success("Muvaffaqiyatli o'chirildi", {
    autoClose: 1000
  })
  setTimeout(() => {
    router.push('/teachers')
  }, 1000)
  changeDeleteModal()
}

onMounted(async () => {
  editedTeacher = {
    ...(await store_staff.GET_ONE(id)),
    password: ''
  }
  load.value = false
  group_store.SET_LIST()
  subject_store.SET_LIST()
})
</script>

<template>
  <!-- DELETE TESTS MODAL -->
  <DeleteModal :isDelete="isDelete" :changeDelete="changeDeleteModal" :deleteFunc="deleteStaff" />

  <div
    class="w-full flex justify justify-between items-center bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
  >
    <Back />

    <div class="flex items-center gap-2">
      <i
        @click="changeDeleteModal"
        class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-lg text-white cursor-pointer"
      ></i>
    </div>
  </div>
  <div v-if="load" class="py-20">
    <LoadingSpinner />
  </div>
  <div v-else class="grid lg:grid-cols-4 gap-5">
    <div
      class="bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
    >
      <div class="w-full text-center">
        <img
          :src="
            editedTeacher?.image || 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360'
          "
          alt="avatar"
          class="h-44 w-44 rounded-full mx-auto dark:bg-white bg-gray-900"
        />
      </div>
      <div class="">
        <input
          type="text"
          id="first_name"
          class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="URL"
          required
          v-model="editedTeacher.image"
        />
      </div>
      <button
        @click="editStudent"
        type="submit"
        class="w-full text-white mt-5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Saqlash
      </button>
    </div>
    <div
      class="col-span-3 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
    >
      <form autocomplete="off" class="grid grid-cols-2 gap-3">
        <div>
          <label
            for="first_name"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >I.F.SH</label
          >
          <input
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="To'liq ismi"
            required
            v-model="editedTeacher.full_name"
          />
        </div>
        <div>
          <label
            for="last_name"
            class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Telefon raqami</label
          >
          <input
            type="text"
            id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="887038006"
            required
            v-model="editedTeacher.phone"
          />
        </div>
        <div>
          <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Login</label
          >
          <input
            type="text"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="login"
            required
            v-model="editedTeacher.login"
          />
        </div>
        <div>
          <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            v-model="editedTeacher.password"
            autocomplete="off"
          />
        </div>

        <div>
          <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Telegram username</label
          >
          <input
            type="text"
            id="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="@user_01"
            required
            v-model="editedTeacher.tg_name"
          />
        </div>

        <div>
          <label for="text" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="text"
            id="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
            v-model="editedTeacher.email"
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Guruhini tanlang </label
          ><select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @change="(e) => (editedTeacher.group_id = e.target.value)"
          >
            <option v-for="el in group_store.LIST" :value="el._id">{{ el.name }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Guruhini tanlang </label
          ><select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @change="(e) => (editedTeacher = e.target.value)"
          >
            <option v-for="el in subject_store.LIST" :value="el._id">{{ el.name }}</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>
