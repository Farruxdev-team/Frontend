<script setup>
import Loading from "./Loading.vue";

const props = defineProps(["data", "page", "message"]);
console.log(props.data);
</script>
<template>
  <section class="relative overflow-x-auto shadow-xl rounded-xl">
    <Loading v-if="!props.data.length" />
    <table v-else class="w-full text-center text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
      >
        <tr>
          <th scope="col" class="py-4 px-10 text-sm uppercase">
            {{ props.message[0] }}
          </th>
          <th scope="col" class="py-4 px-10 text-sm uppercase">
            {{ props.message[1] }}
          </th>
          <th scope="col" class="py-4 px-10 text-sm uppercase">
            {{ props.message[2] }}
          </th>
          <th scope="col" class="py-4 px-10 text-sm uppercase">holati</th>
          <th scope="col" class="py-4 px-10 text-sm uppercase">batafsil</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="el in props.data"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="py-4 px-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span v-if="props.page != 'subjects'">{{ el.full_name }}</span>
            <span v-else>{{ el.name }}</span>
          </th>
          <td class="py-4 px-10 text-sm">
            <span
              v-if="props.page == 'teacher'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium block rounded"
              >o'qituvchining fani
            </span>
            <span
              v-if="props.page == 'student'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium block rounded"
              >o'quvchining guruhi
            </span>
            <span
              v-if="props.page == 'subjects'"
              class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium block rounded"
              >24
            </span>
          </td>
          <td class="py-4 px-10 text-sm">
            <span
              v-if="props.page != 'subjects'"
              class="bg-red-300 py-0.5 dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium block rounded"
              >{{ el.phone }}</span
            >
            <span
              v-else
              class="bg-red-300 py-0.5 dark:bg-red-900/50 dark:text-red-300 text-red-900 font-medium block rounded"
              >19</span
            >
          </td>
          <td class="py-4 px-10 text-sm">
            <span
              v-if="el.is_active"
              class="bg-green-300 py-0.5 dark:bg-green-900/50 dark:text-green-300 text-green-900 font-medium block rounded"
              >active</span
            >
            <span
              v-else
              class="bg-pink-300 py-0.5 dark:bg-pink-900/50 dark:text-pink-300 text-pink-900 font-medium block rounded"
              >inactive</span
            >
          </td>
          <td class="py-4 px-10">
            <button
              class="px-4 py-2 text-white rounded-md bg-gradient-to-r from-teal-500 to-teal-700"
            >
              Kirish
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style lang="scss" scoped></style>
