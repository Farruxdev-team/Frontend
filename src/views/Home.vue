<script setup>
import { onMounted, ref } from "vue";
import Chart1 from "../components/Chart1.vue"
import Chart2 from "../components/Chart2.vue"

onMounted(() => {
  listUpdate();
});
</script>

<template>
  <div style="display: grid; grid-template-columns: 48% 48%;" class="gap-9">
    <Chart1 />
    <Chart2 />
  </div>
</template>


<style lang="scss" scoped>

</style>