<script setup>
import AddNavbar from "../components/AddNavbar.vue";
import Table from "../components/Table.vue";
import { onMounted, ref, reactive } from "vue";
import { studentStore } from "../stores/students/studentStore";
import Loading from "../components/Loading.vue";

const store = studentStore();
const addModal = ref(false);
const changeModal = () => (addModal.value = !addModal.value);
const heads = ["i.f.o", "guruh talabasi", "tel: raqami"];
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
  <!-- ADD MODAL -->

  <AddNavbar>
    <span class="text-lg text-blue-600 font-bold">Talabalar</span>
    <button
      @click="changeModal"
      class="text-base px-4 py-2 text-green-100 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-500"
    >
      Talaba qo'shish
    </button>
  </AddNavbar>
  <Loading v-if="store.LOAD" />
  <Table v-else :message="heads" page="student" :data="store.LIST" />
</template>

<style lang="scss" scoped></style>
