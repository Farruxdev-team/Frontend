import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useSubjects } from '@/service/subjects'

export const subjectStore = defineStore('subject', () => {
  const state = reactive({
    list: [],
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useSubjects.list()).data
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, ELEMENT, SET_LIST, SET_ONE }
})
