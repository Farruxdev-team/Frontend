<template>
  <nav
    class="w-full flex justify justify-between items-center bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 rounded-md mb-5 pl-10"
  >
    <div class="flex gap-8 items-center">
      <span class="text-lg text-blue-600 font-medium">{{ props.data }}lar</span>
      <button
        class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700"
      >
        {{ props.data }} qo'shish
      </button>
    </div>
    <label
      for="default-search"
      class="mb-2 text-md font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
        class="block w-52 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Izlash uchun yozing .."
      />
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['data'])
</script>

<style lang="scss" scoped></style>
