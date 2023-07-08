<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import Back from '../components/Back.vue'
import DeleteModal from '../components/DeleteModal.vue'

const { id } = useRoute().params
import { groupStore } from '../stores/groups/groupStore'

const store_group = groupStore()
const router = useRouter()

const isDelete = ref(false)
const changeDeleteModal = () => (isDelete.value = !isDelete.value)

let editedGroup = ref({
  name: '',
  description: '',
  start_year: ''
})

const editGroup = () => {
  try {
    store_group.EDIT(id, editedGroup.value)
    toast.success('Guruh tahrirlandi', {
      autoClose: 1000
    })
  } catch (error) {
    console.log(error)
    toast.error('Xatolik', {
      autoClose: 1000
    })
  }
}

const deleteGroup = async () => {
  store_group.DELETE(id)
  toast.success("Muvaffaqiyatli o'chirildi", {
    autoClose: 1000
  })
  setTimeout(() => {
    router.push('/groups')
  }, 1000)
  changeDeleteModal()
}

onMounted(async () => {
  editedGroup.value = { ...(await store_group.GET_ONE(id)) }
})
</script>

<template>
  <!-- DELETE TESTS MODAL -->
  <DeleteModal :isDelete="isDelete" :changeDelete="changeDeleteModal" :deleteFunc="deleteGroup" />

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
    class="bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-xl"
  >
    <div class="grid lg:grid-cols-3 gap-3">
      <div>
        <label for="first_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Guruh nomi</label
        >
        <input
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="To'liq ismi"
          required
          v-model="editedGroup.name"
        />
      </div>
      <div>
        <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Guruh ochilgan sana</label
        >
        <input
          type="date"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="login"
          required
          v-model="editedGroup.start_year"
        />
      </div>
      <div>
        <label for="last_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >Guruh haqida</label
        >
        <input
          type="text"
          id="last_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="887038006"
          required
          v-model="editedGroup.description"
        />
      </div>
      <div class="col-span-3">
        <button
          @click="editGroup"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Saqlash
        </button>
      </div>
    </div>
  </div>
</template>
