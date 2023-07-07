<script setup>
import { onMounted } from "vue";

import Loading from "@/components/Loading.vue";

import { Chart, initTE } from "tw-elements";

const dataBarCustomOptions = {
  type: "bar",
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Traffic",
        data: [30, 15, 62, 65, 61, 6],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
};

const optionsBarCustomOptions = {
  options: {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "green",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4285F4",
        },
      },
      y: {
        ticks: {
          color: "#f44242",
        },
      },
    },
  },
};

onMounted(() => {
  initTE({ Chart });
  new Chart(
    document.getElementById("bar-chart-custom-options"),
    dataBarCustomOptions,
    optionsBarCustomOptions
  );
});
</script>

<template>
  <div
    class="w-full bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg h-full"
  >
    <canvas id="bar-chart-custom-options"></canvas>
  </div>
</template>

<style lang="scss" scoped></style>
