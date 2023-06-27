<script setup>
import { useRoute } from "vue-router";
const { id } = useRoute().params;
console.log(id);
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
