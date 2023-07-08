<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import Back from '../components/Back.vue'
import DeleteModal from '../components/DeleteModal.vue'
import { subjectStore } from '../stores/subjects/subjectStore'

const { id } = useRoute().params
const router = useRouter()
const subject_store = subjectStore()

const isDelete = ref(false)
const changeDeleteModal = () => (isDelete.value = !isDelete.value)

let editedSubject = ref()

const editStudent = () => {
  try {
    subject_store.EDIT(id, { name: editedSubject.value })
    toast.success('Fan nomi tahrirlandi', {
      autoClose: 1000
    })
  } catch (error) {
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const deleteStaff = async () => {
  subject_store.DELETE(id)
  toast.success("Muvaffaqiyatli o'chirildi", {
    autoClose: 1000
  })
  setTimeout(() => {
    router.push('/subjects')
  }, 1000)
  changeDeleteModal()
}

onMounted(async () => {
  console.log(id)
  editedSubject.value = (await subject_store.GET_ONE(id)).name

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

  <div
    class="col-span-3 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
  >
    <div>
      <div>
        <label for="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Fan nomi</label
        >
        <input
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Matematika"
          required
          v-model="editedSubject"
        />
      </div>
      <button
        @click="editStudent"
        class="w-full text-white mt-5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>
