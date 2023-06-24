<template>
  <div
    class="relative overflow-x-auto sm:rounded-xl border border-gray-300 dark:border-gray-600 shadow-xl"
  >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b-2 border-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">Color</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">Category</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <div class="flex items-center">Price</div>
          </th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
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
            Apple MacBook Pro 17"
          </th>
          <td class="px-6 py-4">Silver</td>
          <td class="px-6 py-4">Laptop</td>
          <td class="px-6 py-4">$2999</td>
          <td class="px-6 py-4 text-right">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
