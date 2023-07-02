<script setup>
import { useRoute } from 'vue-router'
import Kirish from '../components/Kirish.vue'
const { id } = useRoute().params
</script>

<template>
  <Kirish />
</template>

<style lang="scss" scoped></style>
