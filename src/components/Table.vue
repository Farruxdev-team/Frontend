<script setup>
const { data, page, message, keys } = defineProps(["data", "page", "message", "keys"]);
</script>

<template>
  <section
    :class="!data.length ? 'overflow-x-hidden' : 'overflow-x-auto'"
    class="relative shadow-xl rounded-xl"
  >
    <table class="w-full text-center text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-white border-b border-gray-400 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th v-for="msg in message" scope="col" class="py-4 text-sm uppercase">
            {{ msg }}
          </th>
          <th scope="col" class="py-4 text-sm uppercase">batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in data"
          class="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span>
              {{ el[keys[0]] || keys[0] }}
            </span>
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              v-if="page != 'subjects'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
            >
              {{ el[keys[1][0]][keys[1][1]] || keys[1] }}
            </span>
            <span
              v-else
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-3 rounded"
              >{{ el[keys[1]].length }}</span
            >
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              class="bg-red-300 py-0.5 dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium px-3 rounded"
              >{{ el[keys[2]] || keys[2] }}</span
            >
          </th>
          <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <span
              v-if="!el[keys[3]]"
              class="bg-pink-300 py-0.5 dark:bg-pink-900/50 dark:text-pink-300 text-pink-900 font-medium px-5 rounded"
              >inactive</span
            >
            <span
              v-else
              class="bg-green-300 py-0.5 dark:bg-green-900/50 dark:text-green-300 text-green-900 font-medium px-5 rounded"
              >active</span
            >
          </th>

          <td class="px-6 py-4 text-center">
            <router-link
              :to="`${page}/${el._id}`"
              class="px-5 py-2 text-white rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-sm"
            >
              Kirish
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped></style>
