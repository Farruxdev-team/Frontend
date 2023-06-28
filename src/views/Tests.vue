<script setup>
import AddNavbar from "../components/AddNavbar.vue";
import { ref, reactive, onMounted } from "vue";
import { testStore } from "@/stores/tests/testStore";
import { toast } from "vue3-toastify";

const store = testStore();

const addModal = ref(false);
const changeModal = () => (addModal.value = !addModal.value);
const alphas = "ABCDEFGHJKLMNOPQRSTUVWXYZ";

const newTest = reactive({
  subject: "",
  question: "",
  answers: [{ text: "", isTrue: true }],
});

const addTest = async () => {
  try {
    newTest.subject = newTest.subject.trim();
    newTest.question = newTest.question.trim();
    if (newTest.subject.length && newTest.question.length) {
      await store.add_test({ ...newTest });
      toast.success("Added Successfully", {
        autoClose: 1000,
      });
      resetForm();
    }
  } catch (error) {}
};

const resetForm = () => {
  newTest.subject = "";
  newTest.question = "";
  newTest.answers = [{ text: "", isTrue: true }];
  changeModal();
};

const addAnswer = () => {
  if (newTest.answers.length < 25) {
    newTest.answers.push({ text: "", isTrue: false });
  }
};
const removeAnswer = (i) => {
  if (newTest.answers.length > 1) {
    newTest.answers.splice(i, 1);
  }
};

const cutText = (str, len) => {
  if (str.length > len) {
    return str.slice(0, len) + "...";
  } else {
    return str;
  }
};

onMounted(() => {
  store.SET_LIST();
});
</script>

<template>
  <section>
    <!-- ADD MODAL -->
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
      :class="addModal ? '' : 'hidden'"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            @click="resetForm"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <i class="bx bx-x text-2xl px-1"></i>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Yangi savol qo'shish
            </h3>
            <form @submit.prevent="" class="space-y-6" action="#">
              <div>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Qaysi fanga qo'shmoqchisiz
                </label>
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @change="(e) => (newTest.subject = e.target.value)"
                >
                  <option disabled>Fanlardan birini tanlang</option>
                  <option value="SMM">SMM</option>
                  <option value="DIZAYN">DIZAYN</option>
                </select>
              </div>
              <div class="">
                <div
                  for="countries"
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Savol matni
                </div>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Savolni yozing..."
                  v-model="newTest.question"
                ></textarea>
              </div>
              <div
                for="countries"
                class="block text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                Variantlarni kiriting
              </div>
              <div class="grid grid-cols-1 gap-5">
                <div class="relative" v-for="(el, i) in newTest.answers">
                  <div class="relative flex">
                    <button
                      class="flex items-center bg-red-500 text-blue-100 px-2 rounded-l-md"
                      @click="() => removeAnswer(i)"
                    >
                      <i class="bx bx-trash"></i>
                    </button>
                    <input
                      type="input"
                      id="default-search"
                      class="block p-2 px-2 h-full w-full text-sm text-gray-900 border border-gray-300 outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      :placeholder="`${alphas[i]} - variant`"
                      v-model="el.text"
                    />
                    <label
                      class="relative inline-flex items-center cursor-pointer p-1 rounded-r-lg"
                      :class="el.isTrue ? 'bg-green-500' : 'bg-red-500'"
                    >
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        :checked="el.isTrue"
                        @change="() => (el.isTrue = !el.isTrue)"
                      />
                      <div
                        class="w-8 h-5 bg-gray-200 rounded-full dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2.5 after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
                      ></div>
                      <span
                        class="w-[70px] text-center ml-2 text-xs font- text-gray-900 dark:text-gray-300 pr-1"
                      >
                        {{ el.isTrue ? "To'g'ri" : "Noto'g'ri" }}
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  class="h-9 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-1 rounded-lg text-white"
                  @click="addAnswer"
                >
                  <i class="bx bx-plus"></i>Variant qo'shish
                </button>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="reset"
                  class="w-40 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-800"
                  @click="resetForm"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  @click="addTest"
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
            <th scope="col" class="px-6 py-3 sr-only">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="el in store.TEST"
            class="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ el.subject }}
            </th>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ cutText(el.question, 50) }}
            </th>

            <td class="px-6 py-4 text-right">
              <button
                type="button"
                class="text-white bg-blue-500 rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2"
              >
                Kirish
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
