<script setup>
import { onMounted, onUpdated, ref } from 'vue'
import { initDropdowns } from 'flowbite'
import { useModeStore } from '@/stores/mode'
import { userStore } from '../stores/user/userStore'
import { useRouter } from 'vue-router'

const store = useModeStore()
const store_user = userStore()
const router = useRouter()

const signOut = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => {
  initDropdowns()
  store.writeMode()
})
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-300 dark:bg-gray-800 dark:border-gray-600 shadow"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            class="inline-flex items-center px-2 p-1 mr-5 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <i class="bx bx-menu-alt-left text-2xl"></i>
          </button>
          <router-link to="/" class="flex ml-2 md:mr-24">
            <img src="/tatu.png" class="h-8 mr-3" alt="FlowBite Logo" />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >TUIT-TEST</span
            >
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <div
                  v-if="store_user.LOAD"
                  class="w-10 h-10 rounded-full flex items-center justify-normal animate-pulse text-center dark:bg-gray-500/50 bg-gray-200/50"
                >
                  <i class="mx-auto bx bxs-image text-2xl text-white"></i>
                </div>
                <img
                  v-else
                  class="w-10 h-10 rounded-full bg-white"
                  :src="
                    store_user?.USER?.user?.image ||
                    'https://cdn.icon-icons.com/icons2/2468/PNG/512/user_kids_avatar_user_profile_icon_149314.png'
                  "
                  alt="user photo"
                />
              </button>
            </div>
            <div
              class="z-50 hidden min-w-40 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ store_user?.USER?.user?.full_name }}
                </p>
              </div>
              <div class="py-1" role="none">
                <li
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg cursor-pointer"
                  role="menuitem"
                >
                  <label
                    class="relative inline-flex justify-between items-center cursor-pointer w-full"
                  >
                    <span class="text-sm font-medium"> Dark </span>
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      @change="store.changeMode"
                      :checked="store.isDark"
                    />
                    <div
                      class="w-11 h-6 bg-gray-400 rounded-full dark:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-950"
                    ></div>
                  </label>
                </li>
                <router-link
                  to="/"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg cursor-pointer"
                  role="menuitem"
                >
                  Settings
                </router-link>
                <div
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-400 rounded-lg dark:text-gray-300 dark:hover:bg-red-500 dark:hover:text-white cursor-pointer"
                  role="menuitem"
                  @click="signOut"
                >
                  Sign out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
