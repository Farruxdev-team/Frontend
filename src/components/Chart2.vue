<script setup>
import { onMounted } from 'vue'
import { studentStore } from '../stores/students/studentStore'
import moment from 'moment'

const students_store = studentStore()

import { Chart, initTE } from 'tw-elements'

const dataBarCustomOptions = {
  type: 'bar',
  data: {
    labels: [
      moment(new Date().setDate(new Date().getDate() - 4)).format('dddd'),
      moment(new Date().setDate(new Date().getDate() - 3)).format('dddd'),
      moment(new Date().setDate(new Date().getDate() - 2)).format('dddd'),
      moment(new Date().setDate(new Date().getDate() - 1)).format('dddd'),
      moment(new Date().setDate(new Date().getDate())).format('dddd')
    ],
    datasets: [
      {
        label: 'Traffic',
        data: [1, 5, 1, 10, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }
}

const optionsBarCustomOptions = {
  options: {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'green'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4285F4'
        }
      },
      y: {
        ticks: {
          color: '#f44242'
        }
      }
    }
  }
}

onMounted(async () => {
  await initTE({ Chart })
  new Chart(
    document.getElementById('bar-chart-custom-options'),
    dataBarCustomOptions,
    optionsBarCustomOptions
  )
})
</script>

<template>
  <div
    class="w-full bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-600 p-4 rounded-xl mb-5 shadow-lg h-full"
  >
    <canvas id="bar-chart-custom-options"></canvas>
  </div>
</template>

<style lang="scss" scoped></style>
