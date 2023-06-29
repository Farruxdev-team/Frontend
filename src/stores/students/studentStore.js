import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useStudents } from '@/service/students'

export const studentStore = defineStore('student', () => {
  const state = reactive({
    list: [],
    load: true,
    oneElement: []
  })

  const SET_LIST = async () => {
    state.list = (await useStudents.list()).data
    state.load = false
  }

  const SET_ONE = (el) => {
    state.oneElement = el
  }

  const LIST = computed(() => state.list)
  const LOAD = computed(() => state.load)
  const ELEMENT = computed(() => state.oneElement)

  return { LIST, LOAD, ELEMENT, SET_LIST, SET_ONE }
})
