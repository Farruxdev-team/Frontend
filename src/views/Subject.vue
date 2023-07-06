<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Kirish from "../components/Kirish.vue";
import Loading from "../components/Loading.vue";
import { subjectStore } from "../stores/subjects/subjectStore.js";

const subject_store = subjectStore();
const { id } = useRoute().params;

const subject = ref(null);

onMounted(async () => {
  subject.value = await subject_store.GET_ONE(id);
});
</script>

<template>
  <Kirish />
  <Loading v-if="!subject" />
  <div v-else class="container">
    <div
      class="flex justify-between border dark:border-gray-600 rounded-[6px] dark:bg-gray-800 bg-gray-900 w-full"
    >
      <h1 class="ml-4 dark:bg-blue-500/50 m-2 rounded-[6px] p-2 text-white text-[24px]">
        {{ subject?.name }}
      </h1>
      <div class="flex items-center justify-center gap-3 mr-3">
        <i
          class="bx bx-pencil text-xl bg-green-500 px-2 p-1 rounded-full text-white cursor-pointer"
          @click="resetFormTests"
        ></i>
        <i
          class="bx bx-trash text-xl bg-red-500 px-2 p-1 rounded-full text-white cursor-pointer"
          @click="changeDeleteModalTest"
        ></i>
      </div>
    </div>
    <div>
      <table class="w-full text-center text-gray-500 dark:text-gray-400 shadow-2xl">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
        >
          <tr>
            <th scope="col" class="py-4 px-10 text-sm uppercase">O'qituvchilar</th>
            <th scope="col" class="py-4 px-10 text-sm uppercase">Guruhlar</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="el in 6"
            class="whitespace-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span>Murodjon </span>
            </th>
            <th class="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <span
                class="bg-indigo-300 py-0.5 dark:bg-indigo-900/50 dark:text-indigo-300 text-indigo-900 font-medium px-5 rounded"
                >N7 Bootcamp
              </span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
