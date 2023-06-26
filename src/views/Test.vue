<script setup>
import AddNavbar from '../components/AddNavbar.vue'
import { ref } from 'vue'

const addModal = ref(false)
const changeModal = () => (addModal.value = !addModal.value)

const cutText = (str, len) => {
  return str.slice(0, len) + '...'
}
</script>

<template>
  <div>
    <!-- ADD MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50"
      :class="addModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-4xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click="changeModal"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <i class="bx bx-x text-2xl px-1"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Yangi savol qo'shish
            </h3>
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-yellow-900 dark:text-yellow-300 dark:bg-yellow-500/50 bg-yellow-300 rounded-md text-center p-1"
                  >Qaysi fanga qo'shmoqchisiz</label
                >
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="SMM">SMM</option>
                  <option value="DIZAYN">DIZAYN</option>
                </select>
              </div>
              <div class="">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Savol matni</label
                >
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Savolni yozing..."
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-5 mb-5">
                <div class="relative">
                  <label
                    for="default-search"
                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >Search</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search Mockups, Logos..."
                      required
                    />
                    <button
                      type="submit"
                      class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="submit"
                  class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        @click="changeModal"
        class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
      >
        Test qo'shish
      </button>
    </AddNavbar>

    <div
      class="relative overflow-x-auto sm:rounded-xl border border-gray-300 dark:border-gray-600 shadow-xl"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b-2 border-gray-300 dark:border-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Test Fani</th>
            <th scope="col" class="px-6 py-3">Savol matni</th>
            <!-- <th scope="col" class="px-6 py-3">A variant</th>
          <th scope="col" class="px-6 py-3">B variant</th>
          <th scope="col" class="px-6 py-3">C variant</th> -->
            <th scope="col" class="px-6 py-3 sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in 5"
            class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{
                cutText(
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni natus recusandae corporis sint, dignissimos expedita ab eaque molestiae, quod odit repellendus sed quo sequi labore? Cupiditate sit aperiam quaerat nihil temporibus, debitis dolorem numquam esse totam dolor velit quos dolores sed sunt nesciunt nisi dignissimos! Quia recusandae dignissimos perspiciatis eveniet?',
                  50
                )
              }}
            </th>

            <td class="px-6 py-4 text-right">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Kirish
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
