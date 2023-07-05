<script setup>
import { onMounted, ref, reactive } from "vue";
import { toast } from "vue3-toastify";
import { studentStore } from "../stores/students/studentStore";
import { groupStore } from "../stores/groups/groupStore";

import Table from "../components/Table.vue";
import Loading from "@/components/Loading.vue";
import AddNavbar from "../components/AddNavbar.vue";

const student_store = studentStore();
const group_store = groupStore();

const addStudentsModal = ref(false);
const heads = ["i.f.o", "guruh talabasi", "tel raqami", "holati"];
const keys = ["full_name", ["group_id", "name"], "phone", "is_active"];

const changeModalStudents = () => (addStudentsModal.value = !addStudentsModal.value);

const newStudents = reactive({
  full_name: "",
  group_id: "",
  phone: "",
  login: "",
  password: "",
  is_active: true,
});

const addStudents = async () => {
  try {
    for (let i in newStudents) newStudents[i] = newStudents[i].toString().trim();
    console.log(newStudents.full_name);
    console.log(newStudents.group_id);
    console.log(newStudents.phone);
    console.log(newStudents.login);
    console.log(newStudents.password);
    if (
      !newStudents.full_name.length ||
      !newStudents.group_id.length ||
      !newStudents.phone.length ||
      !newStudents.login.length ||
      !newStudents.password.length
    ) {
      toast.error("Forma to'ldirilish shart", {
        autoClose: 1000,
      });
      return;
    }
    const addStudent = {
      full_name: newStudents.full_name,
      group_id: newStudents.group_id,
      phone: newStudents.phone,
      login: newStudents.login,
      password: newStudents.password,
      is_active: newStudents.is_active,
    };
    student_store.ADD_LIST(addStudent);
    changeModalStudents();
  } catch (error) {
    console.log(error);
    toast.error("Xatolik", {
      autoClose: 1000,
    });
  }
};
const resetFormStudents = () => {
  newStudents.full_name = "";
  newStudents.group_id = "";
  newStudents.phone = "";
  newStudents.is_active = "";
  newStudents.login = "";
  newStudents.password = "";
  changeModalStudents();
};

onMounted(() => {
  student_store.SET_LIST();
  group_store.SET_LIST();
});
</script>

<template>
  <!-- Main modal -->
  <div
    class="fixed top-0 left-0 right-0 z-50 w-full mx-auto overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full flex items-center justify-center bg-black/50 p-3"
    :class="addStudentsModal ? '' : 'hidden'"
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
            Yangi talaba qo'shish
          </h3>
          <form @submit.prevent="" class="space-y-6" action="#">
            <div class="grid grid-cols-2 gap-5">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  To'liq ismi (I.F.O)
                </label>
                <input
                  type="text"
                  id="full_name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: I.F.O"
                  required
                  v-model="newStudents.full_name"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Tel: raqami
                </label>
                <input
                  type="tel"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: Talaba telefon raqami"
                  required
                  v-model="newStudents.phone"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Login
                </label>
                <input
                  type="text"
                  id="login"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kiriting: Talaba logini"
                  required
                  v-model="newStudents.login"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Parol
                </label>
                <input
                  type="password"
                  id="password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="********"
                  required
                  v-model="newStudents.password"
                />
              </div>
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-blue-900 dark:text-blue-300 dark:bg-blue-500/50 bg-blue-300 rounded-md text-center p-1"
                >
                  Talaba guruh raqami
                </label>
                <select
                  id="group"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  @change="(e) => (newStudents.group_id = e.target.value)"
                >
                  <option disabled selected>Guruhlardan birini tanlang</option>
                  <option v-for="group in group_store.LIST" :value="group._id">
                    {{ group.name }}
                  </option>
                </select>
              </div>
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
      >O'quvchilar</span
    >
    <button
      @click="changeModalStudents"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      Talaba qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="student_store.LOAD" />
  <Table
    v-else
    :message="heads"
    :keys="keys"
    page="students"
    :data="student_store.LIST"
  />
</template>

<style lang="scss" scoped></style>
