<script setup>
import AddNavbar from "../components/AddNavbar.vue";
import Table from "../components/Table.vue";
import Loading from "../components/Loading.vue";
import { toast } from "vue3-toastify";
import { onMounted, ref, reactive } from "vue";
import { subjectStore } from "../stores/subjects/subjectStore";

const subject_store = subjectStore();

const addSubjectsModal = ref(false);
const changeModalSubjects = () => (addSubjectsModal.value = !addSubjectsModal.value);

const newSubjects = reactive({
  name: "",
});

const addStudents = async () => {
  try {
    for (let i in newSubjects) newSubjects[i] = newSubjects[i].toString().trim();
    console.log(newSubjects.full_name);
    if (!newSubjects.name.length) {
      toast.error("Forma to'ldirilish shart", {
        autoClose: 1000,
      });
      return;
    }
    const addStudent = {
      full_name: newSubjects.name,
    };
    staff_store.ADD_LIST(addStudent);
    changeModalSubjects();
  } catch (error) {
    console.log(error);
    toast.error("Xatolik", {
      autoClose: 1000,
    });
  }
};

const resetFormStudents = () => {
  newSubjects.full_name = "Teacher";
  newSubjects.phone = "";
  newSubjects.login = "";
  newSubjects.password = "";
  newSubjects.tg_name = "";
  changeModalSubjects();
};

const heads = [
  "fan nomi",
  "fan o'qituvchilari soni",
  "fan o'tiladigan guruhlar soni",
  "holati",
];
const keys = ["name", "staff", "19", "is_active"];

onMounted(() => {
  store.SET_LIST();
});
onMounted(() => {
  subject_store.SET_LIST();
});
</script>

<template>
  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full mx-auto overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
    :class="addSubjectsModal ? '' : 'hidden'"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          @click="resetFormStudents"
        >
          <i class="bx bx-x text-2xl px-1"></i>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Yangi o'qituvchi qo'shish
          </h3>
          <form @submit.prevent="" class="space-y-6" action="#">
            <div>
              <label
                class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
              >
                Fan Nomi
              </label>
              <input
                type="text"
                id="full_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kiriting: I.F.O"
                required
                v-model="newSubjects.full_name"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                type="reset"
                class="w-40 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-800"
                @click="resetFormStudents"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="w-40 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                @click="addStudents"
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
    <span class="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold"
      >Fanlar</span
    >
    <button
      @click="changeModal"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      Fan qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="store.LOAD" />
  <Table v-else :message="heads" :keys="keys" page="subjects" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
