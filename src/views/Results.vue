<script setup>
import { onMounted, ref } from 'vue'
import { Chart, initTE } from 'tw-elements'

import ResultTable from '../components/ResultTable.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { userStore } from '@/stores/user/userStore'
import { testStore } from '../stores/tests/testStore'

const store_user = userStore()
const store_test = testStore()

const role = ref()

const load = ref(true)

onMounted(async () => {
  await initTE({ Chart })
  await store_user.CHECK_USER()
  store_test.SET_LIST()
  role.value = await store_user.USER?.user?.role_id.name
  load.value = false
})
const heads = ['test nomi', 'test fani', 'boshlanishi', 'vaqti', 'batafsil']
</script>

<template>
  <div class="text-white">
    <LoadingSpinner v-if="load" />
    <ResultTable
      v-else
      :role="role"
      :heads="heads"
      :data="store_test.LIST.filter((i) => new Date(i.started).getTime() < new Date().getTime())"
    />
  </div>
</template>

<style lang="scss" scoped></style>
