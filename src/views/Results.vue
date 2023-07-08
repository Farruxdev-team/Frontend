<script setup>
import { onMounted, ref } from 'vue'
import { Chart, initTE } from 'tw-elements'

import ResultTable from '../components/ResultTable.vue'
import Loading from '@/components/Loading.vue'
import { testResultsStore } from '@/stores/test_results/testResultsStore'
import { userStore } from '@/stores/user/userStore'
import { testStore } from '../stores/tests/testStore'

const store_results = testResultsStore()
const store_user = userStore()
const store_test = testStore()

const role = ref(store_user.USER?.user?.role_id.name)

const userResults = ref([])
const load = ref(true)

onMounted(async () => {
  await initTE({ Chart })
  await store_user.CHECK_USER()
  store_test.SET_LIST()
  load.value = false
})
const heads = ['test nomi', 'test fani', 'boshlanishi', 'vaqti', 'batafsil']
</script>

<template>
  <div class="">
    <Loading v-if="load" />
    <ResultTable v-else :role="role" :heads="heads" :data="store_test.LIST" />
  </div>
</template>

<style lang="scss" scoped></style>
