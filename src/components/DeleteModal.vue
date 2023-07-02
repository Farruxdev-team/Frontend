<script setup>
const { isDelete, changeDelete, deleteFunc } = defineProps([
  'isDelete',
  'changeDelete',
  'deleteFunc'
])
</script>

<template>
  <!-- DELETE TESTS MODAL -->
  <div
    class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50"
    :class="isDelete ? '' : 'hidden'"
  >
    <div class="relative w-full max-w-lg max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="changeDelete"
        >
          <i class="bx bx-x text-2xl px-1"></i>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <i class="bx bxs-trash-alt text-5xl text-gray-500 py-5"></i>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Rostan o'chirib yubormoqchimisiz ?
          </h3>
          <button
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            @click="deleteFunc"
          >
            O'chirish
          </button>
          <button
            class="text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="changeDelete"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
