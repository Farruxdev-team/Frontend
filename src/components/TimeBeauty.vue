<script setup>
import { fromNow } from '../helpers/fromNow'
import moment from 'moment'

const { started, test_time } = defineProps(['started', 'test_time'])
</script>

<template>
  <div>
    <span
      class="relative inline-flex items-center justify-center gap-2 p-1 px-3 rounded-md"
      :class="fromNow(started, test_time).color"
    >
      <i
        class="bx text-lg"
        :class="
          fromNow(started, test_time).num == 1
            ? 'bx bx-chart'
            : fromNow(started, test_time).num == 0
            ? 'bx bx-calendar-check'
            : 'bx bx-calendar-x'
        "
      ></i>
      <span>
        {{ moment(started).format('YYYY.MM.DD / hh:mm') }}
      </span>
    </span>
  </div>
</template>
